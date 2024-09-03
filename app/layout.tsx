import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Dipak Giri",
  description: "This website is the official website of Dipak Giri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </body>
      <GoogleAnalytics gaId="G-X15LSR6K2X" />
    </html>
  );
}
