"use client";

import { useState } from "react";
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

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
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
        overflow: "hidden",
        outline: "none",
        // Border: transparent → lime, kicks in AFTER fill completes
        border: "2.5px solid transparent",
        transition: hovered
          ? "border-color 0.18s ease 0.38s"
          : "border-color 0.18s ease 0s",
        borderColor: hovered ? "#D6FD70" : "transparent",
      }}
    >
      {/* Expanding black circle from arrow position */}
      <span
        style={{
          position: "absolute",
          width: "44px",
          height: "44px",
          borderRadius: "9999px",
          background: "#000",
          right: "8px",
          top: "50%",
          transform: hovered
            ? "translate(0, -50%) scale(12)"
            : "translate(0, -50%) scale(0)",
          transformOrigin: "center center",
          transition: "transform 0.55s cubic-bezier(0.76, 0, 0.24, 1)",
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
            ? "color 0.15s ease 0.1s"
            : "color 0.15s ease 0.28s",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>

      {/* Arrow circle */}
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
          transition: "transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
        }}
      >
        <ArrowUpRight
          size={18}
          style={{ color: hovered ? "#000" : "#D6FD70" }}
        />
      </span>
    </button>
  );
}