import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";

import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Gang of Four",
  description:
    "Replace the paper and keep the score of the popular game gang of four",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <div className="fixed bottom-0 left-1/2 -translate-y-1/2 bg-primary text-primary-foreground p-1 rounded text-xs font-bold">
            <div className="sm:hidden">xs</div>
            <div className="hidden sm:inline md:hidden">xs</div>
            <div className="hidden md:inline lg:hidden">md</div>
            <div className="hidden lg:inline xl:hidden">lg</div>
            <div className="hidden xl:inline 2xl:hidden">xl</div>
            <div className="hidden 2xl:inline">2xl</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
