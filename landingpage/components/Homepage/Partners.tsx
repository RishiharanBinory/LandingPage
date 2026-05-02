"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BadgeCheck, GraduationCap, Target, HeartHandshake } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ACCENT = "#D6FD70";

const points = [
  {
    icon: <GraduationCap size={18} stroke="#000" strokeWidth={2} />,
    text: "Accredited universities and colleges",
  },
  {
    icon: <Target size={18} stroke="#000" strokeWidth={2} />,
    text: "Courses aligned with your career goals",
  },
  {
    icon: <HeartHandshake size={18} stroke="#000" strokeWidth={2} />,
    text: "Advisors who understand Student Finance England",
  },
];

export default function TrustedProviders() {
  return (
    <section
      className="w-full bg-white py-20 px-5 md:px-10 lg:px-16"
      style={{ fontFamily: "var(--font-plus-jakarta)" }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div
          style={{
            background: "#f7f7f5",
            borderRadius: "24px",
            overflow: "hidden",
          }}
        >
          <div className="flex flex-col lg:flex-row">

            {/* ── LEFT: image ── */}
            <motion.div
              className="w-full lg:w-[50%] relative"
              style={{ minHeight: "340px" }}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <Image
                src="/university.jpg"
                alt="Students at a UK university"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to right, rgba(0,0,0,0) 60%, rgba(247,247,245,0.6) 100%)",
                }}
              />

              {/* Floating trust badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
                style={{
                  position: "absolute",
                  bottom: "24px",
                  left: "24px",
                  background: "#fff",
                  borderRadius: "14px",
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    background: ACCENT,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <BadgeCheck size={18} stroke="#000" strokeWidth={2} />
                </div>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#0a0a0a", margin: 0 }}>
                    UK Accredited
                  </p>
                  <p style={{ fontSize: "12px", color: "#999", margin: 0 }}>
                    Student Finance England approved
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: content ── */}
            <div className="w-full lg:w-[50%] flex flex-col justify-center gap-6 p-8 md:p-10 lg:p-12">

              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "1px solid #e0e0e0",
                  borderRadius: "9999px",
                  padding: "6px 16px",
                  background: "#fff",
                  width: "fit-content",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0a0a0a", display: "inline-block" }} />
                <span style={{ fontSize: "13px", fontWeight: 500, color: "#0a0a0a", letterSpacing: "0.06em", textTransform: "uppercase" as const }}>
                  Trusted Providers
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                style={{
                  fontSize: "clamp(28px, 3.5vw, 42px)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  color: "#0a0a0a",
                  margin: 0,
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
              >
                Get matched with trusted UK education providers.
              </motion.h2>

              {/* Sub */}
              <motion.p
                style={{ fontSize: "16px", color: "#888", lineHeight: 1.7, margin: 0 }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              >
                After your eligibility check, you&apos;ll be connected with:
              </motion.p>

              {/* Points */}
              <div className="flex flex-col gap-3">
                {points.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.48, ease: EASE }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      background: "#fff",
                      borderRadius: "14px",
                      padding: "14px 18px",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "10px",
                        background: ACCENT,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {point.icon}
                    </div>
                    <p style={{ fontSize: "15px", fontWeight: 500, color: "#0a0a0a", margin: 0 }}>
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
                transition={{ delay: 0.55, duration: 0.5 }}
                style={{ fontSize: "15px", color: "#555", lineHeight: 1.6, margin: 0 }}
              >
                You&apos;re guided from eligibility to application —{" "}
                <span style={{ fontWeight: 700, color: "#0a0a0a" }}>
                  not left to figure it out alone.
                </span>
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}