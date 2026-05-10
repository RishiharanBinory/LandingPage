"use client";

import { motion } from "framer-motion";
import EligibilityButton from "../Maincomponents/Button";
import CardCarousel from "./Cardcarosal";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  return (
    <div
      className="w-full bg-white px-2 md:px-3 lg:px-4 pt-0 pb-0"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div
        className="relative w-full max-w-[1900px] mx-auto"
        style={{
          borderRadius: "0 0 28px 28px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Sky background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/sky.png')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
            filter: "brightness(1.15)",
            zIndex: 0,
          }}
        />

        {/* Blue gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(6,40,100,0.06) 0%, rgba(6,40,100,0.18) 55%, rgba(6,40,100,0.42) 100%)",
            zIndex: 1,
          }}
        />

        {/* Main content */}
        <div
          className="hero-content"
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // KEY FIX: Mobile gets a larger top padding to push content into the
            // optical center of the sky image. Desktop stays at the original value.
            // clamp(min, preferred, max) — on a 390px phone: 14vw = 54px (too low),
            // so we use a fixed 140px floor for mobile via a responsive class instead.
            paddingTop: "clamp(190px, 16vw, 180px)",
            paddingLeft: "clamp(16px, 4vw, 48px)",
            paddingRight: "clamp(16px, 4vw, 48px)",
            paddingBottom: "40px",
            flex: 1,
          }}
        >
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: EASE }}
            style={{
              fontFamily: "'Plus Jakarta Sans', serif",
              fontWeight: 600,
              // Slightly larger min so mobile text doesn't feel too small
              fontSize: "clamp(30px, 5.5vw, 60px)",
              // Looser line-height on mobile — 1.08 is too tight for 2-line wraps
              lineHeight: 1.13,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              textAlign: "center",
              maxWidth: "860px",
              margin: "0 auto",
            }}
          >
            Check if you qualify for Student Finance in the UK <br />
            <span style={{ color: "#D6FD70" }}>In 60 Seconds!</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease: EASE }}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(15px, 2vw, 20px)",
              lineHeight: 1.6,
              color: "#ffffff",
              textAlign: "center",
              maxWidth: "640px",
              // More vertical breathing room on mobile (was 24px flat)
              margin: "clamp(20px, 4vw, 28px) auto 0",
            }}
          >
            You could get{" "}
            <span style={{ fontWeight: 600 }}>
              your tuition fees covered £9,000+{" "}
            </span>{" "}
            and receive up to{" "}
            <span style={{ fontWeight: 600 }}>
              £13,000 per year paid directly to you.
            </span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.45, ease: EASE }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              // Responsive gap so CTA doesn't crowd the subheadline on mobile
              marginTop: "clamp(28px, 5vw, 36px)",
            }}
          >
            <Link href="/eligibility-checker">
              <EligibilityButton label="Check My Eligibility" />
            </Link>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.04em",
                margin: 0,
              }}
            >
              Free&nbsp;&nbsp;•&nbsp;&nbsp;No
              obligation&nbsp;&nbsp;•&nbsp;&nbsp;Takes 60 seconds
            </p>
          </motion.div>

          {/* Carousel — bleeds edge-to-edge on mobile by negating parent padding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{
              width: "100vw",
              maxWidth: "1200px",
              marginTop: "clamp(36px, 6vw, 48px)",
              paddingBottom: "20px",
              overflow: "visible",
              marginLeft: "clamp(-16px, -4vw, 0px)",
              marginRight: "clamp(-16px, -4vw, 0px)",
            }}
          >
            <CardCarousel />
          </motion.div>
        </div>
      </div>
    </div>
  );
}