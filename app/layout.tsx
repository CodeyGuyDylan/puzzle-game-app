import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "./components/PostHogProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Puzzle Game App",
  description: "A puzzle game app made by CodeyGuyDylan (me)",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className="size-full" lang="en">
      <body className={`size-full ${geistSans.variable} ${geistMono.variable}`}> 
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
