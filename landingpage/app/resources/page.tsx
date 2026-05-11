"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Bell, BookOpen, Sparkles } from "lucide-react";

const LIME = "#D6FD70";
const BLACK = "#0a0a0a";
const WHITE = "#ffffff";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Newsletter Card ──────────────────────────────────────────────
function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    if (!isValid) return;
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.38, ease: EASE }}
      style={{
        position: "relative",
        maxWidth: "520px",
        width: "100%",
        margin: "0 auto",
      }}
    >
      {/* Lime accent glow behind card */}
      <div
        style={{
          position: "absolute",
          inset: "-1px",
          borderRadius: "22px",
          background: `linear-gradient(135deg, ${LIME}2a, transparent 55%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1.5px solid rgba(255,255,255,0.13)",
          borderRadius: "20px",
          padding: "36px 40px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
        }}
      >
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Label pill */}
              <div style={{ marginBottom: "16px" }}>
                <span
                  style={{
                    background: `${LIME}1a`,
                    border: `1px solid ${LIME}44`,
                    color: LIME,
                    borderRadius: "9999px",
                    padding: "4px 14px",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  Weekly Newsletter
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "22px",
                  fontWeight: 800,
                  color: WHITE,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  margin: "0 0 10px",
                }}
              >
                Stay in the know.
              </h3>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.52)",
                  lineHeight: 1.65,
                  margin: "0 0 28px",
                }}
              >
                Plain-English student finance updates — straight to your inbox,
                no jargon.
              </p>

              {/* Input + Button row */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "stretch",
                }}
              >
                <div style={{ flex: 1, position: "relative" }}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    style={{
                      width: "100%",
                      padding: "13px 18px",
                      borderRadius: "12px",
                      border: `1.5px solid ${
                        focused ? `${LIME}88` : "rgba(255,255,255,0.14)"
                      }`,
                      background: "rgba(255,255,255,0.07)",
                      color: WHITE,
                      fontSize: "14px",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 500,
                      outline: "none",
                      transition: "border-color 0.2s ease",
                      boxSizing: "border-box",
                    }}
                  />
                  <style>{`input[type="email"]::placeholder { color: rgba(255,255,255,0.35); }`}</style>
                </div>

                <button
                  onClick={handleSubmit}
                  onMouseEnter={() => setBtnHovered(true)}
                  onMouseLeave={() => setBtnHovered(false)}
                  disabled={!isValid}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "13px 22px",
                    borderRadius: "12px",
                    border: "none",
                    cursor: isValid ? "pointer" : "not-allowed",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    background: isValid
                      ? btnHovered
                        ? "#c8f040"
                        : LIME
                      : "rgba(255,255,255,0.1)",
                    color: isValid ? BLACK : "rgba(255,255,255,0.3)",
                    transition:
                      "background 0.2s ease, color 0.2s ease, transform 0.15s ease",
                    transform: btnHovered && isValid ? "scale(1.03)" : "scale(1)",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  Subscribe
                  <ArrowRight size={15} />
                </button>
              </div>

              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.3)",
                  margin: "14px 0 0",
                  textAlign: "center",
                  letterSpacing: "0.02em",
                }}
              >
                No spam, ever. Unsubscribe anytime.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "16px 0",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: `${LIME}1a`,
                  border: `1.5px solid ${LIME}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircle2 size={24} color={LIME} />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "20px",
                    fontWeight: 800,
                    color: WHITE,
                    margin: "0 0 8px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  You&apos;re in!
                </h3>
                <p
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.5)",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  Check your inbox for a confirmation.
                  <br />
                  First edition lands next week.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────
function ResourcesHero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const pills = [
    { label: "Student Finance", style: { left: "15%", top: "22%" } },
    { label: "Tuition Fees", style: { left: "19%", bottom: "22%" } },
    { label: "Maintenance Loan", style: { right: "14%", top: "22%" } },
    { label: "Eligibility", style: { right: "18%", bottom: "22%" } },
  ];

  return (
    <section
      style={{
        position: "relative",
        background: BLACK,
        minHeight: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "100px 24px 90px",
      }}
    >
      {/* Lime glow */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "280px",
          borderRadius: "9999px",
          background: LIME,
          opacity: 0.07,
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />
      {/* Dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          pointerEvents: "none",
        }}
      />

      {/* Floating pills — hidden on mobile */}
      {!isMobile &&
        pills.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.4 + i * 0.1, ease: EASE }}
            style={{
              position: "absolute",
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(10px)",
              border: "1.5px solid rgba(255,255,255,0.12)",
              borderRadius: "9999px",
              padding: "11px 22px",
              fontSize: "13px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.7)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              ...p.style,
            }}
          >
            {p.label}
          </motion.div>
        ))}

      {/* Text + Newsletter Card */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          maxWidth: "720px",
          width: "100%",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ marginBottom: "18px" }}
        >
          <span
            style={{
              background: LIME,
              color: BLACK,
              borderRadius: "9999px",
              padding: "5px 18px",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Resources & Guides
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          style={{
            fontSize: "clamp(42px, 7vw, 82px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: WHITE,
            margin: "0 0 6px",
          }}
        >
          Everything you need to <span  style={{
            fontSize: "clamp(42px, 7vw, 82px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: LIME,
            margin: "0 0 26px",
          }}>know.
            
          </span >
        </motion.h1>
   

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
          style={{
            fontSize: "17px",
            color: "rgba(255,255,255,0.52)",
            lineHeight: 1.65,
            maxWidth: "500px",
            margin: "0 auto 48px",
          }}
        >
          Plain-English guides on UK student finance — who qualifies, how much
          you get, and how to apply without the confusion.
        </motion.p>

        {/* Newsletter Card */}
        <NewsletterCard />
      </div>
    </section>
  );
}

