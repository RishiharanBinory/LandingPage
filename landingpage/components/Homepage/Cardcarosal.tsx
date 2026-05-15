"use client";

import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';

const BASE_CARDS = [
  { title: "Tuition Fee Loan",  sub: "Up to £9,250/year",  type: "light"  },
  { title: "Maintenance Loan",  sub: "Up to £14,000+/year", type: "dark"   },
  { title: "No Certificates?",  sub: "Still may qualify",  type: "light"  },
  { title: "Non-UK Study?",     sub: "Covered in 60s",     type: "accent" },
  { title: "Free Check",        sub: "No obligation",      type: "dark"   },
  { title: "Fast Result",       sub: "Takes 60 seconds",   type: "light"  },
  { title: "£9,000+",           sub: "Average award",      type: "accent" },
  { title: "Qualify Today",     sub: "Start your check",   type: "light"  },
];

const ORBIT_CARDS = [...BASE_CARDS, ...BASE_CARDS];
const CAROUSEL_CARDS = [...BASE_CARDS, ...BASE_CARDS, ...BASE_CARDS];

const SLOT_W = 168;
const LOOP_LEN = BASE_CARDS.length * SLOT_W;

// ─── Mobile Horizontal Carousel ──────────────────────────────────────────────

function MobileCarousel() {
  const trackRef   = useRef<HTMLDivElement>(null);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const stateRef   = useRef({
    offset: LOOP_LEN,
    velocity: 0,
    dragging: false,
    dragStartX: 0,
    dragStartOff: LOOP_LEN,
    lastX: 0,
    lastT: 0,
    paused: false,
    pauseTimer: null as ReturnType<typeof setTimeout> | null,
  });
  const rafRef = useRef<number | null>(null);

  function clamp(v: number) {
    v = v % LOOP_LEN;
    if (v < 0) v += LOOP_LEN;
    return v + LOOP_LEN;
  }

  function apply(offset: number) {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-offset}px)`;
    }
  }

  function pauseFor(ms: number) {
    const s = stateRef.current;
    s.paused = true;
    if (s.pauseTimer) clearTimeout(s.pauseTimer);
    s.pauseTimer = setTimeout(() => {
      s.paused = false;
      s.velocity = 0;
    }, ms);
  }

  useEffect(() => {
    apply(stateRef.current.offset);

    const loop = () => {
      const s = stateRef.current;
      if (!s.dragging) {
        if (!s.paused) {
          s.offset += 0.55;
          if (s.offset >= LOOP_LEN * 2) s.offset -= LOOP_LEN;
          apply(s.offset);
        } else {
          if (Math.abs(s.velocity) > 0.04) {
            s.offset += s.velocity;
            s.velocity *= 0.91;
            if (s.offset < LOOP_LEN)      s.offset += LOOP_LEN;
            if (s.offset >= LOOP_LEN * 2) s.offset -= LOOP_LEN;
            if (Math.abs(s.velocity) < 0.25) {
              const snap = Math.round(s.offset / SLOT_W) * SLOT_W;
              s.offset += (snap - s.offset) * 0.1;
            }
            apply(s.offset);
          }
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const s = stateRef.current;
    s.dragging = true;
    s.dragStartX = e.clientX;
    s.dragStartOff = s.offset;
    s.lastX = e.clientX;
    s.lastT = performance.now();
    s.velocity = 0;
    wrapRef.current?.setPointerCapture(e.pointerId);
    pauseFor(4000);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = stateRef.current;
    if (!s.dragging) return;
    const now = performance.now();
    const dx  = e.clientX - s.lastX;
    const dt  = now - s.lastT || 1;
    s.velocity = (-dx / dt) * 14;
    s.lastX = e.clientX;
    s.lastT = now;
    s.offset = clamp(s.dragStartOff - (e.clientX - s.dragStartX));
    apply(s.offset);
  };

  const onPointerUp = () => {
    stateRef.current.dragging = false;
    pauseFor(2200);
  };

  return (
    <div
      ref={wrapRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        touchAction: 'pan-y',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          willChange: 'transform',
          padding: '20px 0',
        }}
      >
        {CAROUSEL_CARDS.map((card, i) => {
          const isDark   = card.type === 'dark';
          const isAccent = card.type === 'accent';

          const bg     = isDark ? '#141414' : isAccent ? '#D6FD70' : '#ffffff';
          const border = isDark ? '2px solid #3a3a3a' : isAccent ? '2px solid #b8e050' : '2px solid #d4d4d4';
          const shadow = isDark
            ? '0 2px 12px rgba(0,0,0,0.5), 0 0 0 1px #2e2e2e'
            : '0 2px 12px rgba(0,0,0,0.08)';

          const titleC = isDark ? '#f0f0f0' : '#0a0a0a';
          const subC   = isDark ? '#888888' : 'rgba(0,0,0,0.50)';

          return (
            <div
              key={i}
              style={{ flex: '0 0 168px', padding: '0 10px', boxSizing: 'border-box' }}
            >
              <div
                style={{
                  width: 148,
                  height: 148,
                  borderRadius: 16,
                  padding: 13,
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: bg,
                  border,
                  boxShadow: shadow,
                }}
              >
                <p style={{
                  margin: '0 0 6px',
                  fontSize: 14,
                  fontWeight: 700,
                  color: titleC,
                  lineHeight: 1.25,
                  textAlign: 'center',
                }}>
                  {card.title}
                </p>
                <p style={{
                  margin: 0,
                  fontSize: 11,
                  fontWeight: 400,
                  color: subC,
                  lineHeight: 1.4,
                  textAlign: 'center',
                }}>
                  {card.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Desktop 3D Orbit Carousel ────────────────────────────────────────────────

function DesktopOrbit() {
  const hubRef      = useRef<HTMLDivElement>(null);
  const cardRefsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef      = useRef<number | null>(null);

  const ANGLE_PER  = 360 / ORBIT_CARDS.length;
  const RADIUS     = 400;
  const ENTER_DUR  = 900;

  useEffect(() => {
    let rotation   = 0;
    let enterStart: number | null = null;

    const orbitLoop = (ts: number) => {
      if (!enterStart) enterStart = ts;
      const prog  = Math.min((ts - enterStart) / ENTER_DUR, 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      rotation -= 0.12;

      if (hubRef.current) {
        hubRef.current.style.transform =
          `translateY(25px) rotateX(12deg) rotateY(${rotation}deg) scale(${eased})`;
      }

      const rotMod = rotation % 360;
      cardRefsRef.current.forEach((el, i) => {
        if (!el) return;
        const ang  = i * ANGLE_PER;
        const rel  = (ang + rotMod + 360) % 360;
        const norm = rel > 180 ? 360 - rel : rel;
        const opacity = norm > 90 ? 0 : Math.pow(1 - norm / 90, 1.5) * eased;
        el.style.transform = `rotateY(${ang}deg) translateZ(${RADIUS * eased}px)`;
        el.style.opacity   = String(opacity);
      });

      rafRef.current = requestAnimationFrame(orbitLoop);
    };

    rafRef.current = requestAnimationFrame(orbitLoop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div style={{
      width: '100%',
      height: 320,
      perspective: 1100,
      perspectiveOrigin: '50% 40%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'visible',
    }}>
      <div
        ref={hubRef}
        style={{
          position: 'relative',
          width: 0,
          height: 0,
          transformStyle: 'preserve-3d',
        }}
      >
        {ORBIT_CARDS.map((card, i) => {
          const isDark   = card.type === 'dark';
          const isAccent = card.type === 'accent';

          const bg     = isDark ? '#141414' : isAccent ? '#D6FD70' : '#ffffff';
          const border = isDark ? '2px solid #3a3a3a' : isAccent ? '2px solid #b8e050' : '2px solid #d4d4d4';
          const shadow = isDark
            ? '0 2px 12px rgba(0,0,0,0.5), 0 0 0 1px #2e2e2e'
            : '0 2px 12px rgba(0,0,0,0.10)';

          const titleC = isDark ? '#f0f0f0' : '#0a0a0a';
          const subC   = isDark ? '#888888' : 'rgba(0,0,0,0.48)';

          return (
            <div
              key={i}
              ref={(el) => { cardRefsRef.current[i] = el; }}
              style={{
                position: 'absolute',
                width: 130,
                height: 130,
                left: -65,
                top: -65,
                opacity: 0,
              }}
            >
              <div style={{
                width: 130,
                height: 130,
                boxSizing: 'border-box',
                background: bg,
                border,
                borderRadius: 16,
                padding: 12,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: shadow,
              }}>
                <p style={{
                  margin: '0 0 5px',
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: titleC,
                  lineHeight: 1.2,
                  textAlign: 'center',
                }}>
                  {card.title}
                </p>
                <p style={{
                  margin: 0,
                  fontSize: 10,
                  fontWeight: 400,
                  color: subC,
                  textAlign: 'center',
                }}>
                  {card.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────

export default function CardOrbitCarousel() {
  const [{ isMobile, mounted }, setLayout] = useState<{
    isMobile: boolean;
    mounted: boolean;
  }>({ isMobile: false, mounted: false });

  useLayoutEffect(() => {
    const check = () =>
      setLayout({ isMobile: window.innerWidth < 768, mounted: true });

    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!mounted) return null;

  return isMobile ? <MobileCarousel /> : <DesktopOrbit />;
}