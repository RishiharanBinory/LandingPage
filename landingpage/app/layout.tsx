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
import Script from "next/script";

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
        <NavigationGuard />
        <Navbar />
        <main style={{ margin: 0, padding: 0 }}>{children}</main>
        <Footer />

        <Script
          id="plerdy-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _protocol="https:"==document.location.protocol?"https://":"http://";
              _site_hash_code = "a96cdbc5162a98f9ba5d2fdc94c61104", _suid=76954,
              plerdyScript=document.createElement("script");
              plerdyScript.setAttribute("defer",""),
              plerdyScript.dataset.plerdymainscript="plerdymainscript",
              plerdyScript.src="https://a.plerdy.com/public/js/click/main.js?v="+Math.random();
              var plerdymainscript=document.querySelector("[data-plerdymainscript='plerdymainscript']");
              plerdymainscript&&plerdymainscript.parentNode.removeChild(plerdymainscript);
              try{document.head.appendChild(plerdyScript)}catch(t){console.log(t,"unable add script tag")}
            `,
          }}
        />
      </body>
    </html>
  );
}