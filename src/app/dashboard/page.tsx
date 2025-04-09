"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import AdminDashboard from "@/components/dashboard/admin-dashboard";
import UserDashboard from "@/components/dashboard/user-dashboard";

export default function DashboardPage() {
  const router = useRouter();
  const { user, role } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null; // Hiển thị trống tạm thời trong khi redirect

  return (
    <div className="py-8">
      {role === "ADMIN" && <AdminDashboard />}
      {role === "USER" && <UserDashboard />}
    </div>
  );
}
