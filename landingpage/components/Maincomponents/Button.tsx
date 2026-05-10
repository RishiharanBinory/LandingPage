"use client";

import { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

interface EligibilityButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export default function EligibilityButton({
  label = "Check My Eligibility",
  onClick,
  className = "",
}: EligibilityButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(18);
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseEnter={() => {
        if (btnRef.current) {
          const w = btnRef.current.offsetWidth;
          setScale(Math.ceil((w / 44) * 2.2));
        }
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        padding: "8px 8px 8px 28px",
        borderRadius: "9999px",
        background: "#D6FD70",
        cursor: "pointer",
        // overflow hidden is CRITICAL — clips the expanding circle to the pill shape
        overflow: "hidden",
        outline: "none",
        border: "2.5px solid transparent",
        transition: hovered
          ? "border-color 0.18s ease 0.38s"
          : "border-color 0.18s ease 0s",
        borderColor: hovered ? "#D6FD70" : "transparent",
      }}
    >
      {/*
        The expanding fill circle.
        Key fix: we position it at the RIGHT edge (where the arrow circle is)
        and scale to a value large enough to always cover the full width.
        Using transformOrigin "center center" relative to the circle itself,
        and right/top positioning ensures it expands outward from the arrow.
      */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          // Circle is 44px; we place it flush with the 8px right padding
          right: "8px",
          // Vertically center it
          top: "50%",
          width: "44px",
          height: "44px",
          borderRadius: "9999px",
          background: "#000",
          // Start centered on itself, then scale up
          transform: hovered
            ? `translate(0, -50%) scale(${scale})`
            : "translate(0, -50%) scale(0)",
          transformOrigin: "center center",
          transition: hovered
            ? "transform 0.58s cubic-bezier(0.76, 0, 0.24, 1)"
            : "transform 0.48s cubic-bezier(0.76, 0, 0.24, 1)",
          willChange: "transform",
          zIndex: 1,
        }}
      />

      {/* Label */}
      <span
        style={{
          position: "relative",
          zIndex: 3,
          fontFamily: "var(--font-libre-caslon), serif",
          fontSize: "16px",
          fontWeight: 700,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: hovered ? "#fff" : "#000",
          transition: hovered
            ? "color 0.15s ease 0.12s"
            : "color 0.15s ease 0.25s",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>

      {/* Arrow circle — sits above the expanding fill (zIndex 4) */}
      <span
        style={{
          position: "relative",
          zIndex: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "44px",
          height: "44px",
          borderRadius: "9999px",
          background: hovered ? "#D6FD70" : "#000",
          flexShrink: 0,
          transition: "background 0.2s ease, transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
        }}
      >
        <ArrowUpRight
          size={18}
          style={{
            color: hovered ? "#000" : "#D6FD70",
            transition: "color 0.2s ease",
          }}
        />
      </span>
    </button>
  );
}