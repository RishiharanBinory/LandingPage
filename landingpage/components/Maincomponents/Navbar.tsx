"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Eligibility Checker", href: "/eligibility-checker" },
  { label: "Resources", href: "/resources" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 10) {
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        setVisible(false);
        setOpen(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* White clip strip at very top */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "5px",
          background: "#ffffff",
          zIndex: 48,
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Outer wrapper */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          pointerEvents: "none",
          transform: visible ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Corner decorations — desktop only */}
        <Image
          src="/image.png"
          alt=""
          width={24}
          height={24}
          className="hidden md:block"
          style={{
            position: "fixed",
            top: 5,
            left: 550,
            zIndex: 51,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
        <Image
          src="/image.png"
          alt=""
          width={24}
          height={24}
          className="hidden md:block"
          style={{
            position: "fixed",
            top: 5,
            right: 550,
            zIndex: 51,
            pointerEvents: "none",
            userSelect: "none",
            transform: "scaleX(-1)",
          }}
        />

        {/* ── Nav pill + dropdown unified container ── */}
        <div
          className="w-[60vw] md:w-[min(760px,calc(100%-48px))]"
          style={{
            pointerEvents: "auto",
            position: "relative",
          }}
        >
          {/* Nav bar */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "62px",
              borderRadius: open ? "20px 20px 0 0" : "0 0 20px 20px",
              background: "#ffffff",
              boxShadow: open
                ? "0 0 0 rgba(0,0,0,0)"
                : "0 4px 32px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.05)",
              border: "1px solid rgba(0,0,0,0.06)",
              borderTop: "none",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
              padding: "0 12px 0 20px",
              transition: "border-radius 0.2s ease, box-shadow 0.2s ease",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Logo */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "10px",
                  background: "#0a0a0a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                  <path d="M3 14L9 4l6 10H3z" fill="#D6FD70" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#0a0a0a",
                  letterSpacing: "-0.3px",
                }}
              >
                Eligiby
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex" style={{ alignItems: "center", gap: "2px" }}>
              {links.map((link) => (
                // eslint-disable-next-line @next/next/no-html-link-for-pages
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "rgba(10,10,10,0.65)",
                    textDecoration: "none",
                    padding: "6px 16px",
                    borderRadius: "999px",
                    transition: "background 0.15s, color 0.15s",
                    letterSpacing: "0.01em",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = "rgba(0,0,0,0.05)";
                    e.currentTarget.style.color = "#0a0a0a";
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(10,10,10,0.65)";
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:block" style={{ width: "120px" }} />

            {/* Hamburger — mobile only */}
            <button
              className="flex md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              style={{
                width: 38,
                height: 38,
                borderRadius: "10px",
                background: "#0a0a0a",
                border: "none",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                flexShrink: 0,
                transition: "opacity 0.15s ease",
              }}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </nav>

          {/* Mobile dropdown */}
          <div
            className="md:hidden"
            style={{
              overflow: "hidden",
              maxHeight: open ? "300px" : "0px",
              transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              background: "#ffffff",
              borderRadius: "0 0 20px 20px",
              boxShadow: open
                ? "0 8px 32px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.05)"
                : "none",
              border: open ? "1px solid rgba(0,0,0,0.06)" : "none",
              borderTop: "none",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", padding: "6px 12px 14px" }}>
              {links.map((link, i) => (
                // eslint-disable-next-line @next/next/no-html-link-for-pages
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#0a0a0a",
                    textDecoration: "none",
                    padding: "13px 16px",
                    borderRadius: "12px",
                    transition: "background 0.15s",
                    borderBottom:
                      i < links.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = "rgba(0,0,0,0.04)";
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}