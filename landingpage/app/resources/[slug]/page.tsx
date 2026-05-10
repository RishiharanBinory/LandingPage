import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getPostBySlug,
  getAllPosts,
  getCategoryBySlug,
  formatDate,
} from "../data/posts";
import ContentRenderer from "@/components/Blogs/ContentRenderer";
import BlogCard from "@/components/Blogs/BlogCard";

// ── Static params — generates a page for every post at build time ─────────────
export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// ── SEO metadata — unique per post ───────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Article Not Found" };

  const description = post.metaDescription ?? post.excerpt;

  return {
    title: `${post.title} | Student Finance Resources`,
    description,
    keywords: post.keywords?.join(", "),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.image ? [post.image] : [],
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const category = getCategoryBySlug(post.category);

  // Related posts: same category, exclude current
  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      {/* ── JSON-LD structured data for Google ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.metaDescription ?? post.excerpt,
            author: { "@type": "Person", name: post.author },
            datePublished: post.date,
            image: post.image,
            publisher: {
              "@type": "Organization",
              name: "Eligiby",
              logo: { "@type": "ImageObject", url: "/logo.png" },
            },
          }),
        }}
      />

      <main
        className="min-h-screen bg-white"
        style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
      >
        {/* ── Hero ── */}
        <header className="w-full pt-24 pb-0" style={{ background: "#f9f9f7" }}>
          <div className="max-w-[740px] mx-auto px-5 md:px-8 pt-8 pb-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[13px] mb-6" style={{ color: "#999" }}>
              <Link href="/" className="hover:text-[#0a0a0a] transition-colors" style={{ textDecoration: "none", color: "inherit" }}>Home</Link>
              <span>/</span>
              <Link href="/resources" className="hover:text-[#0a0a0a] transition-colors" style={{ textDecoration: "none", color: "inherit" }}>Resources</Link>
              {category && (
                <>
                  <span>/</span>
                  <Link
                    href={`/resources/category/${category.slug}`}
                    className="hover:text-[#0a0a0a] transition-colors"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {category.name}
                  </Link>
                </>
              )}
            </nav>

            {/* Category badge */}
            {category && (
              <Link
                href={`/resources/category/${category.slug}`}
                className="inline-flex items-center text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5 transition-opacity hover:opacity-75"
                style={{ background: "#0a0a0a", color: "#D6FD70", textDecoration: "none" }}
              >
                {category.name}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-[28px] md:text-[40px] font-extrabold tracking-tight text-[#0a0a0a] leading-[1.12] mb-4">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-[16px] md:text-[18px] leading-relaxed mb-8" style={{ color: "#666" }}>
              {post.excerpt}
            </p>

            {/* Author + meta row */}
            <div className="flex items-center gap-4 pb-8 border-b border-[#e8e8e8]">
              <div
                className="flex items-center justify-center shrink-0 text-[14px] font-bold"
                style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#0a0a0a", color: "#D6FD70" }}
                aria-hidden="true"
              >
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-[14px] font-bold text-[#0a0a0a]">{post.author}</p>
                <p className="text-[13px]" style={{ color: "#999" }}>{post.authorRole}</p>
              </div>
              <div className="ml-auto flex items-center gap-3 text-[13px]" style={{ color: "#999" }}>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* ── Cover image ── */}
        {post.image && (
          <div className="max-w-[900px] mx-auto px-5 md:px-8 mt-8">
            <div
              className="relative w-full overflow-hidden rounded-2xl"
              style={{ aspectRatio: "16/9", background: "#f0f0ee" }}
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 900px"
              />
            </div>
          </div>
        )}

        {/* ── Article body ── */}
        <article className="max-w-[740px] mx-auto px-5 md:px-8 py-12">
          <ContentRenderer blocks={post.content} />
        </article>

        {/* ── CTA strip inside article ── */}
        <div className="max-w-[740px] mx-auto px-5 md:px-8 pb-12">
          <div
            className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            style={{ background: "#0a0a0a" }}
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: "#D6FD70" }}>
                Free eligibility check
              </p>
              <h2 className="text-[18px] md:text-[22px] font-extrabold text-white leading-snug">
                Find out if you qualify — in 60 seconds.
              </h2>
            </div>
            <Link
              href="/eligibility-checker"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-[13px] uppercase tracking-widest transition-opacity hover:opacity-90"
              style={{ background: "#D6FD70", color: "#0a0a0a", textDecoration: "none", whiteSpace: "nowrap" }}
            >
              Check Now
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 7h9M8.5 3.5L12 7l-3.5 3.5" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Related articles ── */}
        {related.length > 0 && (
          <section
            aria-labelledby="related-heading"
            className="max-w-[1100px] mx-auto px-5 md:px-8 pb-24 border-t border-[#ebebeb] pt-12"
          >
            <h2
              id="related-heading"
              className="text-[13px] font-bold uppercase tracking-widest mb-6"
              style={{ color: "#999" }}
            >
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}

        {/* ── Back link ── */}
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 pb-20">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#0a0a0a] transition-colors hover:text-[#555]"
            style={{ textDecoration: "none" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11.5 7H2.5M6 3.5L2.5 7l3.5 3.5" />
            </svg>
            Back to all articles
          </Link>
        </div>
      </main>
    </>
  );
}