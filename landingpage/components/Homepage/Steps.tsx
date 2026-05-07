"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, BookOpen, Headphones } from "lucide-react";
import EligibilityButton from "../Maincomponents/Button";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ACCENT = "#D6FD70";

const steps = [
  {
    number: "01",
    icon: <ClipboardCheck size={22} stroke="#0a0a0a" strokeWidth={1.8} />,
    title: "Check your eligibility",
    subtitle: "60 seconds",
    description:
      "Answer a few quick questions to find out if you qualify — no documents needed at this stage.",
  },
  {
    number: "02",
    icon: <BookOpen size={22} stroke="#0a0a0a" strokeWidth={1.8} />,
    title: "Get matched with a course & partner",
    subtitle: "Tailored to you",
    description:
      "We match you with a suitable course and a trusted education partner based on your goals and background.",
  },
  {
    number: "03",
    icon: <Headphones size={22} stroke="#0a0a0a" strokeWidth={1.8} />,
    title: "Receive guidance through your application",
    subtitle: "We handle the complexity",
    description:
      "We simplify the entire process so you don't get stuck or rejected — expert support at every step.",
  },
];

// ── Main Section ───────────────────────────────────────────────────────────
export default function SimpleStepsSection() {
  return (
    <section
      className="w-full bg-white py-20 px-5 md:px-10 lg:px-16"
      style={{ fontFamily: "var(--font-plus-jakarta)" }}
    >
      <div className="max-w-[1100px] mx-auto flex flex-col items-center">
        {/* ── Tag pill — matches reference ── */}

        {/* ── Heading ── */}
        <motion.h2
          className="text-center max-w-[640px] mx-auto mb-5"
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#0a0a0a",
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
        >
         Confused about the process? We make it simple
        </motion.h2>

        {/* ── Subheading ── */}
        <motion.p
          className="text-center max-w-[480px] mx-auto mb-16"
          style={{ fontSize: "18px", color: "#888", lineHeight: 1.6 }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        >
          From eligibility checks to expert guidance, we help you move forward with confidence and secure your funding.
        </motion.p>

        {/* ── Steps row ── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.15, duration: 0.52, ease: EASE }}
              style={{
                background: "#f7f7f5",
                borderRadius: "18px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "0",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Step number — large faint bg */}
              <span
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "20px",
                  fontSize: "64px",
                  fontWeight: 900,
                  color: "rgba(0,0,0,0.05)",
                  lineHeight: 1,
                  userSelect: "none",
                  letterSpacing: "-0.04em",
                }}
              >
                {step.number}
              </span>

              {/* Icon pill */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  background: ACCENT,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "56px",
                  flexShrink: 0,
                }}
              >
                {step.icon}
              </div>

              {/* Subtitle — small tag */}
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#aaa",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                }}
              >
                {step.subtitle}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "#0a0a0a",
                  lineHeight: 1.2,
                  marginBottom: "12px",
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "16px",
                  color: "#888",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {step.description}
              </p>

              {/* Accent bottom bar */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "3px",
                  background: ACCENT,
                  opacity: 0.6,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
        >
          <Link href="/eligibility-checker">
            <EligibilityButton label="Start Free Eligibility Check" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
