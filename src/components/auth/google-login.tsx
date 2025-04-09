"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "@/store/auth-store";

export function GoogleLogin() {
  const loginWithGoogle = async () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={loginWithGoogle}
    >
      <FcGoogle className="mr-2 h-5 w-5" />
      Continue with Google
    </Button>
  );
} 