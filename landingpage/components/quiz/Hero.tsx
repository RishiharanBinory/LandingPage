"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
import emailjs from "@emailjs/browser";
import EligibilityButton from "../Maincomponents/Button";

// ── EmailJS Config ────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = "service_1w4omvf";
const EMAILJS_PUBLIC_KEY = "1Ne-KtqqhvGNb_0i_";
const EMAILJS_USER_TEMPLATE_ID = "template_4a9shi8";
const EMAILJS_ADMIN_TEMPLATE_ID = "template_rsym1iz";
const ADMIN_EMAIL = "rishihranaliexpress@gmail.com";

// ── Easing ────────────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SPRING: Transition = {
  type: "spring" as const,
  stiffness: 320,
  damping: 26,
};

// ── Types ─────────────────────────────────────────────────────────────────────
type Next = string;
type Option = { label: string; sub?: string; next: Next; tag?: string };
type Question = {
  id: string;
  section: string;
  sectionNum: number;
  sectionLabel: string;
  question: string;
  sub?: string;
  options: Option[];
  layout?: "grid" | "list";
};

// ── Questions ─────────────────────────────────────────────────────────────────
const QUESTIONS: Question[] = [
  {
    id: "q1",
    section: "01",
    sectionNum: 1,
    sectionLabel: "Nationality",
    question: "What is your nationality or current immigration status?",
    sub: "Your nationality is the first thing we check to assess your eligibility.",
    options: [
      { label: "UK national", next: "q2" },
      { label: "EU / Swiss / Norwegian / Icelandic / Liechtenstein national", next: "q2_eu" },
      { label: "Irish national", next: "q2" },
      { label: "Other — non-EU visa, ILR, refugee, or another status", next: "q1_other" },
    ],
  },
  {
    id: "q2",
    section: "02",
    sectionNum: 2,
    sectionLabel: "UK Residency",
    question: "Have you been living in the UK for the past 3 years?",
    sub: "Short trips abroad for vacation or visits do not break this requirement.",
    options: [
      { label: "Yes — I have lived in the UK for 3+ years", next: "q_funding" },
      { label: "No — I have not been in the UK for 3 continuous years", next: "NOT_ELIGIBLE" },
    ],
  },
  {
    id: "q2_eu",
    section: "02",
    sectionNum: 2,
    sectionLabel: "UK Residency",
    question: "Have you been living in the UK for the past 3 years?",
    sub: "Short trips abroad for vacation or visits do not break this requirement.",
    options: [
      { label: "Yes — I have lived in the UK for 3+ years", next: "q2_settled" },
      { label: "No — I have not been in the UK for 3 continuous years", next: "NOT_ELIGIBLE" },
    ],
  },
  {
    id: "q2_settled",
    section: "02",
    sectionNum: 2,
    sectionLabel: "Settlement Status",
    question: "What is your EU Settlement Scheme status?",
    sub: "Both Settled and Pre-Settled status can qualify — we just need to confirm which you hold.",
    options: [
      {
        label: "Settled Status",
        sub: "You have been granted full settled status under the EU Settlement Scheme",
        next: "q_funding",
      },
      {
        label: "Pre-Settled Status",
        sub: "You have been granted pre-settled status and are still building residency",
        next: "q_funding",
      },
    ],
  },
  {
    id: "q1_other",
    section: "01",
    sectionNum: 1,
    sectionLabel: "Immigration Status",
    question: "Which of these best describes your current status?",
    sub: "Select the option that most closely matches your situation.",
    options: [
      {
        label: "Indefinite Leave to Remain / Enter (ILR / ILE)",
        sub: "Settled status outside the EU Settlement Scheme",
        next: "q1_ilr_residency",
      },
      {
        label: "Long Residence",
        sub: "20 years in the UK or more than half of your life in the UK",
        next: "q1_long_residence",
      },
      { label: "Refugee or family member of a refugee", next: "q_funding" },
      { label: "Family member of a UK national, Irish citizen, or settled-status holder", next: "q_funding" },
      { label: "Ukraine Permission Extension Scheme / family member", next: "q_funding" },
      { label: "Section 67, Calais leave, or dependent thereof", next: "q_funding" },
      { label: "Any Afghan scheme or Turkish worker scheme", next: "q_funding" },
      {
        label: "International student visa or Visit visa",
        sub: "Visiting students and tourist visa holders are not eligible",
        next: "NOT_ELIGIBLE",
      },
    ],
  },
  {
    id: "q1_long_residence",
    section: "01",
    sectionNum: 1,
    sectionLabel: "Long Residence",
    question: "Which long residence condition applies to you?",
    sub: "You only need to meet one of these two conditions.",
    options: [
      { label: "I have lived in the UK for 20 years or more", next: "q_funding" },
      { label: "I have spent more than half of my life in the UK", next: "q_funding" },
    ],
  },
  {
    id: "q1_ilr_residency",
    section: "02",
    sectionNum: 2,
    sectionLabel: "UK Residency",
    question: "Have you been living in the UK for the past 3 years?",
    sub: "This applies to ILR / ILE holders and long-residence applicants.",
    options: [
      { label: "Yes — I have been in the UK for 3+ years", next: "q_funding" },
      { label: "No — less than 3 years in the UK", next: "NOT_ELIGIBLE" },
    ],
  },
  {
    id: "q_funding",
    section: "03",
    sectionNum: 3,
    sectionLabel: "Prior Funding",
    question: "Have you previously received a student funding loan?",
    sub: "This includes any tuition fee loan or maintenance loan you have received in prior years.",
    options: [
      { label: "No — I have never received a student loan", next: "ELIGIBLE" },
      { label: "1 year", next: "ELIGIBLE" },
      { label: "2 years", next: "ELIGIBLE" },
      { label: "3 years", next: "ELIGIBLE" },
      { label: "4 years or more", sub: "Maximum funding years reached", next: "NOT_ELIGIBLE" },
    ],
  },
];

