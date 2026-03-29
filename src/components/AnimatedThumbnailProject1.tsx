'use client';
import { useState, useEffect, useRef } from 'react';

const BASE = '/Project%201/ProjectBento/projectbento-1';

// 10 image slots — positions as % of 1800×1200 canvas
// diag order sorts by (left + top) ascending for staggered entrance
const IMAGES = [
  // ID  left%   top%   w%     h%     delay  src
  { left: -2.00, top: 29.50, w: 12.11, h: 18.17, delay:   0, src: `${BASE}/123.jpg`  }, // I
  { left: 11.22, top: 18.00, w: 19.78, h: 29.67, delay:  80, src: `${BASE}/22.jpg`   }, // A
  { left: -5.83, top: 50.42, w: 14.39, h: 21.58, delay: 160, src: `${BASE}/241.jpg`  }, // J
  { left: 31.78, top: 15.92, w: 21.11, h: 31.75, delay: 240, src: `${BASE}/4328.jpg` }, // B
  { left:  9.56, top: 50.42, w: 25.89, h: 38.83, delay: 320, src: `${BASE}/9783.jpg` }, // F
  { left: 53.67, top:  6.50, w: 27.56, h: 41.17, delay: 400, src: `${BASE}/123.jpg`  }, // C
  { left: 36.44, top: 50.42, w: 22.00, h: 32.92, delay: 480, src: `${BASE}/22.jpg`   }, // D
  { left: 82.00, top: 11.92, w: 35.72, h: 35.75, delay: 560, src: `${BASE}/241.jpg`  }, // G
  { left: 59.44, top: 50.42, w: 27.33, h: 27.33, delay: 640, src: `${BASE}/4328.jpg` }, // E
  { left: 87.78, top: 50.42, w: 12.89, h: 19.33, delay: 720, src: `${BASE}/9783.jpg` }, // H
];

export default function AnimatedThumbnailProject1() {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0 }
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const handleHover = (i: number) => {
    const el = imgRefs.current[i];
    if (!el) return;
    el.style.animation = 'none';
    void el.offsetHeight;
    el.style.animation = 'softRise 400ms ease-out forwards';
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: '#BEBCE3',
      }}
    >
      {IMAGES.map((img, i) => (
        <div
          key={i}
          ref={el => { imgRefs.current[i] = el; }}
          onMouseEnter={() => handleHover(i)}
          style={{
            position: 'absolute',
            left: `${img.left}%`,
            top: `${img.top}%`,
            width: `${img.w}%`,
            height: `${img.h}%`,
            backgroundImage: `url('${img.src}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '3%',
            opacity: 0,
            animation: visible
              ? `softRise 3s ease-out ${img.delay}ms forwards`
              : 'none',
          }}
        />
      ))}
    </div>
  );
}
