"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SPRING: Transition = { type: "spring", stiffness: 320, damping: 26 };

const CONFETTI_DATA = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: (((i * 137.508) % 1) - 0.5) * 340,
  y: -(((i * 97.312) % 1) * 220 + 60),
  rot: ((i * 53.742) % 1) * 720 - 360,
  color: i % 4 === 0 ? "#D6FD70" : i % 4 === 1 ? "#0a0a0a" : i % 4 === 2 ? "#c8f560" : "#e8ffe0",
  size: ((i * 41.177) % 1) * 9 + 5,
  delay: ((i * 23.918) % 1) * 0.4,
  shape: i % 3,
}));

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

const QUESTIONS: Question[] = [
  {
    id: "q1", section: "01", sectionNum: 1, sectionLabel: "Residency & Immigration",
    question: "What is your nationality or current immigration status in the UK?",
    sub: "Student Finance England requires this as the first eligibility check.",
    options: [
      { label: "British Citizen", next: "q2", tag: "Most common" },
      { label: "ILR — Indefinite Leave to Remain", sub: "Settled status holder", next: "q1_ilr" },
      { label: "LLR — Limited Leave to Remain", sub: "Time-limited visa holder", next: "q1_llr" },
      { label: "Pre-settlement status (EU)", sub: "EU Settlement Scheme", next: "q1_llr" },
      { label: "Refugee / Ukraine Scheme / Afghan Scheme", sub: "Protected person — no entry date required", next: "q2" },
      { label: "Other visa or Asylum seeker", sub: "Work visa, student visa, or asylum", next: "NOT_ELIGIBLE" },
    ],
  },
  {
    id: "q1_ilr", section: "01", sectionNum: 1, sectionLabel: "Residency & Immigration",
    question: "A couple more details about your ILR status.",
    sub: "This helps us confirm whether you meet the 3-year residency requirement.",
    options: [
      { label: "I have been settled for 3+ years", sub: "And a spouse or blood relative holds a British passport or ILR", next: "q2" },
      { label: "I have been settled for less than 3 years", next: "CALL" },
    ],
  },
  {
    id: "q1_llr", section: "01", sectionNum: 1, sectionLabel: "Residency & Immigration",
    question: "How long have you been living in the United Kingdom?",
    options: [
      { label: "More than 20 years", next: "CALL" },
      { label: "More than half of my life", next: "CALL" },
      { label: "3+ years and a spouse or blood relative holds British or ILR status", next: "q2" },
      { label: "Less than 3 years", next: "NOT_ELIGIBLE" },
    ],
  },
  {
    id: "q2", section: "02", sectionNum: 2, sectionLabel: "Student Finance History",
    question: "Have you previously received Student Finance from the UK government?",
    sub: "This includes tuition fee loans and maintenance loans.",
    options: [
      { label: "No — never received Student Finance", next: "q3", tag: "Skip ahead" },
      { label: "Yes — for 1 year only", next: "q3" },
      { label: "Yes — for 2 years", next: "q2_2yr" },
      { label: "Yes — for 3 or more years", next: "q2_3yr" },
    ],
  },
  {
    id: "q2_2yr", section: "02", sectionNum: 2, sectionLabel: "Student Finance History",
    question: "What was the outcome of your 2-year funded period?",
    options: [
      { label: "I completed my HND", next: "q3" },
      { label: "I dropped out due to a medical emergency", sub: "Medical documentation will be required", next: "q3" },
      { label: "I dropped out because I disliked the course", next: "NOT_ELIGIBLE" },
    ],
  },
  {
    id: "q2_3yr", section: "02", sectionNum: 2, sectionLabel: "Student Finance History",
    question: "What was the 3+ year funding used for?",
    options: [
      { label: "I completed a Bachelor's degree", next: "q3" },
      { label: "I did not complete my Bachelor's degree", next: "NOT_ELIGIBLE" },
      { label: "It was used for a Master's degree", next: "NOT_ELIGIBLE" },
    ],
  },
  {
    id: "q3", section: "03", sectionNum: 3, sectionLabel: "Academic Qualification",
    question: "What is your highest level of academic qualification?",
    sub: "This determines your entry route. Overseas qualifications are considered.",
    layout: "grid",
    options: [
      { label: "GCSE / Foundation", sub: "Level 2 — 7-month foundation year required", next: "q5", tag: "Level 2" },
      { label: "A-Levels / GCE", sub: "Level 3 — enter a 3-year Bachelor's", next: "q5", tag: "Level 3" },
      { label: "Access / Diploma", sub: "Level 4 — enter a 3-year Bachelor's", next: "q5", tag: "Level 4" },
      { label: "HND", sub: "Level 5 — eligible for 1-year top-up degree", next: "q5", tag: "Level 5" },
      { label: "Bachelor's Degree", sub: "Level 6 — eligible for 1-year Master's", next: "q5", tag: "Level 6" },
      { label: "No formal qualification", sub: "Work experience may still qualify you", next: "q4" },
    ],
  },
  {
    id: "q4", section: "04", sectionNum: 4, sectionLabel: "Work Experience",
    question: "Do you have relevant work experience?",
    sub: "Work experience can substitute for academic qualifications in many cases.",
    options: [
      { label: "Yes — in a skilled or professional role", sub: "I can provide a work reference email", next: "q4_skilled" },
      { label: "Yes — in an unskilled role", sub: "I can provide P60s and P45s", next: "q4_unskilled" },
      { label: "No work experience", next: "NOT_ELIGIBLE" },
    ],
  },
  {
    id: "q4_skilled", section: "04", sectionNum: 4, sectionLabel: "Work Experience",
    question: "Can you provide a work reference email from your employer?",
    options: [
      { label: "Yes — I can provide a reference email", next: "q5" },
      { label: "No — I cannot provide one", next: "NOT_ELIGIBLE" },
    ],
  },
  {
    id: "q4_unskilled", section: "04", sectionNum: 4, sectionLabel: "Work Experience",
    question: "Can you provide your P60s or P45s to verify your employment?",
    options: [
      { label: "Yes — I can provide P60s / P45s", next: "q5" },
      { label: "No — I cannot provide these", next: "NOT_ELIGIBLE" },
    ],
  },
  {
    id: "q5", section: "05", sectionNum: 5, sectionLabel: "Course Interest",
    question: "Which university are you most interested in studying with?",
    sub: "All are based in London or Manchester with flexible timetables.",
    options: [
      { label: "ARU — Anglia Ruskin University", sub: "Poplar, London · Bachelor's & Master's available", next: "q5_aru", tag: "London" },
      { label: "UCLan — University of Central Lancashire", sub: "Poplar, London · Evening & weekend options", next: "q5_uclan", tag: "London" },
      { label: "UOBM — University of Bolton Manchester", sub: "Manchester Science Park · Daytime & evening", next: "q5_uobm", tag: "Manchester" },
      { label: "Not sure yet", sub: "We can help you decide based on your goals", next: "q6" },
    ],
  },
  {
    id: "q5_aru", section: "05", sectionNum: 5, sectionLabel: "Course Interest",
    question: "Which ARU programme interests you most?",
    sub: "3rd Floor, Import Building, 2 Clove Crescent, Poplar, London E14 2BE · 2 days/week",
    layout: "grid",
    options: [
      { label: "Business & Financial Management", sub: "Foundation year only", next: "q6", tag: "BSc" },
      { label: "Business & Human Resource Management", next: "q6", tag: "BSc" },
      { label: "Business & Law", next: "q6", tag: "BSc" },
      { label: "Digital Marketing & Management", next: "q6", tag: "BSc" },
      { label: "Finance & Accounting", next: "q6", tag: "BSc" },
      { label: "Health & Social Care", next: "q6", tag: "BSc" },
      { label: "International Business Management", next: "q6", tag: "BSc" },
      { label: "LLB Law", next: "q6", tag: "LLB" },
      { label: "Master of Public Health", next: "q6", tag: "MSc" },
      { label: "MBA (International / Health)", next: "q6", tag: "MBA" },
      { label: "MSc Accounting & Financial Management", next: "q6", tag: "MSc" },
      { label: "LLM International Law", next: "q6", tag: "LLM" },
    ],
  },
  {
    id: "q5_uclan", section: "05", sectionNum: 5, sectionLabel: "Course Interest",
    question: "Which UCLan programme interests you?",
    sub: "6th Floor, Import Building, 2 Clove Crescent, Poplar, London · Evening & weekend options available",
    layout: "grid",
    options: [
      { label: "Psychology", next: "q6", tag: "BSc" },
      { label: "Mental Health & Wellbeing", next: "q6", tag: "BSc" },
      { label: "Computing", next: "q6", tag: "BSc" },
      { label: "Public Health", next: "q6", tag: "BSc" },
    ],
  },
  {
    id: "q5_uobm", section: "05", sectionNum: 5, sectionLabel: "Course Interest",
    question: "Which UOBM programme interests you?",
    sub: "Manchester Science Park, Manchester · Daytime (2 days) or Evening + Saturday options",
    layout: "grid",
    options: [
      { label: "International Business Management", next: "q6", tag: "BSc" },
      { label: "Health & Social Care", next: "q6", tag: "BSc" },
      { label: "Computing", next: "q6", tag: "BSc" },
      { label: "Accounting & Finance", next: "q6", tag: "BSc" },
    ],
  },
  {
    id: "q6", section: "06", sectionNum: 6, sectionLabel: "Funding Details",
    question: "Which type of funding are you looking to apply for?",
    sub: "Student Finance England offers both undergraduate and postgraduate loans.",
    options: [
      { label: "Undergraduate funding (Bachelor's / Top-up)", sub: "Up to £60,000 total · £9,250 tuition + £13,500 maintenance per year", next: "q7", tag: "Most popular" },
      { label: "Postgraduate funding (Master's)", sub: "Up to £12,200 · covers tuition and personal expenses", next: "q7" },
      { label: "Not sure — help me decide", next: "q7" },
    ],
  },
  {
    id: "q7", section: "07", sectionNum: 7, sectionLabel: "Our Services",
    question: "Which of our services would be most helpful to you right now?",
    sub: "All services provided by PrimeLeed are completely free of charge.",
    layout: "grid",
    options: [
      { label: "Eligibility consultation", next: "ELIGIBLE" },
      { label: "University application support", next: "ELIGIBLE" },
      { label: "Student Finance application", next: "ELIGIBLE" },
      { label: "CV & personal statement help", next: "ELIGIBLE" },
      { label: "Interview & exam preparation", next: "ELIGIBLE" },
      { label: "Documentation support", next: "ELIGIBLE" },
      { label: "Career advice", next: "ELIGIBLE" },
      { label: "All of the above", next: "ELIGIBLE", tag: "Recommended" },
    ],
  },
];

