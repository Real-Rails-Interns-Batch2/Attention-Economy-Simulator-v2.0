import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Attention Economy Revenue Simulator",
  description: "Visualize how user time and platform impressions translate into revenue generation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}