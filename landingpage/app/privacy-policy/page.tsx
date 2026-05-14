"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────
type Section = {
  id: string;
  title: string;
  content: React.ReactNode;
};

// ── Data ──────────────────────────────────────────────────────────────────────
const SECTIONS: Section[] = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <>
        <p>
          Elibiliby (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;)
          is committed to protecting your personal information and your right to
          privacy. This Privacy Policy explains how we collect, use, disclose,
          and safeguard your information when you visit our website and use our
          student funding eligibility checker.
        </p>
        <p>
          Please read this policy carefully. If you disagree with its terms,
          please discontinue use of our site. We reserve the right to make
          changes to this policy at any time, and we will notify you by updating
          the &ldquo;Last Updated&rdquo; date at the top of this page.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: (
      <>
        <p>We collect information you provide directly to us, including:</p>
        <ul>
          <li>
            <strong>Personal Identification Information</strong> — your full
            name, email address, and mobile phone number submitted via our lead
            capture form.
          </li>
          <li>
            <strong>Eligibility Quiz Responses</strong> — answers you provide
            during the student funding eligibility quiz, including nationality,
            residency status, immigration status, and prior funding history.
          </li>
          <li>
            <strong>Technical Data</strong> — IP address, browser type,
            operating system, referring URLs, and pages visited, collected
            automatically when you access our site.
          </li>
          <li>
            <strong>Usage Data</strong> — how you interact with our quiz,
            including which questions you answered and in what order.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> collect sensitive personal data such as
          financial account numbers, passport details, or National Insurance
          numbers through our eligibility checker.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>
            To assess and communicate your student funding eligibility result.
          </li>
          <li>
            To send your eligibility outcome and relevant guidance to the email
            address you provide.
          </li>
          <li>
            To create a lead record in our CRM system (Zoho CRM) so that our
            advisors can follow up with you.
          </li>
          <li>
            To improve, personalise, and expand our website and eligibility
            tool.
          </li>
          <li>
            To understand how users interact with our quiz and optimise the
            experience.
          </li>
          <li>
            To comply with legal obligations and enforce our terms and
            conditions.
          </li>
        </ul>
        <p>
          We will never sell your personal data to third parties for marketing
          purposes. We do not use your information to make automated decisions
          that produce legal or similarly significant effects without human
          review.
        </p>
      </>
    ),
  },
  {
    id: "legal-basis",
    title: "Legal Basis for Processing",
    content: (
      <>
        <p>
          We process your personal data on the following legal bases under the
          UK General Data Protection Regulation (UK GDPR):
        </p>
        <ul>
          <li>
            <strong>Consent</strong> — where you have freely given, specific,
            and informed consent (e.g. submitting your contact details to
            receive your result).
          </li>
          <li>
            <strong>Legitimate Interests</strong> — to operate and improve our
            eligibility checker, and to follow up with prospective students who
            have requested guidance.
          </li>
          <li>
            <strong>Legal Obligation</strong> — where processing is necessary to
            comply with a legal duty to which we are subject.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Sharing Your Information",
    content: (
      <>
        <p>
          We may share your information with trusted third-party service
          providers who assist us in operating our website and delivering our
          services, subject to confidentiality agreements. These include:
        </p>
        <ul>
          <li>
            <strong>EmailJS</strong> — used to deliver eligibility result emails
            to you and notification emails to our internal team.
          </li>
          <li>
            <strong>Zoho CRM</strong> — used to store and manage your lead
            record so our advisors can provide personalised follow-up.
          </li>
          <li>
            <strong>Hosting &amp; Infrastructure Providers</strong> — such as
            Vercel, which hosts our web application.
          </li>
        </ul>
        <p>
          We may also disclose your information if required to do so by law, or
          in response to valid requests by public authorities (e.g. a court or
          government agency).
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: (
      <>
        <p>
          We retain your personal data only for as long as is necessary to
          fulfil the purposes for which it was collected, including satisfying
          any legal, regulatory, accounting, or reporting requirements.
        </p>
        <p>
          Lead records in our CRM are reviewed annually and deleted if there has
          been no meaningful engagement within <strong>24 months</strong>. You
          may request deletion of your data at any time (see &ldquo;Your
          Rights&rdquo; below).
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: (
      <>
        <p>
          Under UK GDPR, you have the following rights regarding your personal
          data:
        </p>
        <ul>
          <li>
            <strong>Right to Access</strong> — request a copy of the personal
            data we hold about you.
          </li>
          <li>
            <strong>Right to Rectification</strong> — request correction of
            inaccurate or incomplete data.
          </li>
          <li>
            <strong>Right to Erasure</strong> — request deletion of your
            personal data (&ldquo;right to be forgotten&rdquo;).
          </li>
          <li>
            <strong>Right to Restriction</strong> — request that we restrict
            processing of your data.
          </li>
          <li>
            <strong>Right to Data Portability</strong> — receive your data in a
            structured, commonly used format.
          </li>
          <li>
            <strong>Right to Object</strong> — object to processing based on
            legitimate interests.
          </li>
          <li>
            <strong>Right to Withdraw Consent</strong> — withdraw consent at any
            time where processing is based on consent.
          </li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at the address
          below. We will respond within <strong>30 days</strong>. You also have
          the right to lodge a complaint with the Information
          Commissioner&rsquo;s Office (ICO) at{" "}
          <a
            href="https://ico.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0a0a0a",
              fontWeight: 700,
              textDecoration: "underline",
            }}
          >
            ico.org.uk
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    content: (
      <>
        <p>
          Our website may use cookies and similar tracking technologies to
          improve your experience. Cookies are small data files stored on your
          device. We use:
        </p>
        <ul>
          <li>
            <strong>Essential Cookies</strong> — necessary for the website to
            function correctly. These cannot be disabled.
          </li>
          <li>
            <strong>Analytics Cookies</strong> — to understand how visitors
            interact with our site (e.g. pages visited, time on site). These are
            only set with your consent.
          </li>
        </ul>
        <p>
          You can control or delete cookies through your browser settings.
          Disabling cookies may affect certain functionality of our site.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Data Security",
    content: (
      <>
        <p>
          We implement appropriate technical and organisational measures to
          protect your personal data against unauthorised access, alteration,
          disclosure, or destruction. These measures include encrypted data
          transmission (HTTPS), restricted access controls, and regular security
          reviews.
        </p>
        <p>
          However, no method of transmission over the Internet or electronic
          storage is 100% secure. While we strive to use commercially acceptable
          means to protect your personal data, we cannot guarantee its absolute
          security.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    content: (
      <>
        <p>
          If you have questions, concerns, or requests regarding this Privacy
          Policy or our data practices, please contact us:
        </p>
        <div
          style={{
            background: "#fafafa",
            border: "1.5px solid #ebebeb",
            borderRadius: "16px",
            padding: "24px 28px",
            marginTop: "8px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontWeight: 700,
              color: "#0a0a0a",
              fontSize: "16px",
            }}
          >
            Elibiliby
          </p>
          <p style={{ margin: "8px 0 0", color: "#555" }}>
            Email:{" "}
            <a
              href="mailto:info@eligbility.com"
              style={{
                color: "#0a0a0a",
                fontWeight: 700,
                textDecoration: "underline",
              }}
            >
              info@eligbility.com
            </a>
          </p>
        </div>
      </>
    ),
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTocOpen(false);
    }
  }

  const activeTitle = SECTIONS.find((s) => s.id === activeSection)?.title ?? "";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
        color: "#0a0a0a",
      }}
    >
      {/* ── Hero ── */}
      <div
        style={{
          background: "#0a0a0a",
          paddingTop: "clamp(100px, 15vw, 140px)",
          paddingBottom: "clamp(36px, 7vw, 64px)",
          paddingLeft: "clamp(20px, 5vw, 40px)",
          paddingRight: "clamp(20px, 5vw, 40px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* decorative accent */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: "360px",
            height: "360px",
            background: "#D6FD70",
            borderRadius: "50%",
            opacity: 0.06,
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(214,253,112,0.12)",
              border: "1px solid rgba(214,253,112,0.25)",
              borderRadius: "100px",
              padding: "6px 16px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                background: "#D6FD70",
                borderRadius: "50%",
              }}
            />
            <span
              style={{
                color: "#D6FD70",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Legal
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(32px, 7vw, 60px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.06,
              letterSpacing: "-1.5px",
              margin: "0 0 16px",
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              fontSize: "clamp(14px, 3.5vw, 17px)",
              color: "rgba(255,255,255,0.5)",
              maxWidth: "560px",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            We take your privacy seriously. This policy explains exactly what we
            collect, why we collect it, and how you stay in control.
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.3)",
              marginTop: "20px",
              fontWeight: 600,
            }}
          >
            Last updated: 13 May 2026
          </p>
        </div>
      </div>

      {/* ── Mobile TOC Accordion ── */}
      <div className="mobile-toc">
        <button
          onClick={() => setTocOpen((v) => !v)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            background: "#fafafa",
            border: "none",
            borderBottom: "1.5px solid #ebebeb",
            cursor: "pointer",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#bbb",
              }}
            >
              Contents
            </span>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#0a0a0a" }}>
              {activeTitle}
            </span>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0a0a0a"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: tocOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
              flexShrink: 0,
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {tocOpen && (
          <nav
            style={{
              background: "#fff",
              borderBottom: "1.5px solid #ebebeb",
              padding: "8px 0",
            }}
          >
            {SECTIONS.map((s, i) => {
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: isActive ? "#0a0a0a" : "transparent",
                    border: "none",
                    padding: "11px 20px",
                    cursor: "pointer",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      color: isActive ? "#D6FD70" : "#ccc",
                      minWidth: "18px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#fff" : "#555",
                    }}
                  >
                    {s.title}
                  </span>
                  {isActive && (
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        background: "#D6FD70",
                        borderRadius: "50%",
                        marginLeft: "auto",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* ── Body: Sidebar + Content ── */}
      <div className="page-body">
        {/* Desktop Sidebar TOC */}
        <aside className="desktop-sidebar" style={{ position: "sticky", top: "88px" }}>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#bbb",
              marginBottom: "16px",
            }}
          >
            Contents
          </p>
          <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {SECTIONS.map((s, i) => {
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: isActive ? "#0a0a0a" : "transparent",
                    border: "none",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.18s",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      color: isActive ? "#D6FD70" : "#ccc",
                      minWidth: "18px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#fff" : "#555",
                      lineHeight: 1.3,
                    }}
                  >
                    {s.title}
                  </span>
                  {isActive && (
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        background: "#D6FD70",
                        borderRadius: "50%",
                        marginLeft: "auto",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick contact card */}
          <div
            style={{
              marginTop: "32px",
              background: "#fafafa",
              border: "1.5px solid #ebebeb",
              borderRadius: "16px",
              padding: "20px",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#bbb",
                margin: "0 0 10px",
              }}
            >
              Questions?
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#555",
                lineHeight: 1.5,
                margin: "0 0 14px",
              }}
            >
              Contact us and we&rsquo;ll respond within 30 days.
            </p>
            <a
              href="mailto:info@eligbility.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "#0a0a0a",
                color: "#D6FD70",
                fontSize: "13px",
                fontWeight: 700,
                padding: "9px 16px",
                borderRadius: "100px",
                textDecoration: "none",
              }}
            >
              Email Us
              <svg
                width="11"
                height="11"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.5 7h9M8.5 3.5L12 7l-3.5 3.5" />
              </svg>
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main style={{ minWidth: 0 }}>
          {SECTIONS.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              style={{
                scrollMarginTop: "96px",
                paddingBottom: "48px",
                borderBottom:
                  i < SECTIONS.length - 1 ? "1.5px solid #f0f0f0" : "none",
                marginBottom: i < SECTIONS.length - 1 ? "48px" : 0,
              }}
            >
              {/* Section header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "#0a0a0a",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#D6FD70",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2
                  style={{
                    fontSize: "clamp(18px, 4vw, 24px)",
                    fontWeight: 800,
                    color: "#0a0a0a",
                    letterSpacing: "-0.4px",
                    margin: 0,
                  }}
                >
                  {s.title}
                </h2>
              </div>

              {/* Content */}
              <div
                style={{
                  fontSize: "15px",
                  lineHeight: 1.75,
                  color: "#444",
                }}
                className="policy-content"
              >
                {s.content}
              </div>
            </section>
          ))}
        </main>
      </div>

      {/* ── Global styles ── */}
      <style>{`
        /* ── Layout ── */
        .page-body {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 40px 100px;
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 64px;
          align-items: start;
        }
        .mobile-toc {
          display: none;
        }

        /* ── Mobile breakpoint ── */
        @media (max-width: 768px) {
          .desktop-sidebar {
            display: none;
          }
          .mobile-toc {
            display: block;
          }
          .page-body {
            grid-template-columns: 1fr;
            gap: 0;
            padding: 32px 20px 64px;
          }
        }

        /* ── Policy content styles ── */
        .policy-content p {
          margin: 0 0 16px;
          font-size: 15px;
          line-height: 1.75;
          color: #444;
        }
        .policy-content p:last-child {
          margin-bottom: 0;
        }
        .policy-content ul {
          margin: 0 0 16px;
          padding-left: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .policy-content ul li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 15px;
          line-height: 1.65;
          color: #444;
        }
        .policy-content ul li::before {
          content: "";
          width: 7px;
          height: 7px;
          background: #D6FD70;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 8px;
        }
        .policy-content strong {
          color: #0a0a0a;
          font-weight: 700;
        }
        .policy-content a:hover {
          opacity: 0.75;
        }

        @media (max-width: 480px) {
          .policy-content p,
          .policy-content ul li {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}