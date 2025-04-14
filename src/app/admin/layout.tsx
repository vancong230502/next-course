"use client";

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { AdminNav } from "@/components/admin-nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  //const { user, role } = useAuthStore();

  // Kiểm tra quyền admin
  // if (!user || role !== "ADMIN") {
  //   redirect("/login");
  // }

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 