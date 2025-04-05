"use client";

import { useAuth } from "@/hooks/use-auth";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Give auth time to initialize
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Access Restricted</h1>
            <p className="text-muted-foreground">
              You need to be logged in to view this page. Please sign in to access your dashboard and courses.
            </p>
          </div>
          <Link href="/login">
            <Button size="lg" className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              Sign in to continue
            </Button>
          </Link>
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-primary underline underline-offset-4">
              Register here
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 