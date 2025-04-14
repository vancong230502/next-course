"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GlobalLoading } from "@/components/loading/global-loading";

export function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      <GlobalLoading />
      <main className="flex-1">{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  );
} 