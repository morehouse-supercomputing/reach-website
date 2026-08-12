import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import MobileNavShell from "../components/MobileNavShell";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "REACH Consortium",
  description: "The public dissemination platform for the REACH GenAI Consortium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MobileNavShell>
          <Navbar />
          {children}
        </MobileNavShell>
      </body>
    </html>
  );
}
