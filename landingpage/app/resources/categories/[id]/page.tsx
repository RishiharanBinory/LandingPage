// app/resources/categories/[id]/page.tsx
// ─────────────────────────────────────────────────────────────────
// Dynamic category detail page.
// When you're ready to add articles per category, add a
// `articles` array to the Category type and render them here.
// ─────────────────────────────────────────────────────────────────

import { notFound } from "next/navigation";
import Link from "next/link";
import { categories } from "../../../types/categories";

// ─── Icon map (server-safe — Lucide exports are RSC-compatible) ────
import {
  BookOpen, GraduationCap, Lightbulb, FileText, Calculator,
  ClipboardList, Map, Calendar, HelpCircle, BarChart2, Layers, Star,
  ArrowLeft, ArrowUpRight,
} from "lucide-react";
import type { LucideProps } from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  BookOpen, GraduationCap, Lightbulb, FileText, Calculator,
  ClipboardList, Map, Calendar, HelpCircle, BarChart2, Layers, Star,
};

const LIME = "#D6FD70";
const BLACK = "#0a0a0a";
const WHITE = "#ffffff";

// ─── Static params (optional — good for performance) ──────────────
export function generateStaticParams() {
  return categories.map((c) => ({ id: c.id }));
}

// ─── Metadata ─────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: { id: string } }) {
  const cat = categories.find((c) => c.id === params.id);
  if (!cat) return {};
  return {
    title: `${cat.label} | Resources`,
    description: cat.description,
  };
}

// ─── Page ─────────────────────────────────────────────────────────
export default function CategoryDetailPage({ params }: { params: { id: string } }) {
  const cat = categories.find((c) => c.id === params.id);
  if (!cat) notFound();

  const Icon = ICON_MAP[cat.icon] ?? BookOpen;

  // Sibling categories (exclude current)
  const siblings = categories.filter((c) => c.id !== cat.id).slice(0, 4);

  return (
    <main
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: WHITE,
        minHeight: "100vh",
      }}
    >

      {/* ── Hero ── */}
      <section
        style={{
          background: BLACK,
          padding: "100px 24px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
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
        {/* Lime glow */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "500px",
            height: "200px",
            borderRadius: "9999px",
            background: LIME,
            opacity: 0.07,
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>

          {/* Back link */}
          <Link
            href="/resources"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "rgba(255,255,255,0.45)",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.02em",
              marginBottom: "40px",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = LIME)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
          >
            <ArrowLeft size={14} />
            Back to Resources
          </Link>

          {/* Icon */}
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "18px",
              background: LIME,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "28px",
            }}
          >
            <Icon size={28} strokeWidth={1.8} color={BLACK} />
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 800,
              color: WHITE,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              margin: "0 0 16px",
            }}
          >
            {cat.label}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "17px",
              color: "rgba(255,255,255,0.52)",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 0 32px",
            }}
          >
            {cat.description}
          </p>

          {/* Coming soon pill */}
          {cat.comingSoon && (
            <span
              style={{
                display: "inline-block",
                background: "rgba(214,253,112,0.12)",
                border: `1.5px solid ${LIME}40`,
                color: LIME,
                borderRadius: "9999px",
                padding: "6px 18px",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Content coming soon
            </span>
          )}
        </div>
      </section>

      {/* ── Content placeholder ── */}
      <section style={{ maxWidth: "800px", margin: "0 auto", padding: "64px 24px" }}>

        {/* ── FUTURE SLOT: articles list ────────────────────────────
          When you're ready, import blogPosts and filter by category:

          const articles = blogPosts.filter(p => p.category === cat.label);
          articles.map(post => <BlogCard key={post.id} post={post} />)
        ───────────────────────────────────────────────────────────── */}

        <div
          style={{
            border: "2px dashed rgba(0,0,0,0.08)",
            borderRadius: "20px",
            padding: "64px 40px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "#f0f0ee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <Icon size={24} strokeWidth={1.6} color="#bbb" />
          </div>

          <h2
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: BLACK,
              letterSpacing: "-0.02em",
              marginBottom: "10px",
            }}
          >
            Articles coming soon
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "#aaa",
              lineHeight: 1.6,
              maxWidth: "380px",
              margin: "0 auto 28px",
            }}
          >
            We&apos;re writing guides for this category. Check back soon or explore
            other topics below.
          </p>

          <Link
            href="/resources"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "9999px",
              background: BLACK,
              color: WHITE,
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.03em",
              transition: "background 0.2s ease",
            }}
          >
            Browse all resources
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── Other categories ── */}
      {siblings.length > 0 && (
        <section
          style={{
            background: "#f7f7f5",
            padding: "64px 24px 80px",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              <h3
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
                Other topics
              </h3>
              <div style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.08)" }} />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "14px",
              }}
            >
              {siblings.map((sibling) => {
                const SiblingIcon = ICON_MAP[sibling.icon] ?? BookOpen;
                return (
                  <Link
                    key={sibling.id}
                    href={`/resources/categories/${sibling.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        borderRadius: "14px",
                        background: WHITE,
                        border: "2px solid rgba(0,0,0,0.07)",
                        padding: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        transition: "border-color 0.2s ease, transform 0.2s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = LIME;
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.07)";
                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      }}
                    >
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          background: "rgba(0,0,0,0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <SiblingIcon size={16} strokeWidth={1.8} color="#555" />
                      </div>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                          color: BLACK,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {sibling.label}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}