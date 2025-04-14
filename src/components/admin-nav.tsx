"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Users,
  ShoppingCart,
  Settings,
  LayoutDashboard,
} from "lucide-react";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Khóa học",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Học viên",
    href: "/admin/students",
    icon: Users,
  },
  {
    title: "Đơn hàng",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Cài đặt",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2 p-4">
      {adminNavItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent" : "transparent"
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
} 