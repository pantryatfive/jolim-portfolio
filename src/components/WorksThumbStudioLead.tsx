'use client';
import { useEffect, useRef, useState } from 'react';

// 7% bigger than original sizes
const ICON_SIZE   = 47;  // 44 × 1.07
const COMBO_SIZE  = 51;  // 48 × 1.07
const PAD_Y       = 15;  // 14 × 1.07
const PAD_X       = 24;  // 22 × 1.07
const MIN_W       = 128; // 120 × 1.07
const MIN_H       = 77;  // 72 × 1.07

export default function WorksThumbStudioLead() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef    = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [dockIn,    setDockIn]    = useState(false);
  const [icon1In,   setIcon1In]   = useState(false);
  const [icon2In,   setIcon2In]   = useState(false);
  const [merging,   setMerging]   = useState(false);
  const [combined,  setCombined]  = useState(false);
  const [expanded,  setExpanded]  = useState(false);

  const clearTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };

  const reset = () => {
    setDockIn(false); setIcon1In(false); setIcon2In(false);
    setMerging(false); setCombined(false); setExpanded(false);
  };

  const play = () => {
    clearTimers();
    reset();
    timersRef.current = [
      setTimeout(() => setDockIn(true),   160),
      setTimeout(() => setIcon1In(true),  560),
      setTimeout(() => setIcon2In(true),  840),
      setTimeout(() => setMerging(true),  2700),
      setTimeout(() => setCombined(true), 3250),
      setTimeout(() => setExpanded(true), 3750),
    ];
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { play(); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => { obs.disconnect(); clearTimers(); };
  }, []);

  // Per-icon styles
  const icon1Style: React.CSSProperties = merging ? {
    opacity: 0,
    transform: 'translateX(18px) scale(0.45)',
    transition: 'opacity 0.32s ease-in, transform 0.32s ease-in',
  } : icon1In ? {
    opacity: 1,
    transform: 'translateY(0) scale(1)',
    transition: 'opacity 0.4s ease-out, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
  } : {
    opacity: 0,
    transform: 'translateY(8px) scale(0.82)',
    transition: 'none',
  };

  const icon2Style: React.CSSProperties = merging ? {
    opacity: 0,
    transform: 'translateX(-18px) scale(0.45)',
    transition: 'opacity 0.32s ease-in, transform 0.32s ease-in',
  } : icon2In ? {
    opacity: 1,
    transform: 'translateY(0) scale(1)',
    transition: 'opacity 0.4s ease-out 0.08s, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) 0.08s',
  } : {
    opacity: 0,
    transform: 'translateY(8px) scale(0.82)',
    transition: 'none',
  };

  const combinedStyle: React.CSSProperties = combined ? {
    opacity: 1,
    transform: 'scale(1)',
    transition: 'opacity 0.3s ease-out, transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)',
  } : {
    opacity: 0,
    transform: 'scale(0.15)',
    transition: 'none',
  };

  return (
    <div
      ref={containerRef}
      style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseEnter={play}
    >
      {/* Entrance wrapper */}
      <div style={{
        opacity: dockIn ? 1 : 0,
        transform: dockIn ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
        transition: 'opacity 0.5s ease-out, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Dock — scaleY expands when combined icon settles */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${PAD_Y}px ${PAD_X}px`,
          background: 'rgba(255,255,255,0.16)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 28,
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.25)',
          position: 'relative',
          minWidth: MIN_W,
          minHeight: MIN_H,
          transformOrigin: 'center bottom',
          transform: expanded ? 'scaleY(1.030)' : 'scaleY(1)',
          transition: 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}>

          {/* Two icons */}
          <div style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            pointerEvents: 'none',
          }}>
            <img src="/emoji/joystick.png"   alt="" width={ICON_SIZE} height={ICON_SIZE} style={{ display: 'block', ...icon1Style }} />
            <img src="/emoji/paintbrush.png" alt="" width={ICON_SIZE} height={ICON_SIZE} style={{ display: 'block', ...icon2Style }} />
          </div>

          {/* Combined icon */}
          <img
            src="/emoji/man-laptop.png"
            alt=""
            width={COMBO_SIZE}
            height={COMBO_SIZE}
            style={{ display: 'block', ...combinedStyle }}
          />

        </div>
      </div>
    </div>
  );
}
