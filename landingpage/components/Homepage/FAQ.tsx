"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const faqs = [
  {
    question: "I already earn — why take student finance?",
    answer:
      "A degree can significantly increase your earning potential over time. Even if you're comfortable now, a qualification can open doors to senior roles, career changes, or fields with higher ceilings — and student finance means you don't have to pay anything upfront.",
  },
  {
    question: "I'm too old to study",
    answer:
      "Many of our applicants are in their 30s and 40s — age is not a barrier to accessing student finance. There is no upper age limit for tuition fee loans, and part-time study options mean you can keep working while you qualify.",
  },
  {
    question: "What if I get rejected?",
    answer:
      "Guided applications significantly reduce common mistakes that lead to rejection. We help you understand the requirements, prepare your documentation, and submit accurately — improving your chances from the start.",
  },
  {
    question: "Is this legitimate?",
    answer:
      "Absolutely. You are connected exclusively with recognised UK education providers operating under Student Finance England (SFE) guidelines. Every course and institution we work with is fully accredited.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      className="w-full bg-white py-20 px-5 md:px-10 lg:px-16"
      style={{ fontFamily: "var(--font-plus-jakarta)" }}
    >
      <div className="max-w-[760px] mx-auto flex flex-col items-center">


        {/* Heading */}
        <motion.h2
          className="text-[32px] md:text-[48px] font-extrabold leading-[1.12] tracking-tight text-[#0a0a0a] text-center mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
        >
          Frequently asked questions
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="text-[18px] text-[#888] text-center max-w-[480px] mx-auto leading-relaxed mb-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        >
          Everything you need to know about UK student finance  straight answers to the questions we hear most.
        </motion.p>

        {/* Accordion */}
        <div className="w-full flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 + 0.15, duration: 0.5, ease: EASE }}
              >
                <div
                  className="w-full rounded-[20px] border border-[#ebebeb] overflow-hidden transition-shadow duration-200"
                  style={{
                    background: isOpen ? "#ffffff" : "#f5f5f5",
                    boxShadow: isOpen
                      ? "0 8px_28px rgba(0,0,0,0.07)"
                      : "none",
                  }}
                >
                  {/* Question row */}
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span
                      className="font-medium text-[#0a0a0a] leading-snug"
                      style={{ fontSize: "clamp(16px, 2vw, 24px)" }}
                    >
                      {faq.question}
                    </span>

                    {/* Plus / Minus icon */}
                    <div
                      className="flex items-center justify-center shrink-0 transition-colors duration-200"
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: isOpen ? "#0a0a0a" : "#e5e5e5",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke={isOpen ? "#D6FD70" : "#0a0a0a"}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      >
                        <line x1="7" y1="1" x2="7" y2="13" className="transition-all duration-300" style={{ opacity: isOpen ? 0 : 1 }} />
                        <line x1="1" y1="7" x2="13" y2="7" />
                      </svg>
                    </div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: EASE }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          className="px-6 pb-6 text-[#555] leading-relaxed"
                          style={{ fontSize: "clamp(16px, 1.6vw, 16px)" }}
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}