// ── Progress: each question gets an explicit step (1-based, out of TOTAL_STEPS)
// TOTAL_STEPS = total number of quiz questions the user will answer in the longest path
const TOTAL_STEPS = 3;

// Map question id → which step number it represents (1 = first question shown)
const STEP_MAP: Record<string, number> = {
  q1: 1,
  q2: 2,
  q2_eu: 2,
  q2_settled: 3,
  q1_other: 2,
  q1_long_residence: 3,
  q1_ilr_residency: 3,
  q_funding: 3,
};

const SECTIONS = [
  { num: 1, label: "Nationality" },
  { num: 2, label: "Residency" },
  { num: 3, label: "Prior Funding" },
];

// ── Progress Bar ──────────────────────────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  // current is the step being answered (1-indexed). Show progress as completion of previous steps.
  // When on step 1: 0% (nothing done yet)
  // When on step 2: 33% (step 1 done)
  // When on step 3: 66% (steps 1-2 done)
  // When result shown: 100% (all done)
  const pct = Math.round(((current - 1) / total) * 100);
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 h-[4px] rounded-full overflow-hidden" style={{ background: "#e8e8e8" }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ background: "#D6FD70" }}
        />
      </div>
      <span className="text-[13px] font-bold shrink-0" style={{ color: "#0a0a0a", minWidth: "36px", textAlign: "right" }}>
        {pct}%
      </span>
    </div>
  );
}

// ── Complete Progress Bar (100%) for result screens ───────────────────────────
function ProgressBarComplete() {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 h-[4px] rounded-full overflow-hidden" style={{ background: "#e8e8e8" }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: "66%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ background: "#D6FD70" }}
        />
      </div>
      <span className="text-[13px] font-bold shrink-0" style={{ color: "#0a0a0a", minWidth: "36px", textAlign: "right" }}>
        100%
      </span>
    </div>
  );
}

// ── Option Card ───────────────────────────────────────────────────────────────
interface OptionCardProps {
  opt: Option;
  index: number;
  layout?: "grid" | "list";
  onClick: () => void;
  isSaved?: boolean;
}

