import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Report Generator — Invoices, Bills, Quotations & Service Reports",
  description:
    "Generate professional bills, invoices, quotations and service reports with your company logo, signature, emblem and address.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
