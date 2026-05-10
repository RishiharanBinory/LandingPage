"use client";

// ─── components/NewsletterCard.tsx ───────────────────────────────
// Self-contained newsletter signup card.
// Wire it up by passing an `onSubmit` prop — no changes to this file needed.

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const LIME = "#D6FD70";
const BLACK = "#0a0a0a";

interface NewsletterCardProps {
  /** Called when user submits. Receives the email string. */
  onSubmit?: (email: string) => void | Promise<void>;
  heading?: string;
  subheading?: string;
}

export default function NewsletterCard({
  onSubmit,
  heading = "Get Weekly Student Finance Tips",
  subheading = "No jargon. No spam. Just clear, actionable guidance delivered to your inbox every week.",
}: NewsletterCardProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [hovered, setHovered] = useState(false);

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      await onSubmit?.(email);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      style={{
        background: BLACK,
        borderRadius: "24px",
        padding: "clamp(32px, 5vw, 56px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Lime decorative circle — top right */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "180px",
          height: "180px",
          borderRadius: "9999px",
          background: LIME,
          opacity: 0.12,
          pointerEvents: "none",
        }}
      />

      {/* Tag pill */}
      <span
        style={{
          display: "inline-block",
          background: LIME,
          color: BLACK,
          borderRadius: "9999px",
          padding: "5px 14px",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.09em",
          textTransform: "uppercase",
          marginBottom: "20px",
        }}
      >
        Newsletter
      </span>

      {/* Heading */}
      <h3
        style={{
          fontSize: "clamp(22px, 3.5vw, 34px)",
          fontWeight: 800,
          color: "#ffffff",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          margin: "0 0 14px",
          maxWidth: "480px",
        }}
      >
        {heading}
      </h3>

      {/* Subheading */}
      <p
        style={{
          fontSize: "16px",
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.65,
          margin: "0 0 32px",
          maxWidth: "440px",
        }}
      >
        {subheading}
      </p>

      {/* Success state */}
      {status === "success" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(214,253,112,0.12)",
            border: `1.5px solid ${LIME}`,
            borderRadius: "14px",
            padding: "16px 24px",
          }}
        >
          <span style={{ fontSize: "20px" }}>✓</span>
          <p style={{ color: LIME, fontWeight: 600, margin: 0, fontSize: "15px" }}>
            You&apos;re in! We&apos;ll be in touch soon.
          </p>
        </div>
      ) : (
        /* Input + button row */
        <div
          style={{
            display: "flex",
            gap: "10px",
            width: "100%",
            maxWidth: "500px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            style={{
              flex: 1,
              minWidth: "200px",
              padding: "14px 20px",
              borderRadius: "9999px",
              border: `1.5px solid ${status === "error" ? "#ff5f5f" : "rgba(255,255,255,0.15)"}`,
              background: "rgba(255,255,255,0.07)",
              color: "#ffffff",
              fontSize: "15px",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              outline: "none",
              transition: "border-color 0.2s ease",
            }}
          />

          {/* Eligiby-style button */}
          <button
            onClick={handleSubmit}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            disabled={status === "loading"}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 10px 10px 24px",
              borderRadius: "9999px",
              background: LIME,
              border: "none",
              cursor: status === "loading" ? "wait" : "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {/* Fill animation */}
            <span
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                width: "40px",
                height: "40px",
                borderRadius: "9999px",
                background: BLACK,
                transform: hovered
                  ? "translate(0,-50%) scale(14)"
                  : "translate(0,-50%) scale(0)",
                transformOrigin: "center center",
                transition: "transform 0.55s cubic-bezier(0.76,0,0.24,1)",
                zIndex: 1,
              }}
            />
            <span
              style={{
                position: "relative",
                zIndex: 3,
                color: hovered ? "#fff" : BLACK,
                transition: "color 0.15s ease 0.1s",
              }}
            >
              {status === "loading" ? "Sending…" : "Subscribe"}
            </span>
            <span
              style={{
                position: "relative",
                zIndex: 4,
                width: "40px",
                height: "40px",
                borderRadius: "9999px",
                background: hovered ? LIME : BLACK,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
              }}
            >
              <ArrowUpRight size={16} color={hovered ? BLACK : LIME} />
            </span>
          </button>
        </div>
      )}

      {status === "error" && (
        <p style={{ color: "#ff5f5f", fontSize: "13px", marginTop: "10px", fontWeight: 500 }}>
          Please enter a valid email address.
        </p>
      )}
    </div>
  );
}