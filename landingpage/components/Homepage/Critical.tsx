"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, FileX, Clock, Briefcase } from "lucide-react";

const misconceptions = [
  {
    myth: '"I didn\'t study in the UK"',
    truth: "You may still qualify",
    icon: <GraduationCap size={20} stroke="#000" strokeWidth={2} />,
  },
  {
    myth: '"I don\'t have my certificates"',
    truth: "There are alternatives",
    icon: <FileX size={20} stroke="#000" strokeWidth={2} />,
  },
  {
    myth: '"I\'m too old"',
    truth: "There is no age limit for tuition loans",
    icon: <Clock size={20} stroke="#000" strokeWidth={2} />,
  },
  {
    myth: '"I work full-time"',
    truth: "You can study while working",
    icon: <Briefcase size={20} stroke="#000" strokeWidth={2} />,
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function MisconceptionsSection() {
  return (
    <section
      className="w-full bg-white py-20 px-5 md:px-10 lg:px-16"
      style={{ fontFamily: "var(--font-plus-jakarta)" }}
    >
      <div className="max-w-[1100px] mx-auto flex flex-col items-center">
        {/* ── Heading ── */}
        <motion.h2
          className="text-[32px] md:text-[48px] font-extrabold leading-[1.12] tracking-tight text-[#0a0a0a] text-center max-w-[680px] mx-auto mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
        >
          Still thinking university isn’t for you?{" "}
          <span
            className="italic"
            style={{
              background: "#D6FD70",
              color: "#0a0a0a",
              padding: "2px 10px 3px",
              borderRadius: "6px",
              display: "inline-block",
              verticalAlign: "bottom",
              marginTop: "6px",
            }}
          >
            Think again.
          </span>
        </motion.h2>

        {/* ── Subheading ── */}
        <motion.p
          className="text-[18px] text-[#888] text-center max-w-[460px] mx-auto leading-relaxed mb-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        >
          Many people in London miss out on student funding because they believe
          they’re not eligible.
        </motion.p>

        {/* ── Grid ── */}
        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-5 md:gap-6 items-center justify-items-center px-2 md:px-0">
          {/* Left column */}
          <div className="w-full flex flex-col gap-5 order-2 md:order-1">
            <Card
              index={0}
              myth={misconceptions[0].myth}
              truth={misconceptions[0].truth}
              icon={misconceptions[0].icon}
            />
            <Card
              index={2}
              myth={misconceptions[2].myth}
              truth={misconceptions[2].truth}
              icon={misconceptions[2].icon}
            />
          </div>

          {/* Centre image */}
          <motion.div
            className="w-full md:w-[260px] lg:w-[300px] order-1 md:order-2 shrink-0"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
          >
            <div
              className="relative w-full overflow-hidden border border-[#e8e8e8]"
              style={{
                aspectRatio: "3/4",
                borderRadius: "24px",
                background: "#f0f0ee",
              }}
            >
              <Image
                src="/critical.png"
                alt="Student eligible for UK funding"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </motion.div>

          {/* Right column */}
          <div className="w-full flex flex-col gap-5 order-3">
            <Card
              index={1}
              myth={misconceptions[1].myth}
              truth={misconceptions[1].truth}
              icon={misconceptions[1].icon}
            />
            <Card
              index={3}
              myth={misconceptions[3].myth}
              truth={misconceptions[3].truth}
              icon={misconceptions[3].icon}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({
  index,
  myth,
  truth,
  icon,
}: {
  index: number;
  myth: string;
  truth: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 + 0.15, duration: 0.5, ease: EASE }}
      className="w-full bg-white border border-[#ebebeb] p-6 md:p-8 transition-shadow duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.07)] hover:border-[#d8d8d8]"
      style={{ borderRadius: "20px" }}
    >
      {/* Topic icon */}
      <div
        className="flex items-center justify-center mb-[18px]"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "12px",
          background: "#D6FD70",
        }}
      >
        {icon}
      </div>

      {/* Myth — strikethrough */}
      <p
        className="text-[15px] font-medium leading-snug mb-3"
        style={{ color: "#bbb", textDecoration: "line-through" }}
      >
        {myth}
      </p>

      {/* Truth */}
      <div className="flex items-start gap-2">
        <div
          className="flex items-center justify-center shrink-0 mt-[3px]"
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: "#0a0a0a",
          }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="#D6FD70"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 5.2l2 2 4-4" />
          </svg>
        </div>
        <p className="text-[15px] font-bold text-[#0a0a0a] leading-snug">
          {truth}
        </p>
      </div>
    </motion.div>
  );
}
