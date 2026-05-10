import Link from "next/link";
import Image from "next/image";
import { BlogPost, formatDate, getCategoryBySlug } from "@/app/resources/data/posts";

interface FeaturedPostProps {
  post: BlogPost;
}

/**
 * FeaturedPost
 * Large hero-style card for the featured/latest post.
 * Shows on the resources listing page at the top.
 * Layout: image left, content right (reverses on mobile).
 */
export default function FeaturedPost({ post }: FeaturedPostProps) {
  const category = getCategoryBySlug(post.category);

  return (
    <article
      className="group grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-[#ebebeb] bg-white transition-all duration-300 hover:border-[#0a0a0a] hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)]"
      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
    >
      {/* Image */}
      <Link
        href={`/resources/${post.slug}`}
        className="block overflow-hidden"
        style={{ position: "relative", minHeight: "320px", background: "#f0f0ee" }}
        aria-label={`Read: ${post.title}`}
      >
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#f5f5f3" }}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <rect width="56" height="56" rx="12" fill="#e8e8e8" />
              <path d="M10 40l12-12 8 8 6-6 10 10" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="20" cy="22" r="5" fill="#bbb" />
            </svg>
          </div>
        )}

        {/* Featured label overlay */}
        <div className="absolute top-4 left-4">
          <span
            className="text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{ background: "#D6FD70", color: "#0a0a0a" }}
          >
            Featured
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col justify-center p-8 md:p-10">
        {/* Category */}
        {category && (
          <Link
            href={`/resources/category/${post.category}`}
            className="self-start text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 transition-opacity hover:opacity-75"
            style={{ background: "#0a0a0a", color: "#D6FD70", textDecoration: "none" }}
          >
            {category.name}
          </Link>
        )}

        {/* Title */}
        <Link href={`/resources/${post.slug}`} style={{ textDecoration: "none" }}>
          <h2 className="text-[24px] md:text-[30px] font-extrabold leading-[1.15] tracking-tight text-[#0a0a0a] mb-3 group-hover:text-[#333] transition-colors">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-[15px] leading-relaxed mb-6" style={{ color: "#666" }}>
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 pt-5 border-t border-[#f0f0f0]">
          {/* Author avatar placeholder */}
          <div
            className="flex items-center justify-center shrink-0 text-[13px] font-bold"
            style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#0a0a0a", color: "#D6FD70" }}
          >
            {post.author.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold text-[#0a0a0a]">{post.author}</span>
            <span className="text-[13px]" style={{ color: "#999" }}>
              {formatDate(post.date)} · {post.readTime}
            </span>
          </div>
        </div>

        {/* Read more link */}
        <Link
          href={`/resources/${post.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-[14px] font-bold text-[#0a0a0a] transition-colors hover:text-[#555]"
          style={{ textDecoration: "none" }}
        >
          Read full article
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 7h9M8.5 3.5L12 7l-3.5 3.5" />
          </svg>
        </Link>
      </div>
    </article>
  );
}