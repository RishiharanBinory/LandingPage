"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const features = [
  "Supporting students across London and the UK",
  "Connected with trusted education partners",
  "Aligned with Student Finance England processes",
  "This site is not affiliated with Student Finance England",
];

const links = [
  { label: "Home", href: "/" },
  { label: "Eligibility Checker", href: "/eligibility-checker" },
  { label: "Resources", href: "/resources" },
];

export default function Footer() {
  return (
    <footer
      className="w-full bg-white px-2 md:px-3 lg:px-4 py-4"
      style={{ fontFamily: "var(--font-plus-jakarta)" }}
    >
      <div
        className="w-full max-w-[1900px] mx-auto bg-[#0a0a0a]"
        style={{ borderRadius: "28px", overflow: "hidden" }}
      >
        <div className="px-8 md:px-14 lg:px-16">
          {/* ── Top section ── */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 py-16 md:py-20 border-b border-white/10">
            {/* Left — brand + tagline + features */}
            <motion.div
              className="flex flex-col gap-6 max-w-[520px]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              {/* Logo wordmark */}
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "#D6FD70",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 14L9 4l6 10H3z" fill="#0a0a0a" />
                  </svg>
                </div>
                <span className="text-white font-extrabold text-[20px] tracking-tight">
                  Eligiby
                </span>
              </div>

              {/* Tagline */}
              <p className="text-white/50 text-[15px] leading-relaxed">
                Helping people across the UK access the student finance
                they&apos;re already entitled to.
              </p>

              {/* Feature list */}
              <ul className="flex flex-col gap-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div
                      className="flex items-center justify-center shrink-0 mt-[2px]"
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: "#D6FD70",
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        stroke="#0a0a0a"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 5.2l2 2 4-4" />
                      </svg>
                    </div>
                    <span className="text-white/70 text-[15px] leading-snug">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right — nav links */}
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
            >
              <p className="text-[12px] font-bold uppercase tracking-widest text-white/30 mb-2">
                Navigation
              </p>
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/70 hover:text-white transition-colors duration-200 font-medium"
                  style={{ fontSize: "24px" }}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* ── Bottom bar ── */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-6 text-[13px] text-white/30">
            <p>© {new Date().getFullYear()} Eligiby. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <Link
                href="/privacy-policy"
                className="hover:text-white/70 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <span className="text-white/15">|</span>
              <Link
                href="/terms-and-conditions"
                className="hover:text-white/70 transition-colors duration-200"
              >
                Terms & Conditions
              </Link>
              <span className="text-white/15 hidden sm:inline">|</span>
              <p className="hidden sm:block">
                Aligned with Student Finance England guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
