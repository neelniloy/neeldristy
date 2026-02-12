
import React, { useEffect, useState, useRef } from 'react';
import { WIFE_NAME, HUSBAND_NAME } from '../constants';

interface LetterPart {
  text: string;
  type: 'header' | 'paragraph' | 'signature';
}

const LETTER_PARTS: LetterPart[] = [
  { text: `My Dearest Dristy,`, type: 'header' },
  { 
    text: "As I sit here and reflect on our story, I am moved by how perfectly our souls have aligned. From those first digital 'Hellos' on September 1st, 2020, we took a leap of faith that transformed my entire world.", 
    type: 'paragraph' 
  },
  { 
    text: "I'll never forget the magic of July 16th, 2021—the day the distance finally dissolved and I got to look into your eyes for the very first time. That moment defined my life and made every second of anticipation worthwhile.", 
    type: 'paragraph' 
  },
  { 
    text: "Years of growing together, sharing our deepest dreams through screens and calls, led us to December 5th, 2025. Now, we finally have our forever. You are no longer just a thought or a wish; you are my reality, my home, and my heart.", 
    type: 'paragraph' 
  },
  { 
    text: "Thank you for choosing me, for staying by me, and for being the most incredible partner. I promise to cherish you, laugh with you, and love you with everything I have for all the days of my life.", 
    type: 'paragraph' 
  },
  { text: `With all my heart, ${HUSBAND_NAME}`, type: 'signature' }
];

export const HeartfeltLetter: React.FC = () => {
  const [displayedParts, setDisplayedParts] = useState<string[]>(Array(LETTER_PARTS.length).fill(""));
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isStarted || currentPartIndex >= LETTER_PARTS.length) return;

    const currentFullText = LETTER_PARTS[currentPartIndex].text;

    if (currentCharIndex < currentFullText.length) {
      const char = currentFullText[currentCharIndex];
      let delay = 35 + Math.random() * 25;
      
      if (char === '.' || char === ',' || char === '—') delay += 200;
      if (char === ' ') delay -= 5;

      const timer = setTimeout(() => {
        setDisplayedParts(prev => {
          const next = [...prev];
          next[currentPartIndex] = currentFullText.substring(0, currentCharIndex + 1);
          return next;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      const pauseTimer = setTimeout(() => {
        setCurrentPartIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 800);
      return () => clearTimeout(pauseTimer);
    }
  }, [isStarted, currentPartIndex, currentCharIndex]);

  return (
    <div id="letter-section" ref={containerRef} className="max-w-3xl mx-auto py-20 px-6 min-h-[700px] glass-card rounded-[3rem] shadow-sm border border-rose-50/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 text-6xl">✉️</div>
      <div className="space-y-10 relative z-10">
        {LETTER_PARTS.map((part, index) => {
          const isCurrentlyTyping = index === currentPartIndex && isStarted && currentPartIndex < LETTER_PARTS.length;
          const text = displayedParts[index];

          if (!text && !isCurrentlyTyping) return null;

          if (part.type === 'header') {
            return (
              <h2 key={index} className="font-serif text-3xl md:text-4xl text-[#6D4C41] mb-12 text-center italic">
                {text}
                {isCurrentlyTyping && <span className="cursor-blink" />}
              </h2>
            );
          }

          if (part.type === 'signature') {
            return (
              <p key={index} className="font-script text-4xl md:text-5xl text-rose-500 mt-16 text-center drop-shadow-sm">
                {text}
                {isCurrentlyTyping && <span className="cursor-blink" />}
              </p>
            );
          }

          return (
            <p key={index} className="text-[#4A3737] leading-[2.2] text-xl font-light text-center sm:text-left italic">
              {text}
              {isCurrentlyTyping && <span className="cursor-blink" />}
            </p>
          );
        })}
      </div>
    </div>
  );
};
