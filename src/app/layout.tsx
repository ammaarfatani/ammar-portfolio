import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { CustomCursor } from "@/components/ui/custom-cursor";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Ammar Fatani — Full-Stack & AI Developer", template: "%s — Ammar Fatani" },
  description: "Portfolio of Ammar Fatani, a Full-Stack & AI Developer.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}><body><a className="skip-link" href="#main-content">Skip to content</a><CustomCursor />{children}</body></html>;
}
