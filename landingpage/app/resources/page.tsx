// app/resources/page.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Clock, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import { blogPosts, type BlogPost } from "../types/blog";
import { ExploreCategories } from "@/components/Blogs/ExploreCategories";

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

// ─── Blog Image ───────────────────────────────────────────────────
function BlogImage({
  src,
  alt,
  style,
}: {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}) {
  const [errored, setErrored] = useState(false);
  const filename = src.split("/").pop();

  return (
    <div
      style={{
        position: "relative",
        background: "#f0f0ee",
        overflow: "hidden",
        ...style,
      }}
    >
      {!errored ? (
        <img
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#bbb",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {filename}
          </span>
          <div
            style={{
              width: "36px",
              height: "2px",
              background: LIME,
              borderRadius: "2px",
            }}
          />
        </div>
      )}
    </div>
  );
}

// ─── Featured Card ────────────────────────────────────────────────
function FeaturedCard({ post }: { post: BlogPost }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <Link href={`/resources/${post.id}`} style={{ textDecoration: "none" }}>
        <article
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            borderRadius: "20px",
            overflow: "hidden",
            border: `2px solid ${hovered ? LIME : "rgba(0,0,0,0.08)"}`,
            transition: "border-color 0.25s ease, box-shadow 0.25s ease",
            boxShadow: hovered
              ? "0 24px 56px rgba(0,0,0,0.12)"
              : "0 2px 10px rgba(0,0,0,0.04)",
            background: WHITE,
            cursor: "pointer",
          }}
        >
          <BlogImage
            src={`/blog/${post.image}`}
            alt={post.title}
            style={{
              height: "400px",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.55s ease",
            }}
          />
          <div
            style={{
              padding: "48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
                <span
                  style={{
                    background: LIME,
                    color: BLACK,
                    borderRadius: "9999px",
                    padding: "4px 14px",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Featured
                </span>
                <span
                  style={{
                    background: "rgba(0,0,0,0.06)",
                    color: "#555",
                    borderRadius: "9999px",
                    padding: "4px 14px",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {post.category}
                </span>
              </div>
              <h2
                style={{
                  fontSize: "clamp(20px, 2.2vw, 30px)",
                  fontWeight: 800,
                  color: BLACK,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  marginBottom: "14px",
                }}
              >
                {post.title}
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  color: "#666",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                }}
              >
                {post.excerpt}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  fontSize: "13px",
                  color: "#999",
                  fontWeight: 500,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Calendar size={12} />
                  {post.date}
                </span>
                <span>·</span>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Clock size={12} />
                  {post.readTime}
                </span>
              </div>
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  borderRadius: "9999px",
                  background: hovered ? BLACK : "rgba(0,0,0,0.07)",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: hovered ? WHITE : BLACK,
                  transition: "background 0.25s ease, color 0.25s ease",
                  letterSpacing: "0.03em",
                }}
              >
                Read more
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

// ─── Blog Card ────────────────────────────────────────────────────
function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: EASE }}
    >
      <Link href={`/resources/${post.id}`} style={{ textDecoration: "none" }}>
        <article
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            background: WHITE,
            border: `2px solid ${hovered ? LIME : "rgba(0,0,0,0.07)"}`,
            transition:
              "border-color 0.25s ease, transform 0.28s ease, box-shadow 0.28s ease",
            transform: hovered ? "translateY(-5px)" : "translateY(0)",
            boxShadow: hovered
              ? "0 20px 48px rgba(0,0,0,0.11)"
              : "0 2px 8px rgba(0,0,0,0.04)",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <BlogImage
            src={`/blog/${post.image}`}
            alt={post.title}
            style={{
              height: "220px",
              flexShrink: 0,
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
          />
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
            <h3
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: BLACK,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                marginBottom: "16px",
                flex: 1,
              }}
            >
              {post.title}
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  fontSize: "12px",
                  color: "#999",
                  fontWeight: 500,
                  alignItems: "center",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Calendar size={11} />
                  {post.date}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Clock size={11} />
                  {post.readTime}
                </span>
              </div>
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 700,
                color: hovered ? BLACK : "#555",
                transition: "color 0.2s ease",
                borderTop: `1.5px solid ${hovered ? LIME : "rgba(0,0,0,0.06)"}`,
                paddingTop: "14px",
              }}
            >
              Read more
              <ArrowUpRight
                size={14}
                style={{
                  transition: "transform 0.25s ease",
                  transform: hovered ? "translate(2px,-2px)" : "translate(0,0)",
                }}
              />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

// ─── Hero Section (updated with newsletter card) ──────────────────
function ResourcesHero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const pills = [
    { label: "Student Finance", style: { left: "5%", top: "22%" } },
    { label: "Tuition Fees", style: { left: "9%", bottom: "22%" } },
    { label: "Maintenance Loan", style: { right: "4%", top: "22%" } },
    { label: "Eligibility", style: { right: "8%", bottom: "22%" } },
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
          Everything you need
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
          style={{
            fontSize: "clamp(42px, 7vw, 82px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: LIME,
            margin: "0 0 26px",
          }}
        >
          to know.
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

        {/* ── Newsletter Card injected here ── */}
        <NewsletterCard />
      </div>
    </section>
  );
}

// ─── Main listing page ────────────────────────────────────────────
export default function ResourcesPage() {
  const featuredPost = blogPosts.find((p) => p.featured);
  const regularPosts = blogPosts.filter((p) => !p.featured);

  return (
    <main
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: WHITE,
        minHeight: "100vh",
      }}
    >
      <ResourcesHero />

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "80px 24px 100px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#bbb",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            Latest Articles
          </h2>
          <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.08)" }} />
          <span style={{ fontSize: "12px", color: "#bbb", fontWeight: 500 }}>
            {blogPosts.length} articles
          </span>
        </motion.div>

        {featuredPost && (
          <div style={{ marginBottom: "32px" }}>
            <FeaturedCard post={featuredPost} />
          </div>
        )}

        {regularPosts.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {regularPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </section>

      <ExploreCategories />
    </main>
  );
}