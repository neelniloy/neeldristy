
import React, { useState, useEffect } from 'react';

export const ValentineBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);
  const [isValentinesDay, setIsValentinesDay] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      
      // Valentine's Day: Feb 14
      const valentinesStart = new Date(year, 1, 14, 0, 0, 0); // Feb 14 midnight
      const valentinesEnd = new Date(year, 1, 14, 23, 59, 59); // Feb 14 end of day
      
      if (now >= valentinesStart && now <= valentinesEnd) {
        // It's Valentine's Day!
        setIsValentinesDay(true);
        setTimeLeft(null);
      } else if (now < valentinesStart) {
        // Counting down to Valentine's Day
        setIsValentinesDay(false);
        const diff = valentinesStart.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        // Valentine's Day has passed
        setIsValentinesDay(false);
        setTimeLeft(null);
        setIsVisible(false);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] animate-fade-in">
      <div className={`text-center py-2.5 px-4 backdrop-blur-md border-b shadow-sm ${
        isValentinesDay 
          ? 'bg-gradient-to-r from-rose-500/90 via-pink-500/90 to-rose-500/90 border-rose-400/30 text-white' 
          : 'bg-white/80 border-rose-100 text-[#6D4C41]'
      }`}>
        <div className="flex items-center justify-center gap-3 text-sm">
          {isValentinesDay ? (
            <>
              <span className="animate-pulse">💝</span>
              <span className="font-serif italic text-base">
                Happy Valentine's Day, my love!
              </span>
              <span className="animate-pulse">💝</span>
            </>
          ) : timeLeft ? (
            <>
              <span>💝</span>
              <span className="font-light">
                Valentine's Day in{' '}
                <span className="font-bold font-mono text-rose-500">
                  {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </span>
              <span>💝</span>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
