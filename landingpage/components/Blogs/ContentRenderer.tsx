import Image from "next/image";
import { ContentBlock } from "@/app/resources/data/posts";

interface ContentRendererProps {
  blocks: ContentBlock[];
}

/**
 * ContentRenderer
 * Renders an array of ContentBlock objects into semantic HTML.
 * To add new block types: add a case here and a type to ContentBlock in posts.ts.
 */
export default function ContentRenderer({ blocks }: ContentRendererProps) {
  return (
    <div
      className="flex flex-col gap-6"
      style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}
    >
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={i}
                className="text-[16px] md:text-[17px] leading-[1.8] text-[#333]"
              >
                {block.text}
              </p>
            );

          case "heading":
            return (
              <h2
                key={i}
                className="text-[22px] md:text-[26px] font-extrabold tracking-tight text-[#0a0a0a] mt-4"
              >
                {block.text}
              </h2>
            );

          case "subheading":
            return (
              <h3
                key={i}
                className="text-[18px] md:text-[20px] font-bold tracking-tight text-[#0a0a0a] mt-2"
              >
                {block.text}
              </h3>
            );

          case "quote":
            return (
              <blockquote
                key={i}
                className="relative pl-6 py-4 pr-4 rounded-xl my-2"
                style={{
                  background: "#fafafa",
                  borderLeft: "4px solid #D6FD70",
                  fontStyle: "normal",
                }}
              >
                <p className="text-[16px] md:text-[18px] font-semibold leading-relaxed text-[#0a0a0a]">
                  &ldquo;{block.text}&rdquo;
                </p>
                {block.attribution && (
                  <footer className="mt-2 text-[13px] font-bold uppercase tracking-widest" style={{ color: "#999" }}>
                    — {block.attribution}
                  </footer>
                )}
              </blockquote>
            );

          case "image":
            return (
              <figure key={i} className="my-2">
                <div
                  className="relative w-full overflow-hidden rounded-xl"
                  style={{ aspectRatio: "16/9", background: "#f0f0ee" }}
                >
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 740px"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-2 text-[13px] text-center" style={{ color: "#999" }}>
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "bulletList":
            return (
              <ul key={i} className="flex flex-col gap-2 pl-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-[16px] leading-relaxed text-[#333]">
                    <span
                      className="shrink-0 mt-2 w-2 h-2 rounded-full"
                      style={{ background: "#D6FD70" }}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "numberedList":
            return (
              <ol key={i} className="flex flex-col gap-3 pl-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-[16px] leading-relaxed text-[#333]">
                    <span
                      className="shrink-0 flex items-center justify-center text-[12px] font-bold mt-0.5"
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "#0a0a0a",
                        color: "#D6FD70",
                        flexShrink: 0,
                      }}
                    >
                      {j + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            );

          case "divider":
            return (
              <hr
                key={i}
                className="my-4 border-0"
                style={{ height: "1px", background: "#ebebeb" }}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}