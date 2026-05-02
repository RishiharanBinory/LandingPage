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

export default function CardOrbitCarousel() {
  const [rotation, setRotation] = useState(0);
  const [screenW, setScreenW] = useState(768);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => setScreenW(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const autoRotate = () => {
      setRotation(prev => prev - 0.12);
      animationFrameRef.current = requestAnimationFrame(autoRotate);
    };
    animationFrameRef.current = requestAnimationFrame(autoRotate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const isMobile = screenW < 480;
  const isTablet = screenW >= 480 && screenW < 768;

  const RADIUS      = isMobile ? 115  : isTablet ? 200  : 360;
  const CARD_SIZE   = isMobile ? 72   : isTablet ? 88   : 100;
  const translateY  = isMobile ? 30   : isTablet ? 50   : 25;  // ← changed desktop from 70 → 25
  const rotateX     = isMobile ? 8    : isTablet ? 10   : 12;
  const perspective = isMobile ? 500  : isTablet ? 800  : 1200;
  const containerH  = isMobile ? 200  : isTablet ? 260  : 320;
  const titleSize   = isMobile ? '9px' : isTablet ? '10px' : '11px';
  const subSize     = isMobile ? '7px' : isTablet ? '8px'  : '9px';
  const tagSize     = '7px';
  const padding     = isMobile ? '7px' : isTablet ? '8px'  : '10px';
  const borderRad   = '14px';

  const anglePerItem = 360 / CARDS.length;

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
        style={{
          position: 'relative',
          width: '0px',
          height: '0px',
          transformStyle: 'preserve-3d',
          transform: `translateY(${translateY}px) rotateX(${rotateX}deg) rotateY(${rotation}deg)`,
        }}
      >
        {CARDS.map((card, i) => {
          const itemAngle = i * anglePerItem;
          const totalRotation = rotation % 360;
          const relativeAngle = (itemAngle + totalRotation + 360) % 360;
          const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
          const opacity = Math.max(0.15, 1 - normalizedAngle / 160);

          const isDark   = card.type === 'dark';
          const isAccent = card.type === 'accent';

          const bg      = isDark ? '#0f0f0f' : isAccent ? '#D6FD70' : '#ffffff';
          const border  = isDark ? 'rgba(214,253,112,0.25)' : isAccent ? 'rgba(0,0,0,0.12)' : 'rgba(180,180,180,0.5)';
          const titleC  = isDark ? '#ffffff' : '#0a0a0a';
          const subC    = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)';

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: `${CARD_SIZE}px`,
                height: `${CARD_SIZE}px`,
                left: `${-CARD_SIZE / 2}px`,
                top: `${-CARD_SIZE / 2}px`,
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
                  borderRadius: borderRad,
                  padding,
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isDark
                    ? '0 6px 24px rgba(0,0,0,0.5)'
                    : '0 6px 24px rgba(0,0,0,0.07)',
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
                  <p style={{ margin: 0, fontSize: titleSize, fontWeight: 600, color: titleC, lineHeight: 1.2, marginBottom: '2px' }}>
                    {card.title}
                  </p>
                  <p style={{ margin: 0, fontSize: subSize, color: subC, fontWeight: 400 }}>
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