function OptionCard({ opt, index, layout, onClick, isSaved }: OptionCardProps) {
  const isGrid = layout === "grid";
  const [clicked, setClicked] = useState(false);
  const selected = isSaved || clicked;

  function handleClick() {
    setClicked(true);
    setTimeout(onClick, 180);
  }

  return (
    <motion.button
      initial={{ opacity: 0, x: isGrid ? 0 : -10, y: isGrid ? 12 : 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: EASE }}
      onClick={handleClick}
      className="group relative text-left overflow-hidden"
      style={{
        background: selected ? "#0a0a0a" : "#fff",
        border: `1.5px solid ${selected ? "#0a0a0a" : "#e8e8e8"}`,
        borderRadius: "18px",
        cursor: "pointer",
        transition: "border-color 0.18s, background 0.18s, box-shadow 0.18s",
      }}
      whileHover={{ x: isGrid ? 0 : 3, borderColor: "#0a0a0a", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}
      whileTap={{ scale: 0.985 }}
    >
      {!selected && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{ background: "#D6FD70", transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.28, ease: EASE }}
        />
      )}

      {isGrid ? (
        <div className="relative z-10 flex flex-col" style={{ padding: "18px 18px 50px" }}>
          {opt.tag && (
            <span className="self-start text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mb-2 shrink-0" style={{ background: "#D6FD70", color: "#0a0a0a" }}>
              {opt.tag}
            </span>
          )}
          <span className="text-[14px] font-semibold leading-snug" style={{ color: selected ? "#fff" : "#0a0a0a" }}>{opt.label}</span>
          {opt.sub && <span className="text-[12px] mt-1 leading-snug" style={{ color: selected ? "rgba(255,255,255,0.55)" : "#999" }}>{opt.sub}</span>}
          <div className="absolute bottom-3.5 right-3.5 flex items-center justify-center" style={{ width: "26px", height: "26px", borderRadius: "50%", background: selected ? "#D6FD70" : "#0a0a0a", transition: "background 0.18s" }}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke={selected ? "#0a0a0a" : "#D6FD70"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6h7M6.5 3l3 3-3 3" /></svg>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex items-center justify-between gap-4" style={{ padding: "16px 18px" }}>
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[15px] font-semibold leading-snug" style={{ color: selected ? "#fff" : "#0a0a0a" }}>{opt.label}</span>
              {opt.tag && (
                <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full shrink-0" style={{ background: "#D6FD70", color: "#0a0a0a" }}>{opt.tag}</span>
              )}
            </div>
            {opt.sub && <span className="text-[13px] mt-0.5 leading-snug" style={{ color: selected ? "rgba(255,255,255,0.55)" : "#888" }}>{opt.sub}</span>}
          </div>
          <div className="flex items-center justify-center shrink-0" style={{ width: "32px", height: "32px", borderRadius: "50%", background: selected ? "#D6FD70" : "#0a0a0a", transition: "background 0.18s" }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke={selected ? "#0a0a0a" : "#D6FD70"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 6h7M6.5 3l3 3-3 3" /></svg>
          </div>
        </div>
      )}
    </motion.button>
  );
}

// ── Not Eligible Screen ───────────────────────────────────────────────────────
function NotEligibleScreen({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex flex-col items-center text-center gap-8 py-4 max-w-xl mx-auto"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...SPRING, delay: 0.1 } as Transition}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
        style={{ background: "#f0f0f0" }}
      >
        <span className="text-[12px] font-bold uppercase tracking-widest" style={{ color: "#555" }}>
          Not eligible right now
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.55, ease: EASE }}
        className="text-[32px] md:text-[44px] font-extrabold text-[#0a0a0a] leading-[1.08] tracking-tight"
      >
        It looks like standard funding may not apply right now.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.45, ease: EASE }}
        className="text-[15px] leading-relaxed"
        style={{ color: "#555" }}
      >
        Based on your answers, you may not meet the standard criteria at this time. This doesn&apos;t
        mean your options are closed — circumstances change, and alternative pathways do exist.
        We&apos;d encourage you to speak with an advisor before making any final decisions.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.45, ease: EASE }}
        className="w-full rounded-2xl p-6 text-left"
        style={{ background: "#fafafa", border: "1.5px solid #ebebeb" }}
      >
        <p className="text-[12px] font-bold uppercase tracking-widest mb-4" style={{ color: "#bbb" }}>
          What you can do next
        </p>
        <ul className="flex flex-col gap-3">
          {[
            "Speak to a funding advisor at your chosen institution",
            "Check whether your circumstances have recently changed",
            "Explore bursaries, scholarships, or alternative funding routes",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-[14px] leading-snug" style={{ color: "#444" }}>
              <div className="mt-1 w-2 h-2 rounded-full shrink-0" style={{ background: "#D6FD70" }} />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[13px] transition-colors"
        style={{ color: "#aaa" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#0a0a0a")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11.5 7H2.5M6 3.5L2.5 7l3.5 3.5" />
        </svg>
        Review my answers
      </button>
    </motion.div>
  );
}

// ── Answer Review Screen ──────────────────────────────────────────────────────
interface AnswerReviewScreenProps {
  answers: Record<string, string>;
  onUnlock: () => void;
  onBack: () => void;
}

function AnswerReviewScreen({ answers, onUnlock, onBack }: AnswerReviewScreenProps) {
  const answerEntries = Object.entries(answers);

  // Short readable labels for each question
  const SHORT_LABELS: Record<string, string> = {
    "What is your nationality or current immigration status?": "Nationality / Status",
    "Have you been living in the UK for the past 3 years?": "UK Residency (3+ years)",
    "What is your EU Settlement Scheme status?": "EU Settlement Status",
    "Which of these best describes your current status?": "Immigration Status",
    "Which long residence condition applies to you?": "Long Residence Condition",
    "Have you previously received a student funding loan?": "Prior Student Loan",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex flex-col gap-0 max-w-xl mx-auto w-full"
    >
      {/* Header badge */}
      <div className="flex items-center gap-2 mb-5">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ background: "#D6FD70" }}
        >
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: "#0a0a0a",
            }}
          >
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#D6FD70" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6.2l2 2 4-4" />
            </svg>
          </div>
          <span className="text-[14px] font-bold uppercase tracking-widest" style={{ color: "#0a0a0a" }}>
            Quiz Complete
          </span>
        </div>
      </div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.5, ease: EASE }}
        className="text-[28px] md:text-[38px] font-extrabold text-[#0a0a0a] leading-[1.1] tracking-tight mb-2"
      >
        Your answers are ready.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4, ease: EASE }}
        className="text-[15px] leading-relaxed mb-8"
        style={{ color: "#777" }}
      >
        Here&apos;s a summary of what you told us. Everything looks good — unlock your result to find out if you&apos;re eligible.
      </motion.p>

      {/* Q&A Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.45, ease: EASE }}
        className="flex flex-col gap-2 mb-8"
      >
        {answerEntries.map(([question, answer], i) => (
          <motion.div
            key={question}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.06, duration: 0.32, ease: EASE }}
            className="flex items-start justify-between gap-4"
            style={{
              background: "#fafafa",
              border: "1.5px solid #ebebeb",
              borderRadius: "16px",
              padding: "14px 18px",
            }}
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              {/* Step dot */}
              <div
                className="flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  background: "#0a0a0a",
                }}
              >
                <span style={{ fontSize: "9px", fontWeight: 800, color: "#D6FD70" }}>{i + 1}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "#bbb" }}>
                  {SHORT_LABELS[question] ?? `Question ${i + 1}`}
                </span>
                <span className="text-[14px] font-semibold leading-snug" style={{ color: "#0a0a0a" }}>
                  {answer}
                </span>
              </div>
            </div>
            {/* Checkmark */}
            <div
              className="shrink-0 flex items-center justify-center mt-0.5"
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "#D6FD70",
              }}
            >
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 6.2l2 2 4-4" />
              </svg>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lock / Unlock CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.42, ease: EASE }}
        className="w-full rounded-2xl overflow-hidden mb-6"
        style={{
          background: "#0a0a0a",
          border: "1.5px solid #0a0a0a",
        }}
      >
        {/* Blurred result teaser */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
              Your Eligibility Result
            </span>
            {/* Blurred placeholder text */}
            <div className="flex items-center gap-2 mt-1">
              <div
                style={{
                  width: "140px",
                  height: "18px",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.12)",
                  filter: "blur(6px)",
                }}
              />
            </div>
          </div>
          {/* Lock icon */}
          <div
            className="flex items-center justify-center"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>

        {/* CTA button */}
        <button
          onClick={onUnlock}
          className="w-full flex items-center justify-between px-5 py-4 group"
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(214,253,112,0.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center shrink-0"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#D6FD70",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 9.9-1" />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[15px] font-bold" style={{ color: "#D6FD70" }}>
                Unlock your result
              </span>
              <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                Takes 30 seconds — completely free
              </span>
            </div>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#D6FD70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 7h9M8.5 3.5L12 7l-3.5 3.5" />
          </svg>
        </button>
      </motion.div>

      {/* Back link */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[13px] transition-colors self-start"
        style={{ color: "#aaa" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#0a0a0a")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11.5 7H2.5M6 3.5L2.5 7l3.5 3.5" />
        </svg>
        Review my answers
      </button>
    </motion.div>
  );
}

// ── Lead Capture Screen ───────────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  mobile: string;
}

interface LeadCaptureScreenProps {
  onBack: () => void;
  answers: Record<string, string>;
}

function LeadCaptureScreen({ onBack, answers }: LeadCaptureScreenProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({ name: "", email: "", mobile: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function validate(): boolean {
    const next: Partial<FormData> = {};
    if (!form.name.trim()) next.name = "Please enter your full name";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email address";
    if (!form.mobile.trim() || !/^[\d\s+\-()\u00A0]{7,15}$/.test(form.mobile))
      next.mobile = "Please enter a valid mobile number";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit() {
    if (!validate() || submitting) return;
    setSubmitting(true);
    setServerError(null);

    try {
      const answersText = Object.entries(answers)
        .map(([q, a]) => `Q: ${q}\nA: ${a}`)
        .join("\n\n");

      const submittedAt = new Date().toLocaleString("en-GB", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "Europe/London",
      });

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_USER_TEMPLATE_ID,
        {
          user_name: form.name.trim(),
          user_email: form.email.trim(),
        },
        EMAILJS_PUBLIC_KEY
      );

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_ADMIN_TEMPLATE_ID,
        {
          user_name: form.name.trim(),
          user_email: form.email.trim(),
          user_mobile: form.mobile.trim(),
          answers_text: answersText,
          submitted_at: submittedAt,
          admin_email: ADMIN_EMAIL,
        },
        EMAILJS_PUBLIC_KEY
      );

      router.push("/thank-you");
    } catch (err) {
      console.error("EmailJS error:", err);
      setServerError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  const fields: { key: keyof FormData; label: string; placeholder: string; type: string }[] = [
    { key: "name", label: "Full Name", placeholder: "Jane Smith", type: "text" },
    { key: "email", label: "Email Address", placeholder: "jane@example.com", type: "email" },
    { key: "mobile", label: "Mobile Number", placeholder: "+44 7700 900000", type: "tel" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex flex-col gap-0 max-w-xl mx-auto w-full"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "#0a0a0a" }}>
          <div className="flex items-center justify-center shrink-0" style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#D6FD70" }}>
            <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5.5" width="8" height="5" rx="1" />
              <path d="M4 5.5V4a2 2 0 0 1 3.9-.5" />
            </svg>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-white">
            Unlock Result
          </span>
        </div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.5, ease: EASE }}
        className="text-[28px] md:text-[38px] font-extrabold text-[#0a0a0a] leading-[1.1] tracking-tight mb-2"
      >
        One last step to see your result.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4, ease: EASE }}
        className="text-[15px] leading-relaxed mb-8"
        style={{ color: "#777" }}
      >
        Enter your details below and we&apos;ll send your eligibility result straight to your inbox — no account needed, completely free.
      </motion.p>

      <div className="flex flex-col gap-4 mb-8">
        {fields.map((field, i) => (
          <motion.div
            key={field.key}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.26 + i * 0.07, duration: 0.35, ease: EASE }}
            className="flex flex-col gap-1.5"
          >
            <label
              htmlFor={field.key}
              className="text-[12px] font-bold uppercase tracking-widest"
              style={{ color: "#0a0a0a" }}
            >
              {field.label}
            </label>
            <input
              id={field.key}
              type={field.type}
              placeholder={field.placeholder}
              value={form[field.key]}
              autoComplete={field.key === "name" ? "name" : field.key === "email" ? "email" : "tel"}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, [field.key]: e.target.value }));
                if (errors[field.key]) setErrors((prev) => ({ ...prev, [field.key]: undefined }));
              }}
              style={{
                background: "#fff",
                border: `1.5px solid ${errors[field.key] ? "#ff4d4f" : "#e8e8e8"}`,
                borderRadius: "14px",
                padding: "14px 18px",
                fontSize: "15px",
                fontFamily: "inherit",
                color: "#0a0a0a",
                outline: "none",
                transition: "border-color 0.18s",
                width: "100%",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#0a0a0a"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = errors[field.key] ? "#ff4d4f" : "#e8e8e8"; }}
            />
            {errors[field.key] && (
              <span className="text-[12px]" style={{ color: "#ff4d4f" }}>{errors[field.key]}</span>
            )}
          </motion.div>
        ))}
      </div>

      {serverError && (
        <p className="text-[13px] mb-5" style={{ color: "#ff4d4f" }}>{serverError}</p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.38, ease: EASE }}
        className="flex flex-col items-start gap-4"
      >
        <EligibilityButton
          label={submitting ? "Sending…" : "See My Result"}
          onClick={handleSubmit}
        />
        <p className="text-[12px]" style={{ color: "#bbb" }}>
          We&apos;ll only use your details to send your result. No spam, ever.
        </p>
      </motion.div>

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[13px] transition-colors mt-6 self-start"
        style={{ color: "#aaa" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#0a0a0a")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11.5 7H2.5M6 3.5L2.5 7l3.5 3.5" />
        </svg>
        Go back
      </button>
    </motion.div>
  );
}

