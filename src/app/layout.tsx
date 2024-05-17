import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionAuthProvider } from "./providers/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TagMather",
  description: "Application to manage expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <ThemeProvider
          attribute="class"
          defaultTheme="light"

          disableTransitionOnChange
        >
          <SessionAuthProvider>
            {children}
          </SessionAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
