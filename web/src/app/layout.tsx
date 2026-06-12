import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fedrick Region | MedaHealth — Fort Lauderdale",
  description:
    "Recruiting landing page for the Fedrick Region team at MedaHealth — Fort Lauderdale office. Health and life insurance sales opportunity.",
};

export const viewport: Viewport = {
  themeColor: "#0B111D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full bg-white font-sans text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}
