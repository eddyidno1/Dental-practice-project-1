import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unsold Treatment Visibility",
  description: "Track which patients accepted nothing after diagnosis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">{children}</body>
    </html>
  );
}
