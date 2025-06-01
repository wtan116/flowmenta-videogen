"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface DebugInfo {
  hasEnvVars: boolean;
  supabaseUrl: string | null;
  supabaseKey: string | null;
  connectionStatus: string;
  user: any;
  error: string | null;
}

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    hasEnvVars: false,
    supabaseUrl: null,
    supabaseKey: null,
    connectionStatus: "checking...",
    user: null,
    error: null,
  });

  useEffect(() => {
    const checkSupabase = async () => {
      try {
        // Check environment variables
        const hasEnvVars = 
          !!process.env.NEXT_PUBLIC_SUPABASE_URL && 
          !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        // Initialize debug info with environment variable status
        const newDebugInfo: Partial<DebugInfo> = {
          hasEnvVars,
          supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || null,
          supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
            ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 10 
              ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 10)}...`
              : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
            : null,
          connectionStatus: hasEnvVars ? "connecting..." : "missing environment variables",
        };

        // If we have environment variables, try to connect to Supabase
        if (hasEnvVars) {
          try {
            const supabase = createClient();
            
            // Check if we can get the current user
            const { data: { user }, error } = await supabase.auth.getUser();
            
            if (error) {
              console.error("Supabase auth error:", error);
              throw new Error(`Authentication error: ${error.message}`);
            }
            
            newDebugInfo.connectionStatus = user ? "connected" : "not authenticated";
            newDebugInfo.user = user;
          } catch (error) {
            console.error("Supabase connection error:", error);
            throw new Error(`Failed to connect to Supabase: ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
        }

        setDebugInfo(prev => ({
          ...prev,
          ...newDebugInfo,
          error: null,
        }));
      } catch (error) {
        console.error("Debug error:", error);
        setDebugInfo(prev => ({
          ...prev,
          connectionStatus: "error",
          error: error instanceof Error ? error.message : "Unknown error",
        }));
      }
    };

    checkSupabase();
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Supabase Debug Information</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
        
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="w-48 font-medium">Environment Variables:</span>
            <span className={`px-2 py-1 rounded text-sm ${
              debugInfo.hasEnvVars ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {debugInfo.hasEnvVars ? '✅ Present' : '❌ Missing'}
            </span>
          </div>
          
          <div className="flex items-start">
            <span className="w-48 font-medium">Supabase URL:</span>
            <code className="bg-gray-100 dark:bg-gray-700 p-1 rounded text-sm break-all">
              {debugInfo.supabaseUrl || 'Not set'}
            </code>
          </div>
          
          <div className="flex items-start">
            <span className="w-48 font-medium">Supabase Key:</span>
            <code className="bg-gray-100 dark:bg-gray-700 p-1 rounded text-sm break-all">
              {debugInfo.supabaseKey || 'Not set'}
            </code>
          </div>
          
          <div className="flex items-center">
            <span className="w-48 font-medium">Connection Status:</span>
            <span className={`px-2 py-1 rounded text-sm ${
              debugInfo.connectionStatus === 'connected' 
                ? 'bg-green-100 text-green-800' 
                : debugInfo.connectionStatus === 'error' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-yellow-100 text-yellow-800'
            }`}>
              {debugInfo.connectionStatus}
            </span>
          </div>
          
          {debugInfo.user && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold mb-2">User Info:</h3>
              <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-auto max-h-60">
                {JSON.stringify(debugInfo.user, null, 2)}
              </pre>
            </div>
          )}
          
          {debugInfo.error && (
            <div className="mt-4 pt-4 border-t border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">Error:</h3>
              <pre className="bg-red-50 dark:bg-red-900/20 p-3 rounded text-sm text-red-600 dark:text-red-400 overflow-auto">
                {debugInfo.error}
              </pre>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">What to check:</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>If environment variables are missing, check your <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.env.local</code> file</li>
          <li>Make sure the Supabase URL and Key are correctly copied from your Supabase project settings</li>
          <li>If you see an error, check the browser console for more details</li>
          <li>If you're not authenticated, try signing in first</li>
        </ul>
      </div>
    </div>
  );
}