// ── Screen States ─────────────────────────────────────────────────────────────
type ScreenState = "quiz" | "not_eligible" | "review" | "form";

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function EligibilityQuizPage() {
  const [history, setHistory] = useState<string[]>(["q1"]);
  const [pointer, setPointer] = useState(0);
  const [screen, setScreen] = useState<ScreenState>("quiz");
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const activeId = history[pointer];
  const activeCurrent = QUESTIONS.find((q) => q.id === activeId)!;

  // Current step number (1-indexed) based on the active question id
  const currentStep = STEP_MAP[activeId] ?? 1;

  const activeSection = activeCurrent?.sectionNum ?? 1;

  const canGoBack =
    (screen === "quiz" && pointer > 0) ||
    screen === "not_eligible" ||
    screen === "review" ||
    screen === "form";

  const canGoForward = screen === "quiz" && pointer < history.length - 1;

  function handleChoose(option: Option) {
    setDirection(1);
    setAnswers((prev) => ({ ...prev, [activeCurrent.question]: option.label }));

    if (option.next === "NOT_ELIGIBLE") {
      setScreen("not_eligible");
      return;
    }
    if (option.next === "ELIGIBLE") {
      setScreen("review");
      return;
    }

    const newHistory = [...history.slice(0, pointer + 1), option.next];
    setHistory(newHistory);
    setPointer(newHistory.length - 1);
  }

  function handleBack() {
    setDirection(-1);
    if (screen === "form") {
      setScreen("review");
      return;
    }
    if (screen === "review" || screen === "not_eligible") {
      setScreen("quiz");
      return;
    }
    if (screen === "quiz" && pointer > 0) {
      setPointer((p) => p - 1);
    }
  }

  function handleForward() {
    setDirection(1);
    if (canGoForward) setPointer((p) => p + 1);
  }

  function handleUnlock() {
    setScreen("form");
  }

  const showProgress = screen === "quiz";
  const showCompleteProgress = screen === "review" || screen === "form" || screen === "not_eligible";

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
      {/* Progress bar area */}
      {(showProgress || showCompleteProgress) && (
        <div className="shrink-0 px-4 md:px-10 pt-5 pb-1">
          {/* Section indicators */}
          <div className="relative flex items-center justify-center mb-3 min-h-[32px]">
            <div className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
              {SECTIONS.map((s, i) => {
                const done = showCompleteProgress || s.num < activeSection;
                const active = showProgress && s.num === activeSection;
                return (
                  <div key={s.num} className="flex items-center">
                    <div
                      className="flex items-center gap-1.5 px-2 py-1 rounded-full transition-all duration-300"
                      style={{ background: active ? "#0a0a0a" : "transparent" }}
                    >
                      <motion.div
                        animate={{ background: done || active ? "#D6FD70" : "#e0e0e0" }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-center shrink-0"
                        style={{ width: "16px", height: "16px", borderRadius: "50%" }}
                      >
                        {done ? (
                          <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 5.2l2 2 4-4" />
                          </svg>
                        ) : (
                          <span style={{ fontSize: "8px", fontWeight: 700, color: active ? "#0a0a0a" : "#bbb" }}>{s.num}</span>
                        )}
                      </motion.div>
                      <span className="text-[14px] font-semibold transition-colors" style={{ color: active ? "white" : done ? "#0a0a0a" : "#bbb" }}>
                        {s.label}
                      </span>
                    </div>
                    {i < SECTIONS.length - 1 && (
                      <div className="w-3 h-px" style={{ background: done ? "#D6FD70" : "#e5e5e5" }} />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex lg:hidden items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
              {SECTIONS.map((s) => {
                const done = showCompleteProgress || s.num < activeSection;
                const active = showProgress && s.num === activeSection;
                return (
                  <motion.div
                    key={s.num}
                    animate={{ background: active ? "#0a0a0a" : done ? "#D6FD70" : "#e0e0e0", width: active ? "24px" : "8px" }}
                    transition={{ duration: 0.3 }}
                    style={{ height: "8px", borderRadius: "9999px" }}
                  />
                );
              })}
            </div>
          </div>

          {/* Progress bar */}
          {showCompleteProgress ? (
            <ProgressBarComplete />
          ) : (
            <ProgressBar current={currentStep} total={TOTAL_STEPS} />
          )}
        </div>
      )}

      <main className="flex-1 w-full max-w-2xl mx-auto px-5 md:px-8 py-10 md:py-14 flex flex-col">
        <AnimatePresence mode="wait" custom={direction}>
          {screen === "not_eligible" ? (
            <NotEligibleScreen key="not-eligible" onBack={handleBack} />
          ) : screen === "review" ? (
            <AnswerReviewScreen
              key="review"
              answers={answers}
              onUnlock={handleUnlock}
              onBack={handleBack}
            />
          ) : screen === "form" ? (
            <LeadCaptureScreen key="lead-form" onBack={handleBack} answers={answers} />
          ) : (
            <motion.div
              key={activeId}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="flex flex-col gap-0"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "#0a0a0a" }}>
                  <div className="flex items-center justify-center shrink-0" style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#D6FD70" }}>
                    <span style={{ fontSize: "9px", fontWeight: 800, color: "#0a0a0a" }}>{activeCurrent.sectionNum}</span>
                  </div>
                  <span className="text-[16px] font-bold uppercase tracking-widest text-white">{activeCurrent.sectionLabel}</span>
                </div>
              </div>

              <h1 className="text-[24px] md:text-[32px] font-extrabold text-[#0a0a0a] leading-[1.12] tracking-tight mb-2">
                {activeCurrent.question}
              </h1>
              {activeCurrent.sub ? (
                <p className="text-[16px] leading-relaxed mb-8" style={{ color: "#888" }}>{activeCurrent.sub}</p>
              ) : (
                <div className="mb-8" />
              )}

              {activeCurrent.layout === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCurrent.options.map((opt, i) => (
                    <OptionCard key={opt.label} opt={opt} index={i} layout="grid" onClick={() => handleChoose(opt)} isSaved={answers[activeCurrent.question] === opt.label} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {activeCurrent.options.map((opt, i) => (
                    <OptionCard key={opt.label} opt={opt} index={i} layout="list" onClick={() => handleChoose(opt)} isSaved={answers[activeCurrent.question] === opt.label} />
                  ))}
                </div>
              )}

              <div className="mt-8 flex items-center justify-between">
                {canGoBack ? (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-[13px] font-medium transition-colors"
                    style={{ color: "#bbb" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#0a0a0a")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#bbb")}
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11.5 7H2.5M6 3.5L2.5 7l3.5 3.5" />
                    </svg>
                    Previous question
                  </button>
                ) : <div />}

                {canGoForward && (
                  <button
                    onClick={handleForward}
                    className="flex items-center gap-2 text-[13px] font-semibold transition-colors"
                    style={{ color: "#0a0a0a" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#555")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#0a0a0a")}
                  >
                    Continue
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.5 7h9M8.5 3.5L12 7l-3.5 3.5" />
                    </svg>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {screen === "quiz" && (
          <div className="mt-10 flex flex-wrap gap-5 justify-center">
            {["Free to use", "No documents needed at this stage", "Takes under 60 seconds"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 font-semibold" style={{ color: "#555", fontSize: "14px" }}>
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: "#D6FD70" }} />
                {t}
              </span>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}