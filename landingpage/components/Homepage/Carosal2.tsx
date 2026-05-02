"use client";

import React, { useState, useEffect, useRef } from 'react';

const CARDS = [
  { title: "Tuition Fee Loan",  sub: "Up to £9,250/year",   tag: "Most Popular",  type: "light"  },
  { title: "Maintenance Loan",  sub: "Up to £13,348/year",  tag: "Paid to You",   type: "dark"   },
  { title: "No Certificates?",  sub: "Still may qualify",   tag: "Don't worry",   type: "light"  },
  { title: "Non-UK Study?",     sub: "Covered in 60s",      tag: "We check this", type: "accent" },
  { title: "Free Check",        sub: "No obligation",       tag: "Zero cost",     type: "dark"   },
  { title: "Fast Result",       sub: "Takes 60 seconds",    tag: "Instant",       type: "light"  },
  { title: "£9,000+",           sub: "Average award",       tag: "Funding",       type: "accent" },
  { title: "Qualify Today",     sub: "Start your check",    tag: "Apply Now",     type: "light"  },
  { title: "Tuition Fee Loan",  sub: "Up to £9,250/year",   tag: "Most Popular",  type: "dark"   },
  { title: "Maintenance Loan",  sub: "Up to £13,348/year",  tag: "Paid to You",   type: "accent" },
  { title: "Free Check",        sub: "No obligation",       tag: "Zero cost",     type: "light"  },
  { title: "Fast Result",       sub: "Takes 60 seconds",    tag: "Instant",       type: "dark"   },
];

// ✅ Bigger radius = more gap between cards
const RADIUS = 480;
const AUTO_ROTATE_SPEED = 0.12;

// ✅ Card dimensions — shorter height, less empty space
const CARD_W = 150;
const CARD_H = 160;

export default function CardOrbitCarousel() {
  const [rotation, setRotation] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      setRotation(scrollProgress * 360);
      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const autoRotate = () => {
      if (!isScrolling) {
        setRotation(prev => prev + AUTO_ROTATE_SPEED);
      }
      animationFrameRef.current = requestAnimationFrame(autoRotate);
    };
    animationFrameRef.current = requestAnimationFrame(autoRotate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isScrolling]);

  const anglePerItem = 360 / CARDS.length;

  return (
    <div
      style={{
        width: '100%',
        height: '380px',
        perspective: '1200px',
        perspectiveOrigin: '50% 30%', // ✅ shifted up so carousel appears lower
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '0px',
          height: '0px',
          transformStyle: 'preserve-3d',
          // ✅ translateY pushes the whole carousel down visually
          transform: `translateY(80px) rotateX(12deg) rotateY(${rotation}deg)`,
        }}
      >
        {CARDS.map((card, i) => {
          const itemAngle = i * anglePerItem;
          const totalRotation = rotation % 360;
          const relativeAngle = (itemAngle + totalRotation + 360) % 360;
          const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
          const opacity = Math.max(0.2, 1 - normalizedAngle / 160);

          const isDark   = card.type === 'dark';
          const isAccent = card.type === 'accent';

          const bg     = isDark ? '#0f0f0f' : isAccent ? '#D6FD70' : '#ffffff';
          const border  = isDark ? 'rgba(214,253,112,0.25)' : isAccent ? 'rgba(0,0,0,0.12)' : 'rgba(180,180,180,0.5)';
          const titleC  = isDark ? '#ffffff' : '#0a0a0a';
          const subC    = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)';

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: `${CARD_W}px`,
                height: `${CARD_H}px`,
                left: `${-CARD_W / 2}px`,
                top: `${-CARD_H / 2}px`,
                transform: `rotateY(${itemAngle}deg) translateZ(${RADIUS}px)`,
                opacity,
                transition: 'opacity 0.3s linear',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: bg,
                  border: `1px solid ${border}`,
                  borderRadius: '14px',
                  padding: '12px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isDark
                    ? '0 8px 32px rgba(0,0,0,0.5)'
                    : '0 8px 32px rgba(0,0,0,0.08)',
                }}
              >
                {/* Tag pill */}
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      background: '#D6FD70',
                      color: '#0a0a0a',
                      fontSize: '8px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '20px',
                      letterSpacing: '0.03em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {card.tag}
                  </span>
                </div>

                {/* Bottom text */}
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '15px',
                      fontWeight: 600,
                      color: titleC,
                      lineHeight: 1.2,
                      marginBottom: '4px',
                    }}
                  >
                    {card.title}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '11px',
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