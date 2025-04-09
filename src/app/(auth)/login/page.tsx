"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { useAuthStore } from "@/store/auth-store"; // Đường dẫn tuỳ theo cấu trúc dự án

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
  
    setIsLoading(true);
    setError("");
  
    try {
      await login(email, password);
      router.push("/dashboard"); // Không cần setIsLoading(false) nữa
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid email or password");
      setIsLoading(false); // Chỉ đặt false khi thất bại
    }
  };
  

  const handleGoogleSignIn = async () => {
    if (isGoogleLoading) return; // Ngăn spam click
  
    setIsGoogleLoading(true);
    setError("");
  
    try {
      await loginWithGoogle();
      router.push("/dashboard"); // Không set isGoogleLoading false sau khi redirect
    } catch (error: any) {
      setError(error.message || "Google sign in failed");
      console.error("Google sign in error:", error);
      setIsGoogleLoading(false); // Chỉ reset khi có lỗi
    }
  };
  

  return (
    <div className="flex h-[calc(100vh-8rem)] items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="cursor-text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="cursor-text"
            />
          </div>

          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          variant="outline"
          type="button"
          className="w-full cursor-pointer"
          disabled={isGoogleLoading}
          onClick={handleGoogleSignIn}
        >
          {isGoogleLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}
          Google
        </Button>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link
            href="/register"
            className="font-medium text-primary hover:underline cursor-pointer"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
