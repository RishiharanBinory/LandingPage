import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CATEGORIES,
  getCategoryBySlug,
  getPostsByCategory,
} from "@/app/resources/data/posts";
import BlogCard from "./BlogCard";

// ── Static params ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

// ── SEO ───────────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} Articles | Student Finance Resources`,
    description: category.description,
    openGraph: {
      title: `${category.name} | Student Finance Resources`,
      description: category.description,
      type: "website",
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const posts = getPostsByCategory(params.slug);

  return (
    <main
      className="min-h-screen bg-white"
      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
    >
      {/* ── Hero ── */}
      <header
        className="w-full pt-28 pb-16 px-5 md:px-10"
        style={{ background: "linear-gradient(180deg, #f9f9f7 0%, #ffffff 100%)" }}
      >
        <div className="max-w-[860px] mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] mb-6" style={{ color: "#999" }}>
            <Link href="/" className="hover:text-[#0a0a0a] transition-colors" style={{ textDecoration: "none", color: "inherit" }}>Home</Link>
            <span>/</span>
            <Link href="/resources" className="hover:text-[#0a0a0a] transition-colors" style={{ textDecoration: "none", color: "inherit" }}>Resources</Link>
            <span>/</span>
            <span style={{ color: "#0a0a0a" }}>{category.name}</span>
          </nav>

          {/* Category label */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{ background: "#0a0a0a" }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#D6FD70" }} />
            <span className="text-[11px] font-bold uppercase tracking-widest text-white">
              Category
            </span>
          </div>

          <h1 className="text-[32px] md:text-[48px] font-extrabold tracking-tight text-[#0a0a0a] leading-[1.1] mb-3">
            {category.name}
          </h1>
          <p className="text-[16px] leading-relaxed max-w-[520px]" style={{ color: "#777" }}>
            {category.description}
          </p>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-5 md:px-8 pb-24">

        {/* ── Articles grid ── */}
        {posts.length > 0 ? (
          <section aria-labelledby="category-articles-heading">
            <div className="flex items-center justify-between mb-6 pt-4">
              <h2
                id="category-articles-heading"
                className="text-[13px] font-bold uppercase tracking-widest"
                style={{ color: "#999" }}
              >
                {posts.length} Article{posts.length !== 1 ? "s" : ""} in {category.name}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ) : (
          /* Empty state */
          <div className="text-center py-24">
            <div
              className="inline-flex items-center justify-center mb-5"
              style={{ width: "72px", height: "72px", borderRadius: "18px", background: "#f5f5f3" }}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="8" y1="13" x2="16" y2="13" />
                <line x1="8" y1="17" x2="16" y2="17" />
              </svg>
            </div>
            <h2 className="text-[22px] font-extrabold text-[#0a0a0a] mb-2">
              Articles coming soon
            </h2>
            <p className="text-[15px] mb-8 max-w-[360px] mx-auto" style={{ color: "#888" }}>
              We&apos;re working on content for <strong>{category.name}</strong>. Check back shortly or explore other categories.
            </p>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-[14px] font-bold text-[#0a0a0a] transition-colors hover:text-[#555]"
              style={{ textDecoration: "none" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11.5 7H2.5M6 3.5L2.5 7l3.5 3.5" />
              </svg>
              Back to all resources
            </Link>
          </div>
        )}

        {/* ── Browse other categories ── */}
        <div className="mt-20 pt-12 border-t border-[#ebebeb]">
          <h2 className="text-[13px] font-bold uppercase tracking-widest mb-6" style={{ color: "#999" }}>
            Browse Other Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.filter((c) => c.slug !== params.slug).map((cat) => (
              <Link
                key={cat.slug}
                href={`/resources/category/${cat.slug}`}
                className="px-4 py-2 rounded-full text-[13px] font-semibold border border-[#e8e8e8] text-[#0a0a0a] transition-all hover:border-[#0a0a0a] hover:shadow-sm"
                style={{ textDecoration: "none" }}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div
          className="mt-16 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: "#0a0a0a" }}
        >
          <div>
            <h2 className="text-[20px] md:text-[24px] font-extrabold text-white mb-1 tracking-tight">
              Ready to check your eligibility?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
              Free · No documents needed · Under 60 seconds
            </p>
          </div>
          <Link
            href="/eligibility-checker"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-[13px] uppercase tracking-widest transition-opacity hover:opacity-90"
            style={{ background: "#D6FD70", color: "#0a0a0a", textDecoration: "none", whiteSpace: "nowrap" }}
          >
            Check My Eligibility
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 7h9M8.5 3.5L12 7l-3.5 3.5" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}