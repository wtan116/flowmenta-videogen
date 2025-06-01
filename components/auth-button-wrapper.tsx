"use client";

import dynamic from "next/dynamic";

// Dynamically import AuthButton with no SSR
const AuthButton = dynamic(() => import("./header-auth"), { 
  ssr: false,
  loading: () => <div className="h-10 w-24 animate-pulse bg-muted rounded" />
});

export default function AuthButtonWrapper() {
  return <AuthButton />;
}
