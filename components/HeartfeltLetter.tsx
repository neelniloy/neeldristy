
import React, { useEffect, useState, useRef } from 'react';
import { WIFE_NAME, HUSBAND_NAME } from '../constants';

interface LetterPart {
  text: string;
  type: 'header' | 'paragraph' | 'signature';
}

const LETTER_PARTS: LetterPart[] = [
  { text: `My Dearest Wife ${WIFE_NAME},`, type: 'header' },
  { 
    text: "From our first 'Hello' in 2020 to the magic of finally meeting in 2021, my world has been transformed by you.", 
    type: 'paragraph' 
  },
  { 
    text: "Years of growing together led us to our forever on December 5th, 2025. You are my reality, my home, and my heart.", 
    type: 'paragraph' 
  },
  { 
    text: "Thank you for choosing me. I promise to cherish and love you with everything I have.", 
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
      // Even faster base delay
      let delay = 10 + Math.random() * 10;
      
      // Minimal punctuation pauses for "slight fast" effect
      if (char === '.' || char === ',' || char === '—') delay += 50;
      if (char === ' ') delay -= 2;

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
      // Faster transition between paragraphs
      const pauseTimer = setTimeout(() => {
        setCurrentPartIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 300);
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
