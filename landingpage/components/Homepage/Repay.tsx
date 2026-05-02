"use client";

import { motion } from "framer-motion";
import { Percent, TrendingUp, Clock } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ACCENT = "#D6FD70";

const points = [
  {
    icon: <Percent size={20} stroke="#000" strokeWidth={2} />,
    text: "You only repay 9% of what you earn above £25,000",
  },
  {
    icon: <TrendingUp size={20} stroke="#000" strokeWidth={2} />,
    text: "If you earn £30,000 → that's roughly £5/month",
  },
  {
    icon: <Clock size={20} stroke="#000" strokeWidth={2} />,
    text: "No repayments until after your course and when you're earning",
  },
];

export default function RepaymentsSection() {
  return (
    <section
      className="w-full bg-white py-20 px-5 md:px-10 lg:px-16"
      style={{ fontFamily: "var(--font-plus-jakarta)" }}
    >
      <div className="max-w-[700px] mx-auto flex flex-col items-center text-center gap-5">

        {/* Heading */}
        <motion.h2
          style={{
            fontSize: "clamp(32px, 4vw, 48px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#0a0a0a",
            margin: 0,
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
        >
          Worried about taking a loan?
        </motion.h2>

        {/* Sub */}
        <motion.p
          style={{ fontSize: "16px", color: "#888", lineHeight: 1.7, margin: 0 }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        >
          Repayments are based on your income — not a fixed monthly bill.
        </motion.p>

        {/* Points */}
        <div className="w-full flex flex-col gap-3 mt-4">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 + 0.15, duration: 0.52, ease: EASE }}
              style={{
                background: "#f7f7f5",
                borderRadius: "18px",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                textAlign: "left",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  background: ACCENT,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {point.icon}
              </div>

              {/* Text */}
              <p style={{ fontSize: "16px", fontWeight: 500, color: "#0a0a0a", margin: 0, lineHeight: 1.5 }}>
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ fontSize: "16px", fontWeight: 700, color: "#0a0a0a", margin: 0 }}
        >
          You&apos;re not taking a risk upfront.
        </motion.p>
      </div>
    </section>
  );
}