import Link from "next/link";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center py-12 px-4 md:py-20">
      <div className="space-y-6 max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          AI-Powered Video Generation for Real Estate
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Create professional, branded property videos in minutes with AI. No editing skills required.
          Support for multiple languages and tones to match your brand.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button size="lg" asChild>
            <Link href="/signup">Get Started Free</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#demo">View Demo</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
