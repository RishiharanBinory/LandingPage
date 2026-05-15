import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Libre_Caslon_Display,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Maincomponents/Navbar";
import Footer from "@/components/Maincomponents/Footer";
import NavigationGuard from "@/components/Maincomponents/NavigationGuard";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const libreCaslon = Libre_Caslon_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-libre-caslon",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "eligibilty checker UK",
  description: "Check if you qualify for UK Student Finance in 60 seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${libreCaslon.variable} ${geistMono.variable}`}
    >
      <body className={plusJakarta.className}>
        <NavigationGuard/>
        <Navbar />
        <main style={{ margin: 0, padding: 0 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
