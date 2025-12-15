import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BookTok.inc",
  description: "Discover your next favorite book.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="amazon-font bg-[#e3e6e6]">{children}</body>
    </html>
  );
}
