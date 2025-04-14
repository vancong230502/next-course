"use client";

import * as React from "react";
import {
  BookOpen,
  Briefcase,
  FileText,
  Folder,
  Home,
  LineChart,
  Map,
  PieChart,
  Settings,
  ShoppingBasket,
  ShoppingCart,
  SquareTerminal,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// Dữ liệu mẫu.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  mainItems: [
    { title: "Dashboard", url: "#", icon: Home },
    { title: "Users", url: "#", icon: Users },
    { title: "Orders", url: "#", icon: ShoppingCart},
  ],
  navMain: [
    {
      title: "Statistical System",
      url: "#",
      icon: LineChart,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/admin/statistical/overview",
        },
        {
          title: "Revenue",
          url: "/admin/statistical/revenue",
        },
        {
          title: "Courses",
          url: "/admin/statistical/courses",
        },
        {
          title: "Users",
          url: "/admin/statistical/users",
        },
        {
          title: "Orders",
          url: "/admin/statistical/orders",
        },
      ],
    },
    {
      title: "File System",
      url: "#",
      icon: Folder,
      isActive: true,
      items: [
        {
          title: "Explorer",
          url: "/admin/courses",
        },
        {
          title: "Uploads",
          url: "/admin/users",
        },
        {
          title: "Trashs",
          url: "/admin/orders",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: FileText,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="p-2">
              <a
                href="#"
                className="flex items-center gap-2 cursor-pointer -translate-x-1"
              >
                <Home className="h-8 w-8" />
                <SidebarGroupLabel>
                  <span className="text-base font-semibold">Studiac</span>
                </SidebarGroupLabel>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarGroup>
            <SidebarGroupLabel>Management System</SidebarGroupLabel>
            {data.mainItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="flex items-center gap-2">
                    <item.icon className="w-6 h-6" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarGroup>
          <NavMain items={data.navMain} />
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
