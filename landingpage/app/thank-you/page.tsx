"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Transition, Easing } from "framer-motion";

// ── Easing ────────────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SPRING: Transition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 24,
};

// ── Confetti ──────────────────────────────────────────────────────────────────
const CONFETTI_DATA = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: (((i * 137.508) % 1) - 0.5) * 460,
  y: -(((i * 97.312) % 1) * 280 + 80),
  rot: ((i * 53.742) % 1) * 720 - 360,
  color:
    i % 4 === 0 ? "#D6FD70"
    : i % 4 === 1 ? "#0a0a0a"
    : i % 4 === 2 ? "#c8f560"
    : "#e8ffe0",
  size: ((i * 41.177) % 1) * 10 + 5,
  delay: ((i * 23.918) % 1) * 0.55,
  shape: i % 3,
}));

function Confetti() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center"
      style={{ zIndex: 0 }}
    >
      {CONFETTI_DATA.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 0 }}
          animate={{ x: p.x, y: p.y, rotate: p.rot, opacity: 0, scale: 1.3 }}
          transition={{
            duration: 1.5,
            delay: p.delay,
            ease: [0.15, 0.85, 0.35, 1] as Easing,
          }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.shape === 0 ? p.size : p.size * 0.4,
            borderRadius: p.shape === 0 ? "50%" : p.shape === 1 ? "2px" : "1px",
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function EligibilityThankYouPage() {
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFired(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen bg-white flex flex-col items-center justify-center"
      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
    >
      <main className="w-full max-w-xl mx-auto px-5 md:px-8 py-16 flex flex-col items-center text-center">

        {/* Confetti origin point */}
        <div className="relative flex items-center justify-center w-full mb-12" style={{ height: "0px" }}>
          {fired && <Confetti />}
        </div>

        {/* Confirmed badge */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...SPRING, delay: 0.1 } as Transition}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7"
          style={{ background: "#D6FD70" }}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 10 10"
            fill="none"
            stroke="#0a0a0a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 5.2l2 2 4-4" />
          </svg>
          <span className="text-[12px] font-bold uppercase tracking-widest" style={{ color: "#0a0a0a" }}>
            Eligibility Confirmed
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.55, ease: EASE }}
          className="text-[36px] md:text-[52px] font-extrabold text-[#0a0a0a] leading-[1.06] tracking-tight mb-5"
        >
          You qualify — congratulations.
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.45, ease: EASE }}
          className="text-[15px] leading-relaxed mb-12"
          style={{ color: "#666", maxWidth: "420px" }}
        >
          Thank you for completing the checker. Your result has been sent to your inbox — check your email now.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.38, duration: 0.5, ease: EASE }}
          className="w-full h-px mb-10"
          style={{ background: "#f0f0f0", transformOrigin: "left" }}
        />

        {/* Single next step — check inbox only */}
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.46, duration: 0.4, ease: EASE }}
          className="w-full flex items-start gap-5 p-6 rounded-2xl text-left"
          style={{ background: "#0a0a0a" }}
        >
          {/* Step bubble */}
          <div
            className="flex items-center justify-center shrink-0"
            style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#D6FD70" }}
          >
            {/* Inbox icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
              <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
            </svg>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[15px] font-bold" style={{ color: "#fff" }}>
              Check your inbox
            </span>
            <span className="text-[13px] leading-snug" style={{ color: "rgba(255,255,255,0.5)" }}>
              We&apos;ve sent your eligibility result to the email address you provided. It should arrive within a few minutes — check your spam folder if you don&apos;t see it.
            </span>
          </div>
        </motion.div>

        {/* Subtle closing note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.62, duration: 0.4, ease: EASE }}
          className="text-[12px] mt-8"
          style={{ color: "#ccc" }}
        >
          This checker is free to use. No account was created and your data is used only to deliver your result.
        </motion.p>

      </main>
    </div>
  );
}