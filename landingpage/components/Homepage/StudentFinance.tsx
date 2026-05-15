"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Banknote, Home, Heart } from "lucide-react";
import { useState, ReactNode } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ACCENT = "#D6FD70";

interface Card {
  id: string;
  icon: ReactNode;
  label: string;
  description: string;
  image: string;
}

interface FinanceCardProps {
  card: Card;
  isActive: boolean;
  isFirst: boolean;
  index: number;
  onMouseEnter: () => void;
}

const cards: Card[] = [
  {
    id: "tuition",
    icon: <Banknote size={20} stroke="#000" strokeWidth={2} />,
    label: "Tuition Fee Loan",
    description: "up to £9,535/year , paid directly to your university",
    image: "/img1.png",
  },
  {
    id: "maintenance",
    icon: <Home size={20} stroke="#000" strokeWidth={2} />,
    label: "Maintenance Loan",
    description: "Up to £14,000/year , paid directly to you",
    image: "/img2.png",
  },
  {
    id: "additional",
    icon: <Heart size={20} stroke="#000" strokeWidth={2} />,
    label: "Additional Support",
    description: "Childcare grants · Parents' allowance · Disability support",
    image: "/img3.png",
  },
];

export default function StudentFinanceSection() {
  const [activeId, setActiveId] = useState<string>("tuition");

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
          Here&apos;s what Student Finance can include.
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="text-[18px] text-[#888] text-center max-w-[480px] mx-auto leading-relaxed mb-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        >
          Student Finance covers your tuition and can support your living costs.
          Most people don&apos;t realise how much they&apos;re entitled to.
        </motion.p>

        {/* Gray wrapper */}
        <motion.div
          className="w-full"
          style={{
            background: "#f5f5f3",
            borderRadius: "24px",
            padding: "12px",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.18 }}
        >
          {/* ── MOBILE: stacked cards, image always visible on the right ── */}
          <div className="flex flex-col gap-2 md:hidden">
            {cards.map((card, i) => (
              <MobileFinanceCard key={card.id} card={card} index={i} />
            ))}
          </div>

          {/* ── DESKTOP: horizontal accordion, untouched ── */}
          <div
            className="hidden md:flex overflow-hidden"
            style={{ borderRadius: "14px", minHeight: "320px", gap: "8px" }}
          >
            {cards.map((card, i) => (
              <FinanceCard
                key={card.id}
                card={card}
                index={i}
                isFirst={i === 0}
                isActive={activeId === card.id}
                onMouseEnter={() => setActiveId(card.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          className="text-center mt-10 text-[16px] text-[#aaa] max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          You don&apos;t pay anything until you&apos;re earning above the
          threshold,{" "}
          <span className="text-[#0a0a0a] font-bold">
            and the loan is written off after 40 years.
          </span>
        </motion.p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   MOBILE CARD
   Matches the screenshot exactly:
   - Same horizontal structure as desktop (text left, image right)
   - Icon pinned top-left, label + description pinned bottom-left
   - Image fills the right ~55% — always visible, no interaction needed
   - Inset image margin matches desktop's polished look
───────────────────────────────────────────────────────────── */
/* ─────────────────────────────────────────────────────────────
   ONLY REPLACE the MobileFinanceCard function in your file.
   Everything else (imports, cards data, StudentFinanceSection,
   FinanceCard) stays exactly the same.
───────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────────────────────
   MOBILE CARD  — stacked layout (image top, content below)
   
   WHY the old side-by-side layout failed:
   - 45% left column → ~185px wide on a 412px screen
   - Label "Tuition Fee Loan" forced to wrap at ~10ch
   - Description was 3 lines crammed into that narrow slot
   - minHeight 220px made everything feel suffocated
   
   NEW approach:
   - Full-width card, image on top (16:9 ratio, fixed height)
   - Icon, label, description get 100% of the width → no wrapping
   - Generous padding so nothing ever touches an edge
   - Subtle accent left-border on the content area for visual rhythm
───────────────────────────────────────────────────────────── */
function MobileFinanceCard({ card, index }: { card: Card; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: EASE, delay: index * 0.1 }}
      style={{
        background: "#fff",
        borderRadius: "14px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "12px",
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "200px",
          flexShrink: 0,
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Image
          src={card.image}
          alt={card.label}
          fill
          className="object-cover object-top"
          priority={index === 0}
        />
      </div>

      {/* CONTENT */}
      <div
        style={{
          padding: "16px 4px 8px",  /* ← no left offset, clean alignment */
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          /* ← border-left removed entirely */
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 11,
            background: ACCENT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {card.icon}
        </div>

        {/* Label */}
        <p
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#0a0a0a",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {card.label}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: "14px",
            color: "#666",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DESKTOP CARD — horizontal accordion, completely unchanged
───────────────────────────────────────────────────────────── */
function FinanceCard({
  card,
  index,
  isActive,
  onMouseEnter,
}: FinanceCardProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      className="relative flex flex-row overflow-hidden"
      style={{
        flex: isActive ? "2.5 1 0%" : "1 1 0%",
        transition: "flex 0.6s cubic-bezier(0.22,1,0.36,1)",
        cursor: "pointer",
        minWidth: 0,
        minHeight: "320px",
        background: "#fff",
        borderRadius: "10px",
      }}
    >
      {/* LEFT: text */}
      <div
        className="flex flex-col justify-between"
        style={{
          padding: "24px",
          flexShrink: 0,
          width: "220px",
          minWidth: "60px",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: ACCENT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {card.icon}
        </div>

        <div>
          <p
            style={{
              fontSize: "24px",
              fontWeight: 500,
              color: "#0a0a0a",
              marginBottom: 8,
              lineHeight: 1.2,
            }}
          >
            {card.label}
          </p>
          <p
            style={{
              fontSize: "16px",
              color: "#888",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {card.description}
          </p>
        </div>
      </div>

      {/* RIGHT: image — expands on hover */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          overflow: "hidden",
          position: "relative",
          maxWidth: isActive ? "340px" : "0px",
          transition: "max-width 0.6s cubic-bezier(0.22,1,0.36,1)",
          margin: isActive ? "10px 10px 10px 0" : "10px 0 10px 0",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Image
            src={card.image}
            alt={card.label}
            fill
            className="object-cover object-center"
            priority={index === 0}
          />
        </div>
      </div>
    </div>
  );
}
