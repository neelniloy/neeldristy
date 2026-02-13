import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [heartPos, setHeartPos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseRef = useRef({ x: 0, y: 0 });
  const heartRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
    };

    const animateHeart = () => {
      // Linear interpolation (LERP) for smooth lagging effect
      const lerpFactor = 0.15;
      heartRef.current.x += (mouseRef.current.x - heartRef.current.x) * lerpFactor;
      heartRef.current.y += (mouseRef.current.y - heartRef.current.y) * lerpFactor;
      
      setHeartPos({ x: heartRef.current.x, y: heartRef.current.y });
      requestRef.current = requestAnimationFrame(animateHeart);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    requestRef.current = requestAnimationFrame(animateHeart);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-rose-500 rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
          transition: 'transform 0.05s linear',
        }}
      />
      
      {/* Inertial Heart Outline */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          transform: `translate(${heartPos.x}px, ${heartPos.y}px) translate(-50%, -50%) scale(${isPointer ? 1.4 : 1})`,
          transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-rose-400 opacity-60"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      {/* Subtle outer glow that follows the heart */}
      <div
        className="fixed top-0 left-0 w-8 h-8 bg-rose-200/20 rounded-full blur-xl pointer-events-none z-[9998]"
        style={{
          transform: `translate(${heartPos.x}px, ${heartPos.y}px) translate(-50%, -50%)`,
        }}
      />
    </>
  );
};

