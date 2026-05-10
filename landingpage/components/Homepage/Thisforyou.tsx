"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe, GraduationCap, RefreshCw, TrendingUp } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const eligibility = [
  {
    label: "UK citizen",
    sub: "Born or naturalised in the United Kingdom",
    icon: <Globe size={20} stroke="#000" strokeWidth={2} />,
  },
  {
    label: "EU settled / pre-settled",
    sub: "EU Settlement Scheme status holders",
    icon: <Globe size={20} stroke="#000" strokeWidth={2} />,
  },
  {
    label: "ILR or refugee status",
    sub: "Indefinite leave to remain or protected persons",
    icon: <Globe size={20} stroke="#000" strokeWidth={2} />,
  },
];

const goals = [
  {
    label: "Start university",
    sub: "Begin your degree for the first time",
    icon: <GraduationCap size={20} stroke="#000" strokeWidth={2} />,
  },
  {
    label: "Change careers",
    sub: "Pivot into a field that excites you",
    icon: <RefreshCw size={20} stroke="#000" strokeWidth={2} />,
  },
  {
    label: "Increase your income",
    sub: "Qualify for higher-paying roles",
    icon: <TrendingUp size={20} stroke="#000" strokeWidth={2} />,
  },
];

function Chip({
  label,
  sub,
  icon,
  index,
}: {
  label: string;
  sub: string;
  icon: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 + 0.15, duration: 0.5, ease: EASE }}
      className="flex items-center gap-4 bg-white border border-[#ebebeb] rounded-[16px] p-4 hover:shadow-[0_6px_24px_rgba(0,0,0,0.07)] hover:border-[#d8d8d8] transition-all duration-200"
    >
      <div
        className="flex items-center justify-center shrink-0"
        style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#D6FD70" }}
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[15px] font-bold text-[#0a0a0a] leading-snug">{label}</span>
        <span className="text-[13px] text-[#999] leading-snug mt-[2px]">{sub}</span>
      </div>
      <div
        className="ml-auto flex items-center justify-center shrink-0"
        style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#0a0a0a" }}
      >
        <svg width="11" height="11" viewBox="0 0 10 10" fill="none" stroke="#D6FD70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 5.2l2 2 4-4" />
        </svg>
      </div>
    </motion.div>
  );
}

export default function ThisIsForYouSection() {
  return (
    <section
      className="w-full bg-white py-20 px-5 md:px-10 lg:px-16"
      style={{ fontFamily: "var(--font-plus-jakarta)" }}
    >
      <div className="max-w-[1100px] mx-auto flex flex-col items-center">



        {/* Heading */}
        <motion.h2
          className="text-[32px] md:text-[48px] font-extrabold leading-[1.12] tracking-tight text-[#0a0a0a] text-center max-w-[680px] mx-auto mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
        >
          This opportunity is for{" "}
          <span
            className="italic"
            style={{ background: "#D6FD70", color: "#0a0a0a", padding: "0 10px 2px", borderRadius: "6px", display: "inline-block" }}
          >
            you.
          </span>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="text-[18px] text-[#888] text-center max-w-[480px] mx-auto leading-relaxed mb-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        >
          It doesn&apos;t matter how long it&apos;s been since you last studied, you may still be eligible for full funding.
        </motion.p>

        {/* Three-column layout — image column is now fixed at 360px / 420px */}
        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_360px_1fr] lg:grid-cols-[1fr_420px_1fr] gap-6 md:gap-8 items-center justify-items-center">

          {/* Left */}
          <div className="w-full flex flex-col gap-4 order-2 md:order-1">
            <motion.p
              className="text-[14px] font-bold uppercase tracking-widest text-[#bbb] mb-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Your status
            </motion.p>
            {eligibility.map((item, i) => (
              <Chip key={item.label} index={i} label={item.label} sub={item.sub} icon={item.icon} />
            ))}
          </div>

          {/* Centre image */}
          <motion.div
            className="order-1 md:order-2 shrink-0 w-[65%] md:w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.08 }}
          >
            <div
              className="relative w-full overflow-hidden border border-[#e8e8e8]"
              style={{ aspectRatio: "3/4", borderRadius: "24px", background: "#f0f0ee" }}
            >
              <Image
                src="/whothis.jpg"
                alt="Student qualifying for UK funding"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </motion.div>

          {/* Right */}
          <div className="w-full flex flex-col gap-4 order-3">
            <motion.p
              className="text-[14px] font-bold uppercase tracking-widest text-[#bbb] mb-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Your goal
            </motion.p>
            {goals.map((item, i) => (
              <Chip key={item.label} index={i} label={item.label} sub={item.sub} icon={item.icon} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}