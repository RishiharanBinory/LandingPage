import Link from "next/link";
import Image from "next/image";
import { BlogPost, formatDate, getCategoryBySlug } from "@/app/resources/data/posts";


interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "compact";
}

/**
 * BlogCard
 * Reusable card component for blog post listings.
 * variant="default"  → full card with image (used in grid)
 * variant="compact"  → text-only compact row (used in sidebars)
 */
export default function BlogCard({ post, variant = "default" }: BlogCardProps) {
  const category = getCategoryBySlug(post.category);

  if (variant === "compact") {
    return (
      <article>
        <Link
          href={`/resources/${post.slug}`}
          className="group flex items-start gap-4 py-4 border-b border-[#ebebeb] last:border-0 transition-colors hover:border-[#0a0a0a]"
          style={{ textDecoration: "none" }}
        >
          <div className="flex flex-col flex-1 min-w-0">
            {category && (
              <span
                className="text-[11px] font-bold uppercase tracking-widest mb-1"
                style={{ color: "#D6FD70", background: "#0a0a0a", padding: "2px 8px", borderRadius: "999px", display: "inline-block", width: "fit-content" }}
              >
                {category.name}
              </span>
            )}
            <h3
              className="text-[15px] font-bold leading-snug text-[#0a0a0a] group-hover:text-[#555] transition-colors line-clamp-2"
            >
              {post.title}
            </h3>
            <span className="text-[13px] mt-1" style={{ color: "#999" }}>
              {formatDate(post.date)} · {post.readTime}
            </span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article
      className="group flex flex-col rounded-2xl overflow-hidden border border-[#ebebeb] bg-white transition-all duration-300 hover:border-[#0a0a0a] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
    >
      {/* Image */}
      <Link href={`/resources/${post.slug}`} className="block overflow-hidden" style={{ aspectRatio: "16/9", position: "relative", background: "#f0f0ee" }}>
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          /* Placeholder when no image is set */
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#f5f5f3" }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="8" fill="#e8e8e8" />
              <path d="M8 28l8-8 6 6 4-4 6 6" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="14" cy="16" r="3" fill="#bbb" />
            </svg>
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category badge */}
        {category && (
          <Link
            href={`/resources/category/${post.category}`}
            className="self-start text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 transition-colors hover:opacity-80"
            style={{ background: "#0a0a0a", color: "#D6FD70", textDecoration: "none" }}
          >
            {category.name}
          </Link>
        )}

        {/* Title */}
        <Link href={`/resources/${post.slug}`} style={{ textDecoration: "none" }}>
          <h2 className="text-[18px] font-extrabold leading-snug text-[#0a0a0a] mb-2 group-hover:text-[#333] transition-colors">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-[14px] leading-relaxed flex-1 mb-4" style={{ color: "#666" }}>
          {post.excerpt}
        </p>

        {/* Meta footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#f0f0f0]">
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-[#0a0a0a]">{post.author}</span>
            <span className="text-[12px]" style={{ color: "#999" }}>{formatDate(post.date)}</span>
          </div>
          <span
            className="text-[12px] font-medium px-3 py-1 rounded-full"
            style={{ background: "#f5f5f3", color: "#777" }}
          >
            {post.readTime}
          </span>
        </div>
      </div>
    </article>
  );
}