"use client";

import { useAuth } from "@/hooks/use-auth";
import AdminDashboard from "@/components/dashboard/admin-dashboard";
import UserDashboard from "@/components/dashboard/user-dashboard";

export default function DashboardPage() {
  const { user, role, isLoading } = useAuth(true);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="py-8">
      {role === "ADMIN" && <AdminDashboard />}
      {role === "USER" && <UserDashboard />}
    </div>
  );
}
