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
        border: `2.5px solid ${hovered ? "#D6FD70" : "transparent"}`,
        outline: "none",
        cursor: "pointer",
        overflow: "hidden",
        backgroundColor: "#D6FD70",
        transition: "border-color 0.3s ease",
      }}
    >
      {/* Black circle — expands from arrow circle center */}
      <span
        style={{
          position: "absolute",
          right: "8px",
          top: "50%",
          width: "46px",
          height: "46px",
          borderRadius: "9999px",
          backgroundColor: "#000000",
          transform: hovered
            ? "translate(50%, -50%) scale(20)"
            : "translate(50%, -50%) scale(0)",
          transformOrigin: "center center",
          transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* Label */}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          fontFamily: "var(--font-libre-caslon), serif",
          fontSize: "16px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: hovered ? "#ffffff" : "#000000",
          transition: "color 0.25s ease 0.05s",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>

      {/* Arrow circle */}
      <span
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "42px",
          height: "42px",
          borderRadius: "9999px",
          backgroundColor: "#000000",
          flexShrink: 0,
          transition: "transform 0.3s ease",
          transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
        }}
      >
        <ArrowUpRight size={18} style={{ color: "#D6FD70" }} />
      </span>
    </button>
  );
}