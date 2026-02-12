
import React, { useState, useCallback, useEffect, useRef } from 'react';

interface ProposalCardProps {
  onAccept: () => void;
}

interface RainHeart {
  id: number;
  left: string;
  size: string;
  duration: string;
  opacity: number;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ onAccept }) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [isAccepted, setIsAccepted] = useState(false);
  const [heartRain, setHeartRain] = useState<RainHeart[]>([]);
  const rainIntervalRef = useRef<number | null>(null);

  const startHeartRain = () => {
    // Spawn hearts every 100ms
    let heartCount = 0;
    rainIntervalRef.current = window.setInterval(() => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: `${Math.random() * 100}vw`,
        size: `${Math.random() * 30 + 25}px`, // Larger hearts
        duration: `${Math.random() * 2 + 3}s`,
        opacity: Math.random() * 0.4 + 0.6
      };
      
      setHeartRain(prev => [...prev.slice(-100), newHeart]);
      heartCount++;

      // Stop spawning after ~10 seconds
      if (heartCount > 100) {
        if (rainIntervalRef.current) clearInterval(rainIntervalRef.current);
      }
    }, 100);

    // Completely clear rain after animations finish (15 seconds total)
    setTimeout(() => {
      setHeartRain([]);
    }, 15000);
  };

  const handleDodge = useCallback(() => {
    const minJump = 120;
    const maxJump = 250;
    
    let newX = (Math.random() - 0.5) * maxJump * 2;
    let newY = (Math.random() - 0.5) * maxJump * 2;

    if (Math.abs(newX - noButtonPosition.x) < minJump) newX += (newX > 0 ? minJump : -minJump);
    if (Math.abs(newY - noButtonPosition.y) < minJump) newY += (newY > 0 ? minJump : -minJump);
    
    setNoButtonPosition({ x: newX, y: newY });
  }, [noButtonPosition]);

  const handleYesClick = () => {
    setIsAccepted(true);
    startHeartRain();
    onAccept();
  };

  useEffect(() => {
    return () => {
      if (rainIntervalRef.current) clearInterval(rainIntervalRef.current);
    };
  }, []);

  return (
    <div className="relative">
      {/* Heart Rain Container - Forced Visibility */}
      {heartRain.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
          {heartRain.map((h) => (
            <div
              key={h.id}
              className="absolute text-rose-500 drop-shadow-md"
              style={{
                left: h.left,
                fontSize: h.size,
                top: '-60px',
                opacity: h.opacity,
                animation: `heart-rain ${h.duration} linear forwards`,
              } as any}
            >
              ❤️
            </div>
          ))}
        </div>
      )}

      <div 
        className="max-w-2xl mx-auto glass-card rounded-[4rem] p-12 md:p-20 shadow-2xl text-center relative overflow-visible border border-white/60 z-10"
      >
        {isAccepted ? (
          <div className="animate-fade-in py-16">
            <div className="text-8xl mb-8 animate-bounce">💖</div>
            <h2 className="font-serif text-5xl text-rose-500 mb-6 italic">I Knew You'd Say Yes!</h2>
            <p className="text-[#8D6E63] text-xl font-light">Mithila, my life is complete with you...</p>
          </div>
        ) : (
          <>
            <div className="text-7xl mb-10 animate-pulse drop-shadow-xl">💍</div>
            <h2 className="font-serif text-3xl md:text-5xl text-[#6D4C41] mb-12 px-4 leading-tight italic">
              Will you be mine — today, tomorrow, and forever?
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-10 min-h-[140px] relative">
              <button
                onClick={handleYesClick}
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold px-16 py-5 rounded-full shadow-[0_15px_30px_rgba(244,63,94,0.4)] transition-all hover:scale-110 active:scale-95 z-40 text-xl relative"
              >
                Yes 🥰
              </button>
              
              <button
                onMouseEnter={handleDodge}
                onClick={handleDodge}
                onTouchStart={handleDodge}
                style={{
                  transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                  transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                className="bg-white/40 border border-rose-100/50 text-gray-400 font-medium px-12 py-5 rounded-full transition-colors z-30 whitespace-nowrap shadow-sm backdrop-blur-sm"
              >
                No 😅
              </button>
            </div>

            <p className="mt-16 text-[#BCAAA4] text-[11px] uppercase tracking-[0.5em] font-black opacity-40">
              Niloy Kumar Sarker ❤️ Mithila Dey Dristy
            </p>
          </>
        )}
      </div>
    </div>
  );
};
