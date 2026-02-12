
import React, { useState } from 'react';
import { LOVE_REASONS, FALLBACK_IMAGES } from '../constants';

export const LoveReasons: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl md:text-5xl text-[#6D4C41] mb-4">
          All The Reasons Why
        </h2>
        <p className="text-rose-400 font-script text-2xl">
           I choose you, every single day...
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {LOVE_REASONS.map((reason, index) => (
          <FlipCard key={reason.id} reason={reason} index={index} />
        ))}
      </div>
    </div>
  );
};

const FlipCard: React.FC<{ reason: typeof LOVE_REASONS[0]; index: number }> = ({ reason, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGES.ROMANTIC;
  };

  return (
    <div 
      className="h-[520px] w-full perspective-1000 cursor-pointer group"
      onClick={handleFlip}
    >
      <div className={`relative h-full w-full transition-all duration-700 preserve-3d shadow-xl rounded-3xl ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front - Number & Aesthetic */}
        <div className="absolute inset-0 backface-hidden bg-white/80 backdrop-blur-sm border border-rose-100 rounded-3xl flex flex-col items-center justify-center p-8 group-hover:border-rose-300 transition-colors">
          <div className="absolute top-4 right-4 text-rose-200 text-4xl opacity-50">
            {index % 2 === 0 ? '❤' : '❦'}
          </div>
          <span className="font-serif text-8xl text-rose-100 font-bold opacity-80 select-none">
            {index + 1}
          </span>
          <p className="mt-4 text-[#8D6E63] font-medium tracking-widest uppercase text-xs">
            Tap to reveal
          </p>
        </div>

        {/* Back - Full Photo with Text Overlay */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white border border-rose-100 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          {/* Full Height Image */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={reason.image || FALLBACK_IMAGES.ROMANTIC} 
              alt={`Reason ${index + 1}`} 
              onError={handleImageError}
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient Overlay for Text Readability - Smoother & Lower */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>

          {/* Text Content - Positioned at Bottom with more padding */}
          <div className="absolute bottom-0 left-0 right-0 p-6 pt-12 text-center z-10 flex flex-col items-center">
            <div className="w-8 h-1 bg-rose-500/80 mb-3 rounded-full"></div>
            
            <p className="font-serif text-lg text-white/95 leading-relaxed italic drop-shadow-lg mb-2">
              "{reason.text}"
            </p>
            
            <div className="mt-4 mb-2 flex items-center justify-center gap-2">
              <span className="text-rose-300 text-xs tracking-widest uppercase font-bold">Reason #{index + 1}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
