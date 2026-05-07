"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

const BASE_CARDS = [
  { title: "Tuition Fee Loan",  sub: "Up to £9,250/year",   tag: "Most Popular",  type: "light"  },
  { title: "Maintenance Loan",  sub: "Up to £13,348/year",  tag: "Paid to You",   type: "dark"   },
  { title: "No Certificates?",  sub: "Still may qualify",   tag: "Don't worry",   type: "light"  },
  { title: "Non-UK Study?",     sub: "Covered in 60s",      tag: "We check this", type: "accent" },
  { title: "Free Check",        sub: "No obligation",       tag: "Zero cost",     type: "dark"   },
  { title: "Fast Result",       sub: "Takes 60 seconds",    tag: "Instant",       type: "light"  },
  { title: "£9,000+",           sub: "Average award",       tag: "Funding",       type: "accent" },
  { title: "Qualify Today",     sub: "Start your check",    tag: "Apply Now",     type: "light"  },
];

const CARDS = [...BASE_CARDS, ...BASE_CARDS];

export default function CardOrbitCarousel() {
  const [screenW, setScreenW] = useState<number>(768);

  const rotationRef     = useRef<number>(0);
  const enterScaleRef   = useRef<number>(0);
  const enterRadiusRef  = useRef<number>(0);
  const enterStartRef   = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hubRef          = useRef<HTMLDivElement | null>(null);
  const cardRefsRef     = useRef<(HTMLDivElement | null)[]>([]);

  const ENTER_DURATION = 900;

  // Sync screen width without triggering cascading renders
  useLayoutEffect(() => {
    const update = () => setScreenW(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Single rAF loop: enter animation + auto-rotate
  useEffect(() => {
    const isMobile = screenW < 480;
    const isTablet = screenW >= 480 && screenW < 768;

    const BASE_RADIUS  = isMobile ? 115 : isTablet ? 200 : 400;
    const translateY   = isMobile ? 30  : isTablet ? 50  : 25;
    const rotateX      = isMobile ? 8   : isTablet ? 10  : 12;
    const ANGLE_PER    = 360 / CARDS.length;

    // Reset enter animation when screenW changes
    enterStartRef.current  = null;
    enterScaleRef.current  = 0;
    enterRadiusRef.current = 0;

    const tick = (timestamp: number) => {
      if (enterStartRef.current === null) {
        enterStartRef.current = timestamp;
      }

      const elapsed  = timestamp - enterStartRef.current;
      const progress = Math.min(elapsed / ENTER_DURATION, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      enterScaleRef.current  = eased;
      enterRadiusRef.current = eased;

      rotationRef.current -= 0.12;

      const RADIUS  = BASE_RADIUS * enterRadiusRef.current;
      const rotMod  = rotationRef.current % 360;

      if (hubRef.current) {
        hubRef.current.style.transform =
          `translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotationRef.current}deg) scale(${enterScaleRef.current})`;
      }

      cardRefsRef.current.forEach((el, i) => {
        if (!el) return;
        const itemAngle = i * ANGLE_PER;
        const rel       = (itemAngle + rotMod + 360) % 360;
        const norm      = rel > 180 ? 360 - rel : rel;
        const opacity   =
          norm > 90
            ? 0
            : Math.pow(1 - norm / 90, 1.5) * enterScaleRef.current;

        el.style.transform = `rotateY(${itemAngle}deg) translateZ(${RADIUS}px)`;
        el.style.opacity   = String(opacity);
      });

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [screenW]);

  const isMobile = screenW < 480;
  const isTablet = screenW >= 480 && screenW < 768;

  const CARD_SIZE   = isMobile ? 72  : isTablet ? 88  : 130;
  const perspective = isMobile ? 500 : isTablet ? 800 : 1200;
  const containerH  = isMobile ? 200 : isTablet ? 260 : 320;
  const titleSize   = isMobile ? '9px'  : isTablet ? '10px' : '13px';
  const subSize     = isMobile ? '7px'  : isTablet ? '8px'  : '10px';
  const tagSize     = isMobile ? '6px'  : '7px';
  const padding     = isMobile ? '7px'  : isTablet ? '8px'  : '12px';
  const borderRad   = '14px';

  return (
    <div
      style={{
        width: '100%',
        height: `${containerH}px`,
        perspective: `${perspective}px`,
        perspectiveOrigin: '50% 30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
      }}
    >
      <div
        ref={hubRef}
        style={{
          position: 'relative',
          width: '0px',
          height: '0px',
          transformStyle: 'preserve-3d',
        }}
      >
        {CARDS.map((card, i) => {
          const isDark   = card.type === 'dark';
          const isAccent = card.type === 'accent';

          const bg     = isDark ? '#0f0f0f' : isAccent ? '#D6FD70' : '#ffffff';
          const border = isDark
            ? 'rgba(214,253,112,0.25)'
            : isAccent
            ? 'rgba(0,0,0,0.12)'
            : 'rgba(180,180,180,0.5)';
          const titleC = isDark ? '#ffffff' : '#0a0a0a';
          const subC   = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)';

          return (
            <div
              key={i}
              ref={(el) => { cardRefsRef.current[i] = el; }}
              style={{
                position: 'absolute',
                width: `${CARD_SIZE}px`,
                height: `${CARD_SIZE}px`,
                left: `${-CARD_SIZE / 2}px`,
                top: `${-CARD_SIZE / 2}px`,
                opacity: 0,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: bg,
                  border: `1px solid ${border}`,
                  borderRadius: borderRad,
                  padding,
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isDark
                    ? '0 6px 24px rgba(0,0,0,0.5)'
                    : '0 6px 24px rgba(0,0,0,0.10)',
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      background: '#D6FD70',
                      color: '#0a0a0a',
                      fontSize: tagSize,
                      fontWeight: 700,
                      padding: '2px 5px',
                      borderRadius: '20px',
                      letterSpacing: '0.03em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {card.tag}
                  </span>
                </div>

                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: titleSize,
                      fontWeight: 600,
                      color: titleC,
                      lineHeight: 1.2,
                      marginBottom: '3px',
                    }}
                  >
                    {card.title}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: subSize,
                      color: subC,
                      fontWeight: 400,
                    }}
                  >
                    {card.sub}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}