const SECTIONS = [
  { num: 1, label: "Residency" },
  { num: 2, label: "Finance" },
  { num: 3, label: "Qualification" },
  { num: 4, label: "Experience" },
  { num: 5, label: "Courses" },
  { num: 6, label: "Funding" },
  { num: 7, label: "Services" },
];

const STEP_MAP: Record<string, number> = {
  q1: 1, q1_ilr: 2, q1_llr: 2, q2: 3, q2_2yr: 4, q2_3yr: 4,
  q3: 5, q4: 6, q4_skilled: 7, q4_unskilled: 7, q5: 8,
  q5_aru: 9, q5_uclan: 9, q5_uobm: 9, q6: 10, q7: 11,
};
const TOTAL_STEPS = 12;

const MILESTONES: Record<number, string> = {
  2: "Section 1 cleared",
  3: "Finance history confirmed",
  5: "Qualifications verified",
  8: "Course pathway unlocked",
  10: "Funding route identified",
  11: "Almost done",
};

// ─── EligibilityButton ────────────────────────────────────────────────────────
function EligibilityButton({ label = "Check My Eligibility", onClick }: {
  label?: string; onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        padding: "8px 8px 8px 28px",
        borderRadius: "9999px",
        border: `2.5px solid ${hovered ? "#D6FD70" : "transparent"}`,
        outline: "none",
        cursor: "pointer",
        width: "fit-content",
        backgroundColor: "#D6FD70",
        transition: "border-color 0.3s ease",
        overflow: "hidden",
      }}
    >
      <span style={{
        position: "absolute", right: "8px", top: "50%",
        width: "46px", height: "46px", borderRadius: "9999px",
        backgroundColor: "#000",
        transform: hovered ? "translate(50%, -50%) scale(30)" : "translate(50%, -50%) scale(0)",
        transformOrigin: "center center",
        transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
      }} />
      <span style={{
        position: "relative", zIndex: 1,
        fontFamily: "var(--font-plus-jakarta), sans-serif",
        fontSize: "16px", fontWeight: 700, letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: hovered ? "#fff" : "#000",
        transition: "color 0.25s ease 0.05s",
        whiteSpace: "nowrap",
      }}>
        {label}
      </span>
      <span style={{
        position: "relative", zIndex: 1,
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "42px", height: "42px", borderRadius: "9999px",
        backgroundColor: "#000", flexShrink: 0,
        transition: "transform 0.3s ease",
        transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
      }}>
        <ArrowUpRight size={18} style={{ color: "#D6FD70" }} />
      </span>
    </button>
  );
}

