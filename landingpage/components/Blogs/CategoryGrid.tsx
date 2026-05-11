import Link from "next/link";
import { CATEGORIES } from "@/app/resources/data/posts";
import { JSX } from "react";

// ── Category icon map — assign a simple SVG per category slot
// When you rename categories, update the icons here too.
const CATEGORY_ICONS: Record<string, JSX.Element> = {
  "option-1": (
    <path
      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  "option-2": (
    <>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M12 8v4l3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
  "option-3": (
    <>
      <path
        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle
        cx="9"
        cy="7"
        r="4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </>
  ),
  "option-4": (
    <>
      <rect
        x="2"
        y="3"
        width="20"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M8 21h8M12 17v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  "option-5": (
    <>
      <path
        d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <polyline
        points="9 22 9 12 15 12 15 22"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </>
  ),
  "option-6": (
    <>
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
  "option-7": (
    <>
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <polyline
        points="14 2 14 8 20 8"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <line
        x1="8"
        y1="13"
        x2="16"
        y2="13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="8"
        y1="17"
        x2="16"
        y2="17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  "option-8": (
    <>
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <line
        x1="12"
        y1="17"
        x2="12.01"
        y2="17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  ),
  "option-9": (
    <>
      <path
        d="M22 12h-4l-3 9L9 3l-3 9H2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  ),
  "option-10": (
    <>
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </>
  ),
  "option-11": (
    <>
      <path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <circle
        cx="12"
        cy="10"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </>
  ),
  "option-12": (
    <>
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <line
        x1="17.5"
        y1="6.5"
        x2="17.51"
        y2="6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  ),
};

/**
 * CategoryGrid
 * Displays all 12 categories as clickable tiles.
 * Each tile links to /resources/category/[slug].
 * Add/remove categories in data/posts.ts → CATEGORIES array.
 */
export default function CategoryGrid() {
  return (
    <section
      aria-labelledby="categories-heading"
      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
    >
      <div className="text-center mb-10">
        <h2
          id="categories-heading"
          className="text-[28px] md:text-[36px] font-extrabold tracking-tight text-[#0a0a0a] mb-2"
        >
          Explore more
        </h2>
        <p
          className="text-[15px] leading-relaxed max-w-[460px] mx-auto"
          style={{ color: "#888" }}
        >
          Browse our resource library by topic. Click any category to see all
          related articles.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/resources/category/${cat.slug}`}
            className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-[#ebebeb] bg-white text-center transition-all duration-200 hover:border-[#0a0a0a] hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
            style={{ textDecoration: "none" }}
            aria-label={`Browse ${cat.name} articles`}
          >
            {/* Icon circle */}
            <div
              className="flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:bg-[#0a0a0a]"
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "14px",
                background: "#f5f5f3",
                color: "#0a0a0a",
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                className="transition-colors duration-200 group-hover:text-[#D6FD70]"
                style={{ color: "#0a0a0a" }}
              >
                {CATEGORY_ICONS[cat.slug]}
              </svg>
            </div>

            {/* Name */}
            <span className="text-[13px] font-bold text-[#0a0a0a] leading-snug group-hover:text-[#0a0a0a] transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
