"use client";

import { useEffect, useState } from "react";
import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

// Named export for better type checking
export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (!hasEnvVars) {
    return (
      <div className="flex gap-4 items-center">
        <Badge variant="default" className="font-normal">
          Please update .env.local file
        </Badge>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Sign in
          </Button>
          <Button size="sm" disabled>
            Sign up
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="h-10 w-24 animate-pulse bg-muted rounded" />;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">
          Hey, {user.email?.split('@')[0]}!
        </span>
        <form action={signOutAction}>
          <Button type="submit" variant="outline" size="sm">
            Sign out
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button asChild variant="outline" size="sm">
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm">
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}

// Default export for backward compatibility
export default AuthButton;
