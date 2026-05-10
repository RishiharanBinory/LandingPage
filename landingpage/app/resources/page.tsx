// app/resources/page.tsx
// ─────────────────────────────────────────────────────────────────
// Blog listing page — shows hero + all blog cards + newsletter.
// Card layout matches the reference screenshots.
// ─────────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { blogPosts, type BlogPost } from "../types/blog";
import { ExploreCategories } from "@/components/Blogs/ExploreCategories";
import NewsletterCard from "@/components/Maincomponents/NewsletterCard";
// ─── Brand tokens ─────────────────────────────────────────────────
const LIME = "#D6FD70";
const BLACK = "#0a0a0a";
const WHITE = "#ffffff";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Image with placeholder fallback ─────────────────────────────
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

// ─── Featured card (large, side-by-side) ─────────────────────────
// Matches the reference: big image left, content right, "Read more →"
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
          {/* Image */}
          <BlogImage
            src={`/blog/${post.image}`}
            alt={post.title}
            style={{
              height: "400px",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.55s ease",
            }}
          />

          {/* Content */}
          <div
            style={{
              padding: "48px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* Pills */}
              <div
                style={{ display: "flex", gap: "8px", marginBottom: "24px" }}
              >
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

              {/* Title */}
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

              {/* Excerpt */}
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

            {/* Meta + CTA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              {/* Meta */}
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

              {/* Read more button */}
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

// ─── Standard blog card ───────────────────────────────────────────
// Matches screenshot: image top, title, date + readTime, "Read more →"
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
          {/* Image */}
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

          {/* Content */}
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
            {/* Title */}
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

            {/* Meta row */}
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

            {/* Read more link — matches reference */}
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

// ─── Hero Section ─────────────────────────────────────────────────
function ResourcesHero() {
  const pills = [
    { label: "Student Finance", style: { left: "5%", top: "30%" } },
    { label: "Tuition Fees", style: { left: "9%", bottom: "30%" } },
    { label: "Maintenance Loan", style: { right: "4%", top: "35%" } },
    { label: "Eligibility", style: { right: "8%", bottom: "28%" } },
  ];

  return (
    <section
      style={{
        position: "relative",
        background: BLACK,
        minHeight: "480px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "100px 24px 80px",
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
      {/* Floating pills */}
      {pills.map((p, i) => (
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

      {/* Text */}
      <div style={{ position: "relative", textAlign: "center", maxWidth: "720px" }}>
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
            margin: "0 auto",
          }}
        >
          Plain-English guides on UK student finance — who qualifies, how much you
          get, and how to apply without the confusion.
        </motion.p>
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
        {/* Section label */}
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

        {/* Featured */}
        {featuredPost && (
          <div style={{ marginBottom: "32px" }}>
            <FeaturedCard post={featuredPost} />
          </div>
        )}

        {/* Grid */}
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