// app/components/ExploreCategories.tsx
// ─────────────────────────────────────────────────────────────────
// "Explore Categories" section — drop this anywhere in your page.
// Data lives in app/types/categories.ts — edit there, not here.
// ─────────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen, GraduationCap, Lightbulb, FileText, Calculator,
  ClipboardList, Map, Calendar, HelpCircle, BarChart2, Layers, Star,
  ArrowUpRight, type LucideIcon,
} from "lucide-react";
import { categories, type Category }from "@/app/types/categories";

// ─── Brand tokens ─────────────────────────────────────────────────
const LIME = "#D6FD70";
const BLACK = "#0a0a0a";
const WHITE = "#ffffff";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── Icon map ─────────────────────────────────────────────────────
const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen, GraduationCap, Lightbulb, FileText, Calculator,
  ClipboardList, Map, Calendar, HelpCircle, BarChart2, Layers, Star,
};

// ─── Single category card ─────────────────────────────────────────
function CategoryCard({ category, index }: { category: Category; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = ICON_MAP[category.icon] ?? BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 4) * 0.08, duration: 0.5, ease: EASE }}
    >
      <Link
        href={`/resources/categories/${category.id}`}
        style={{ textDecoration: "none" }}
        aria-label={`Explore ${category.label}`}
      >
        <article
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative",
            borderRadius: "18px",
            background: WHITE,
            border: `2px solid ${hovered ? LIME : "rgba(0,0,0,0.07)"}`,
            padding: "28px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            cursor: "pointer",
            transition: "border-color 0.22s ease, transform 0.28s ease, box-shadow 0.28s ease",
            transform: hovered ? "translateY(-5px)" : "translateY(0)",
            boxShadow: hovered
              ? "0 20px 40px rgba(0,0,0,0.10)"
              : "0 2px 8px rgba(0,0,0,0.04)",
            overflow: "hidden",
            height: "100%",
          }}
        >
          {/* Lime sweep on hover */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, ${LIME}18 0%, transparent 60%)`,
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
              borderRadius: "inherit",
            }}
          />

          {/* "Coming Soon" badge */}
          {category.comingSoon && (
            <span
              style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                background: "rgba(0,0,0,0.06)",
                color: "#888",
                borderRadius: "9999px",
                padding: "3px 10px",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Soon
            </span>
          )}

          {/* Icon ring */}
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: hovered ? LIME : "rgba(0,0,0,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background 0.25s ease",
            }}
          >
            <Icon
              size={22}
              strokeWidth={1.8}
              color={hovered ? BLACK : "#555"}
            />
          </div>

          {/* Text */}
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: BLACK,
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                marginBottom: "6px",
              }}
            >
              {category.label}
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#888",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {category.tagline}
            </p>
          </div>

          {/* Arrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "12px",
              fontWeight: 700,
              color: hovered ? BLACK : "#bbb",
              transition: "color 0.22s ease",
              borderTop: `1.5px solid ${hovered ? LIME : "rgba(0,0,0,0.06)"}`,
              paddingTop: "12px",
              marginTop: "auto",
            }}
          >
            Explore
            <ArrowUpRight
              size={13}
              style={{
                transition: "transform 0.22s ease",
                transform: hovered ? "translate(2px, -2px)" : "translate(0,0)",
              } as React.CSSProperties}
            />
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

// ─── Main exported section ────────────────────────────────────────
export function ExploreCategories() {
  return (
    <section
      style={{
        background: WHITE,
        padding: "80px 24px 100px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "48px",
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
            Browse by topic
          </h2>
          <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.08)" }} />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ marginBottom: "48px" }}
        >
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 54px)",
              fontWeight: 800,
              color: BLACK,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: "0 0 12px",
            }}
          >
            Explore More
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#888",
              lineHeight: 1.6,
              maxWidth: "480px",
              margin: 0,
            }}
          >
            Pick a topic and dive straight into guides written in plain English —
            no jargon, no fluff.
          </p>
        </motion.div>

        {/* Responsive grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}