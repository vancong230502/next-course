"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const userData = searchParams.get("user");
    if (userData) {
      try {
        // Parse user data
        const user = JSON.parse(decodeURIComponent(userData));
        
        // Lưu user data vào localStorage
        localStorage.setItem("user", JSON.stringify(user));
        
        // Chuyển hướng đến dashboard
        router.push("/dashboard");
      } catch (error) {
        console.error("Error processing user data:", error);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Đang xử lý đăng nhập...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
} 