// ─── Coming Soon Section ──────────────────────────────────────────
function ComingSoonSection() {
  const upcomingTopics = [
    {
      icon: <BookOpen size={20} />,
      title: "Maintenance Loan Explained",
      description: "A full breakdown of how much you can get and what affects your amount.",
      eta: "Coming soon",
    },
    {
      icon: <Sparkles size={20} />,
      title: "Tuition Fee Guide 2025",
      description: "Everything you need to know about fees, repayment, and what it means for you.",
      eta: "Coming soon",
    },
    {
      icon: <Bell size={20} />,
      title: "Eligibility Checker Walkthrough",
      description: "Step-by-step: find out if you qualify before you even apply.",
      eta: "Coming soon",
    },
  ];

  return (
    <section
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "100px 24px 120px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ textAlign: "center", marginBottom: "72px" }}
      >
        {/* Eyebrow */}
        <span
          style={{
            display: "inline-block",
            background: `${LIME}22`,
            border: `1px solid ${LIME}55`,
            color: "#5a7a00",
            borderRadius: "9999px",
            padding: "5px 16px",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          Articles & Guides
        </span>

        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            color: BLACK,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            margin: "0 0 18px",
          }}
        >
          Our guides are on their way.
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "#888",
            lineHeight: 1.7,
            maxWidth: "480px",
            margin: "0 auto",
          }}
        >
          We&apos;re writing detailed, jargon-free articles so you can navigate UK
          student finance with confidence. Here&apos;s a sneak peek at what&apos;s coming.
        </p>
      </motion.div>

      {/* Topic preview cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          marginBottom: "72px",
        }}
      >
        {upcomingTopics.map((topic, i) => (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: EASE }}
            style={{
              background: WHITE,
              border: "1.5px solid rgba(0,0,0,0.07)",
              borderRadius: "18px",
              padding: "32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle lime corner accent */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "80px",
                height: "80px",
                background: `radial-gradient(circle at top right, ${LIME}30, transparent 70%)`,
                pointerEvents: "none",
              }}
            />

            {/* Icon */}
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: `${LIME}22`,
                border: `1px solid ${LIME}44`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#5a7a00",
                marginBottom: "20px",
              }}
            >
              {topic.icon}
            </div>

            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: BLACK,
                letterSpacing: "-0.01em",
                lineHeight: 1.3,
                margin: "0 0 10px",
              }}
            >
              {topic.title}
            </h3>
            <p
              style={{
                fontSize: "13.5px",
                color: "#888",
                lineHeight: 1.65,
                margin: "0 0 20px",
              }}
            >
              {topic.description}
            </p>

            {/* ETA pill */}
            <span
              style={{
                display: "inline-block",
                background: "rgba(0,0,0,0.04)",
                color: "#aaa",
                borderRadius: "9999px",
                padding: "4px 12px",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {topic.eta}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Big divider CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: EASE }}
        style={{
          background: BLACK,
          borderRadius: "24px",
          padding: "56px 48px",
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          textAlign: "center",
          gap: "24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            right: "-40px",
            width: "260px",
            height: "260px",
            borderRadius: "9999px",
            background: LIME,
            opacity: 0.08,
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-40px",
            left: "-20px",
            width: "200px",
            height: "200px",
            borderRadius: "9999px",
            background: LIME,
            opacity: 0.05,
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            background: `${LIME}18`,
            border: `1.5px solid ${LIME}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Bell size={22} color={LIME} />
        </div>

        <div>
          <h3
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "clamp(22px, 3.5vw, 34px)",
              fontWeight: 800,
              color: WHITE,
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              margin: "0 0 12px",
            }}
          >
            Be the first to read them.
          </h3>
          <p
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "15px",
              color: "rgba(255,255,255,0.48)",
              lineHeight: 1.65,
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            Subscribe to the newsletter above and we&apos;ll notify you the moment
            new guides go live — no spam, just useful stuff.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
export default function ResourcesPage() {
  return (
    <main
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: WHITE,
        minHeight: "100vh",
      }}
    >
      <ResourcesHero />
      <ComingSoonSection />
    </main>
  );
}