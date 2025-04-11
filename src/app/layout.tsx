import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalLoading } from "@/components/loading/global-loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Studiac",
  description: "Learn new skills with our online courses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Header />
              <GlobalLoading />
              <main className="flex-1">{children}</main>
              <Footer />

            </div>
          </ThemeProvider>
      </body>
    </html>
  );
}
