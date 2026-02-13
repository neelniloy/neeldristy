
import React, { useEffect, useState } from 'react';
import { WIFE_NAME } from '../constants';

export const Hero: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: string; duration: string; delay: string }[]>([]);
  const [petals, setPetals] = useState<{ id: number; left: string; size: string; duration: string; delay: string; color: string }[]>([]);

  useEffect(() => {
    const heartItems = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * (30 - 15) + 15}px`,
      duration: `${Math.random() * (12 - 6) + 6}s`,
      delay: `${(Math.random() * 15) - 15}s`,
    }));
    
    const petalItems = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * (24 - 10) + 10}px`,
      duration: `${Math.random() * (10 - 5) + 5}s`,
      delay: `${(Math.random() * 15) - 15}s`,
      color: Math.random() > 0.5 ? '#fda4af' : '#fb7185'
    }));

    setHearts(heartItems);
    setPetals(petalItems);
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFF0F5] via-[#FFF9F9] to-[#FFE4E1]">
      {hearts.map((h) => (
        <div
          key={`heart-${h.id}`}
          className="floating-heart text-rose-300/40"
          style={{
            '--left': h.left,
            '--size': h.size,
            '--duration': h.duration,
            animationDelay: h.delay,
          } as any}
        >
          ❤
        </div>
      ))}

      {petals.map((p) => (
        <div
          key={`petal-${p.id}`}
          className="petal"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            '--duration': p.duration,
            animationDelay: p.delay,
            backgroundColor: p.color,
            opacity: 0.35
          } as any}
        />
      ))}

      <div className="z-10 text-center px-6 animate-fade-in">
        <div className="mb-6 inline-block px-6 py-2 rounded-full border border-rose-200 text-rose-500 text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold bg-white/70 backdrop-blur-md shadow-sm">
          💝 Happy Valentine's Day, My Dear Wife {WIFE_NAME} 💝
        </div>
        <h1 className="font-serif text-5xl md:text-8xl text-[#6D4C41] mb-6 leading-tight drop-shadow-xl">
          Our Story
        </h1>
        <p className="font-script text-2xl md:text-4xl text-rose-500 mb-10 max-w-2xl mx-auto italic drop-shadow-md">
          A five-year journey to forever...
        </p>
        <div className="flex items-center justify-center gap-6 mb-10">
          <div className="h-px w-16 bg-rose-200"></div>
          <div className="text-rose-400 text-2xl animate-pulse">❤</div>
          <div className="h-px w-16 bg-rose-200"></div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center opacity-70 cursor-pointer" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#8D6E63] mb-3 font-black">Our Memories</span>
        <svg 
          className="w-6 h-6 text-rose-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};
