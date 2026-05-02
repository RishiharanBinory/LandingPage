"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import EligibilityButton from "../Maincomponents/Button";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CTASection() {
  return (
    <section className="w-full px-2 md:px-3 lg:px-4 py-12 md:py-16 bg-white" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
      <div
        className="relative w-full max-w-[1900px] mx-auto overflow-hidden"
        style={{
          borderRadius: "28px",
          minHeight: "560px",
          background: "#1a1a1a",
        }}
      >
        {/* Background image — shifted down */}
        <Image
          src="/cta1.png"
          alt="CTA background"
          fill
          className="object-cover"
          style={{ objectPosition: "center 20%" }}
          priority
        />

        {/* Lighter overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, rgba(10,10,10,0.45) 35%, rgba(10,10,10,0.05) 100%)",
            borderRadius: "28px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-14 lg:px-16 py-16 md:py-20 max-w-[620px]">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: EASE }}
            className="inline-flex items-center gap-2 mb-6 w-fit"
          >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#D6FD70" }} />
            <span className="text-[13px] font-semibold tracking-widest uppercase" style={{ color: "#D6FD70" }}>
              Don&apos;t miss out
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="text-[32px] md:text-[44px] lg:text-[52px] font-extrabold leading-[1.1] tracking-tight text-white mb-5"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.06 }}
          >
            You could already be{" "}
            <span
              className="italic"
              style={{
                background: "#D6FD70",
                color: "#0a0a0a",
                padding: "0 10px 2px",
                borderRadius: "6px",
                display: "inline-block",
              }}
            >
              eligible.
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="text-[16px] leading-relaxed mb-10"
            style={{ color: "rgba(255,255,255,0.65)" }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.12 }}
          >
            Checking takes less than a minute.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.18 }}
            className="flex flex-col items-start gap-4"
          >
            <EligibilityButton label="Check My Eligibility" />

            {/* Microcopy */}
            <p className="text-[13px] flex items-center gap-3" style={{ color: "rgba(255,255,255,0.45)" }}>
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#D6FD70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6.2l2 2 6-5" />
                </svg>
                Free
              </span>
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#D6FD70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6.2l2 2 6-5" />
                </svg>
                No obligation
              </span>
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#D6FD70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6.2l2 2 6-5" />
                </svg>
                Instant results
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}