// ─── Confetti ─────────────────────────────────────────────────────────────────
function Confetti() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center" style={{ zIndex: 0 }}>
      {CONFETTI_DATA.map((p) => (
        <motion.div key={p.id}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 0 }}
          animate={{ x: p.x, y: p.y, rotate: p.rot, opacity: 0, scale: 1.2 }}
          transition={{ duration: 1.2, delay: p.delay, ease: [0.15, 0.85, 0.35, 1] }}
          style={{
            position: "absolute", width: p.size,
            height: p.shape === 0 ? p.size : p.size * 0.4,
            borderRadius: p.shape === 0 ? "50%" : p.shape === 1 ? "2px" : "1px",
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}

// ─── Milestone Toast ──────────────────────────────────────────────────────────
function MilestoneToast({ step }: { step: number }) {
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("");
  const prev = useRef(0);

  useEffect(() => {
    if (step !== prev.current && MILESTONES[step]) {
      prev.current = step;
      setLabel(MILESTONES[step]);
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 2400);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 60, opacity: 0 }}
          transition={SPRING}
          className="fixed bottom-8 right-6 z-50 flex items-center gap-3 pl-4 pr-5 py-3 rounded-2xl shadow-xl"
          style={{ background: "#0a0a0a" }}
        >
          <div className="flex items-center justify-center shrink-0"
            style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#D6FD70" }}>
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 5.2l2 2 4-4" />
            </svg>
          </div>
          <span className="text-[13px] font-semibold text-white">{label}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Segmented Progress ───────────────────────────────────────────────────────
function SegmentedProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-[3px] w-full">
      {Array.from({ length: total }, (_, i) => {
        const filled = i < current;
        const active = i === current - 1;
        return (
          <motion.div key={i} className="h-[3px] flex-1 rounded-full overflow-hidden" style={{ background: "#e8e8e8" }}>
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: filled ? "100%" : "0%" }}
              transition={{ duration: 0.5, ease: EASE, delay: active ? 0.1 : 0 }}
              style={{ background: "#D6FD70" }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Option Card ──────────────────────────────────────────────────────────────
function OptionCard({ opt, index, layout, onClick, isSaved }: {
  opt: Option; index: number; layout?: "grid" | "list"; onClick: () => void; isSaved?: boolean;
}) {
  const isGrid = layout === "grid";
  // FIX: use a key-based approach instead of useEffect + setState to avoid cascading renders
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const selected = isSaved || selectedLabel === opt.label;

  function handleClick() {
    setSelectedLabel(opt.label);
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
        borderRadius: "18px", cursor: "pointer",
        transition: "border-color 0.18s, background 0.18s, box-shadow 0.18s",
      }}
      whileHover={{ x: isGrid ? 0 : 3, borderColor: "#0a0a0a", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}
      whileTap={{ scale: 0.985 }}
    >
      {!selected && (
        <motion.div className="absolute inset-0 z-0"
          style={{ background: "#D6FD70", transformOrigin: "left" }}
          initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.28, ease: EASE }}
        />
      )}

      {isGrid ? (
        <div className="relative z-10 flex flex-col" style={{ padding: "18px 18px 50px" }}>
          {opt.tag && (
            <span className="self-start text-[10px] font-bold uppercase tracking-wide px-2 py-0.75 rounded-full mb-2 shrink-0"
              style={{ background: "#D6FD70", color: "#0a0a0a" }}>{opt.tag}</span>
          )}
          <span className="text-[14px] font-semibold leading-snug" style={{ color: selected ? "#fff" : "#0a0a0a" }}>{opt.label}</span>
          {opt.sub && <span className="text-[12px] mt-1 leading-snug" style={{ color: selected ? "rgba(255,255,255,0.55)" : "#999" }}>{opt.sub}</span>}
          <div className="absolute bottom-3.5 right-3.5 flex items-center justify-center"
            style={{ width: "26px", height: "26px", borderRadius: "50%", background: selected ? "#D6FD70" : "#0a0a0a", transition: "background 0.18s" }}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke={selected ? "#0a0a0a" : "#D6FD70"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 6h7M6.5 3l3 3-3 3" />
            </svg>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex items-center justify-between gap-4" style={{ padding: "16px 18px" }}>
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[15px] font-semibold leading-snug" style={{ color: selected ? "#fff" : "#0a0a0a" }}>{opt.label}</span>
              {opt.tag && (
                <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.75 rounded-full shrink-0"
                  style={{ background: "#D6FD70", color: "#0a0a0a" }}>{opt.tag}</span>
              )}
            </div>
            {opt.sub && <span className="text-[13px] mt-0.75 leading-snug" style={{ color: selected ? "rgba(255,255,255,0.55)" : "#888" }}>{opt.sub}</span>}
          </div>
          <div className="flex items-center justify-center shrink-0"
            style={{ width: "32px", height: "32px", borderRadius: "50%", background: selected ? "#D6FD70" : "#0a0a0a", transition: "background 0.18s" }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke={selected ? "#0a0a0a" : "#D6FD70"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 6h7M6.5 3l3 3-3 3" />
            </svg>
          </div>
        </div>
      )}
    </motion.button>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────────────
function ResultScreen({ result, onBack }: { result: "ELIGIBLE" | "NOT_ELIGIBLE" | "CALL"; onBack: () => void }) {
  const isEligible = result === "ELIGIBLE";
  const config = {
    ELIGIBLE: {
      heading: "You qualify for Student Finance.",
      body: "Based on your responses, you meet the criteria for government-backed funding. Your next step is a free consultation with one of our advisors to begin your application.",
      badge: "Eligible", badgeBg: "#D6FD70", badgeText: "#0a0a0a", cta: "Book a Free Consultation",
      stats: [
        { val: "£9,250", label: "Tuition / year", note: "Paid to university", dark: true },
        { val: "£13,500", label: "Maintenance / year", note: "Paid directly to you", dark: false },
        { val: "~£60k", label: "Total over 3 years", note: "Government backed", dark: false },
      ],
    },
    NOT_ELIGIBLE: {
      heading: "Standard funding may not apply.",
      body: "Based on your current answers, you may not meet the standard Student Finance criteria. However, our team may be able to identify alternative pathways — speak to an advisor.",
      badge: "Let's explore options", badgeBg: "#f0f0f0", badgeText: "#555", cta: "Speak to an Advisor", stats: [],
    },
    CALL: {
      heading: "A specialist will review your case.",
      body: "Your situation involves specific criteria that our advisors are best placed to assess. We will contact you for a free 10-minute call to walk through your options.",
      badge: "Case review needed", badgeBg: "#0a0a0a", badgeText: "#D6FD70", cta: "Request a Callback", stats: [],
    },
  }[result];

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}
      className="relative flex flex-col items-center text-center gap-8 py-4">
      {isEligible && <Confetti />}
      <div className="relative z-10 w-full flex flex-col items-center gap-6 max-w-140 mx-auto">
        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ ...SPRING, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: config.badgeBg }}>
          {isEligible && (
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none" stroke={config.badgeText} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 5.2l2 2 4-4" />
            </svg>
          )}
          <span className="text-[12px] font-bold uppercase tracking-widest" style={{ color: config.badgeText }}>{config.badge}</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.55, ease: EASE }}
          className="text-[32px] md:text-[44px] font-extrabold text-[#0a0a0a] leading-[1.08] tracking-tight">
          {config.heading}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.45, ease: EASE }}
          className="text-[15px] leading-relaxed" style={{ color: "#555" }}>
          {config.body}
        </motion.p>

        {config.stats.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.45, ease: EASE }}
            className="grid grid-cols-3 gap-3 w-full">
            {config.stats.map((s, i) => (
              <motion.div key={s.val} initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.48 + i * 0.08, ...SPRING }}
                className="flex flex-col items-center gap-1 rounded-2xl py-5 px-3"
                style={{ background: s.dark ? "#0a0a0a" : "white", border: s.dark ? "none" : "1.5px solid #ebebeb" }}>
                <span className="text-[22px] font-extrabold tracking-tight" style={{ color: s.dark ? "#D6FD70" : "#0a0a0a" }}>{s.val}</span>
                <span className="text-[12px] font-semibold text-center leading-tight" style={{ color: s.dark ? "rgba(255,255,255,0.9)" : "#0a0a0a" }}>{s.label}</span>
                <span className="text-[11px] text-center leading-tight" style={{ color: s.dark ? "rgba(255,255,255,0.45)" : "#999" }}>{s.note}</span>
              </motion.div>
            ))}
          </motion.div>
        )}

        {isEligible && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.4 }}
            className="w-full rounded-2xl border border-[#ebebeb] p-5 text-left">
            <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: "#aaa" }}>
              What PrimeLeed handles for you — free
            </p>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              {["University application", "Student Finance application", "CV & personal statement", "Interview preparation", "Documentation support", "Enrollment support"].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#D6FD70" }} />
                  <span className="text-[13px]" style={{ color: "#444" }}>{s}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.45, ease: EASE }}
          className="flex flex-col items-center gap-3">
          <EligibilityButton label={config.cta} onClick={() => {}} />
          <p className="text-[12px]" style={{ color: "#999" }}>
            PrimeLeed Education · 01 Woodlands Grove, Romford RM4 1FB · All services free
          </p>
        </motion.div>

        <button onClick={onBack} className="flex items-center gap-2 text-[13px] transition-colors" style={{ color: "#aaa" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#0a0a0a")}
          onMouseLeave={e => (e.currentTarget.style.color = "#aaa")}>
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11.5 7H2.5M6 3.5L2.5 7l3.5 3.5" />
          </svg>
          Review my answers
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function EligibilityQuizPage() {
  const [history, setHistory] = useState<string[]>(["q1"]);
  const [pointer, setPointer] = useState(0);
  const [result, setResult] = useState<"ELIGIBLE" | "NOT_ELIGIBLE" | "CALL" | null>(null);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const activeId = history[pointer];
  const activeCurrent = QUESTIONS.find((q) => q.id === activeId)!;
  const activeStep = result ? TOTAL_STEPS : (STEP_MAP[activeId] ?? 1);
  const activeSection = activeCurrent?.sectionNum ?? 1;

  const canGoBack = !result && pointer > 0;
  const canGoForward = !result && pointer < history.length - 1;

  function handleChoose(option: Option) {
    setDirection(1);
    setAnswers((prev) => ({ ...prev, [activeId]: option.label }));

    if (["ELIGIBLE", "NOT_ELIGIBLE", "CALL"].includes(option.next)) {
      setResult(option.next as "ELIGIBLE" | "NOT_ELIGIBLE" | "CALL");
      return;
    }

    const newHistory = [...history.slice(0, pointer + 1), option.next];
    setHistory(newHistory);
    setPointer(newHistory.length - 1);
  }

  function handleBack() {
    setDirection(-1);
    if (result) { setResult(null); return; }
    if (canGoBack) setPointer((p) => p - 1);
  }

  function handleForward() {
    setDirection(1);
    if (canGoForward) setPointer((p) => p + 1);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
      <MilestoneToast step={activeStep} />

      {!result && (
        <div className="shrink-0 px-4 md:px-10 pt-4">
          {/* ── Top row: breadcrumbs (centered) + step counter ── */}
          <div className="relative flex items-center justify-center mb-2 min-h-[32px]">

            {/* Section breadcrumbs — desktop: centered absolutely */}
            <div className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
              {SECTIONS.map((s, i) => {
                const done = s.num < activeSection;
                const active = s.num === activeSection;
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
                      <span
                        className="text-[11px] font-semibold transition-colors"
                        style={{ color: active ? "white" : done ? "#0a0a0a" : "#bbb" }}
                      >
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

            {/* Mobile: compact section dots — centered */}
            <div className="flex lg:hidden items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
              {SECTIONS.map((s) => {
                const done = s.num < activeSection;
                const active = s.num === activeSection;
                return (
                  <div key={s.num} className="flex flex-col items-center gap-1">
                    <motion.div
                      animate={{
                        background: active ? "#0a0a0a" : done ? "#D6FD70" : "#e0e0e0",
                        width: active ? "24px" : "8px",
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ height: "8px", borderRadius: "9999px" }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Step counter — always right-aligned */}
            <span className="text-[12px] font-semibold ml-auto" style={{ color: "#aaa" }}>
              {activeStep} / {TOTAL_STEPS}
            </span>
          </div>

          <SegmentedProgress current={activeStep} total={TOTAL_STEPS} />
        </div>
      )}

      <main className="flex-1 w-full max-w-175 mx-auto px-5 md:px-8 py-10 md:py-14 flex flex-col">
        <AnimatePresence mode="wait" custom={direction}>
          {result ? (
            <ResultScreen key="result" result={result} onBack={handleBack} />
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
              {/* Section pill */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "#0a0a0a" }}>
                  <div className="flex items-center justify-center shrink-0"
                    style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#D6FD70" }}>
                    <span style={{ fontSize: "9px", fontWeight: 800, color: "#0a0a0a" }}>{activeCurrent.sectionNum}</span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white">{activeCurrent.sectionLabel}</span>
                </div>
              </div>

              <h1 className="text-[24px] md:text-[32px] font-extrabold text-[#0a0a0a] leading-[1.12] tracking-tight mb-2">
                {activeCurrent.question}
              </h1>
              {activeCurrent.sub ? (
                <p className="text-[14px] leading-relaxed mb-8" style={{ color: "#888" }}>{activeCurrent.sub}</p>
              ) : (
                <div className="mb-8" />
              )}

              {/* Options */}
              {activeCurrent.layout === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCurrent.options.map((opt, i) => (
                    <OptionCard key={opt.label} opt={opt} index={i} layout="grid"
                      onClick={() => handleChoose(opt)}
                      isSaved={answers[activeId] === opt.label} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {activeCurrent.options.map((opt, i) => (
                    <OptionCard key={opt.label} opt={opt} index={i} layout="list"
                      onClick={() => handleChoose(opt)}
                      isSaved={answers[activeId] === opt.label} />
                  ))}
                </div>
              )}

              {/* Back / Forward nav */}
              <div className="mt-8 flex items-center justify-between">
                {canGoBack ? (
                  <button onClick={handleBack}
                    className="flex items-center gap-2 text-[13px] font-medium transition-colors"
                    style={{ color: "#bbb" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#0a0a0a")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#bbb")}>
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11.5 7H2.5M6 3.5L2.5 7l3.5 3.5" />
                    </svg>
                    Previous question
                  </button>
                ) : <div />}

                {canGoForward && (
                  <button onClick={handleForward}
                    className="flex items-center gap-2 text-[13px] font-semibold transition-colors"
                    style={{ color: "#0a0a0a" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#555")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#0a0a0a")}>
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

        {!result && (
          <div className="mt-auto pt-12 flex flex-wrap gap-5 justify-center">
            {["Free to use", "No documents needed at this stage", "Takes 2 minutes"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: "#666" }}>
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#D6FD70" }} />
                {t}
              </span>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}