import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "../components/Navbar";
import MobileNavShell from "../components/MobileNavShell";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
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
      className={`${plusJakartaSans.variable} h-full antialiased`}
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
