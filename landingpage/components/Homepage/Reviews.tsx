"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const ACCENT = "#D6FD70";

const testimonials = [
  {
    quote:
      "I thought I wasn't eligible because I studied outside the UK. I got approved after they guided me through it.",
    name: "Amara K.",
    location: "Student, East London",
    initials: "AK",
  },
  {
    quote:
      "I work full-time and didn't think I could study. Turns out I could do both — and get funded for it.",
    name: "Marcus T.",
    location: "Student, Wembley",
    initials: "MT",
  },
  {
    quote:
      "I had no certificates from my previous course. They found an alternative route and I got my loan within weeks.",
    name: "Priya S.",
    location: "Student, Southall",
    initials: "PS",
  },
  {
    quote:
      "I assumed there was an age limit. I'm 41 and I'm now fully funded studying part-time in Birmingham.",
    name: "David O.",
    location: "Student, Birmingham",
    initials: "DO",
  },
  {
    quote:
      "The whole process felt impossible until they broke it down. Step by step, I got my maintenance loan approved.",
    name: "Fatima R.",
    location: "Student, Manchester",
    initials: "FR",
  },
  {
    quote:
      "I'd been putting this off for two years thinking I wouldn't qualify. Within a month I was enrolled and funded.",
    name: "James B.",
    location: "Student, Leeds",
    initials: "JB",
  },
  {
    quote:
      "As a single parent I didn't think higher education was for me. The childcare grant changed everything.",
    name: "Nadia W.",
    location: "Student, Bristol",
    initials: "NW",
  },
  {
    quote:
      "I was rejected before on my own. With their help I understood exactly what to submit and got through first time.",
    name: "Emmanuel A.",
    location: "Student, Hackney",
    initials: "EA",
  },
  {
    quote:
      "I had no idea the maintenance loan would go directly into my account. That money helped me actually focus on studying.",
    name: "Sophie L.",
    location: "Student, Coventry",
    initials: "SL",
  },
  {
    quote:
      "My disability meant I needed extra support. They helped me access the Disabled Students' Allowance — life changing.",
    name: "Ryan M.",
    location: "Student, Sheffield",
    initials: "RM",
  },
];

// Duplicate for seamless infinite loop
const loopedItems = [...testimonials, ...testimonials];

function TestimonialCard({
  quote,
  name,
  location,
  initials,
}: {
  quote: string;
  name: string;
  location: string;
  initials: string;
}) {
  return (
    <div
      style={{
        width: "300px",
        flexShrink: 0,
        /* top padding makes room for the avatar that sits above */
        paddingTop: "36px",
        position: "relative",
      }}
    >
      {/* ── Avatar: white-bg ring sitting on top edge of card ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "24px",
          zIndex: 2,
          /* white ring acts as gap between avatar and card */
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        {/* Inner dark circle with initials */}
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: "#0a0a0a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: ACCENT,
              letterSpacing: "0.04em",
            }}
          >
            {initials}
          </span>
        </div>
      </div>

      {/* ── Card body ── */}
      <div
        style={{
          background: "#f7f7f5",
          borderRadius: "18px",
          padding: "28px 24px 22px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          height: "100%",
        }}
      >
        {/* Quote mark */}
        <span
          style={{
            fontSize: "32px",
            fontWeight: 900,
            color: "#0a0a0a",
            lineHeight: 1,
            display: "block",
          }}
        >
          &#8221;
        </span>

        {/* Quote text */}
        <p
          style={{
            fontSize: "14px",
            color: "#444",
            lineHeight: 1.7,
            margin: 0,
            flex: 1,
          }}
        >
          {quote}
        </p>

        {/* Divider */}
        <div style={{ height: "1px", background: "#e4e4e2" }} />

        {/* Name + location */}
        <div>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#0a0a0a",
              margin: "0 0 2px",
            }}
          >
            {name}
          </p>
          <p style={{ fontSize: "13px", color: "#999", margin: 0 }}>
            {location}
          </p>
        </div>

        {/* Italic watermark name */}
        <p
          style={{
            fontSize: "18px",
            fontStyle: "italic",
            fontWeight: 600,
            color: "rgba(0,0,0,0.055)",
            margin: 0,
            lineHeight: 1,
          }}
        >
          {name}
        </p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      className="w-full bg-white py-20 overflow-hidden"
      style={{ fontFamily: "var(--font-plus-jakarta)" }}
    >
      {/* ── Header ── */}
      <div className="max-w-[1100px] mx-auto px-5 md:px-10 lg:px-16 flex flex-col items-center mb-16">

        {/* Tag pill */}

        {/* Heading */}
        <motion.h2
          className="text-center max-w-[580px] mx-auto mb-5"
          style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#0a0a0a",
          }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
        >
          What our{" "}
          students{" "}
          are saying
        </motion.h2>

        {/* Sub */}
        <motion.p
          className="text-center max-w-[440px] mx-auto"
          style={{ fontSize: "16px", color: "#888", lineHeight: 1.6 }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        >
          Real students across the UK who thought they weren&apos;t eligible —
          and were wrong.
        </motion.p>
      </div>

      {/* ── Single infinite scroll row ── */}
      {/* Extra top padding so the protruding avatar isn't clipped */}
      <div style={{ overflow: "hidden", width: "100%", paddingTop: "8px" }}>
        <div
          style={{
            display: "flex",
            gap: "16px",
            width: "max-content",
            animation: "scrollLeft 50s linear infinite",
            paddingLeft: "16px",
            alignItems: "flex-start",
          }}
        >
          {loopedItems.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Pause on hover for accessibility */
        div:hover > div[style*="scrollLeft"] {
          animation-play-state: paused;
        }

        /* Mobile: slightly slower, narrower cards via wrapper */
        @media (max-width: 640px) {
          div[style*="scrollLeft"] {
            animation-duration: 35s;
          }
        }
      `}</style>
    </section>
  );
}