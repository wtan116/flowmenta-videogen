"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import dynamic from "next/dynamic";

// Import AuthButton with no SSR
const AuthButton = dynamic(() => import("./header-auth"), { ssr: false });

export function MainNav() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href="/" className="text-lg font-bold">
            VideoGen
          </Link>
          <div className="hidden md:flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/faq">FAQ</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/styles">Styles</Link>
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
