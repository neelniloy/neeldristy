
import React, { useState } from 'react';
import { LOVE_REASONS, WIFE_NAME, FALLBACK_IMAGES } from '../constants';
import { LoveReason } from '../types';

const FlipCard: React.FC<{ reason: LoveReason; index: number }> = ({ reason, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== FALLBACK_IMAGES.ROMANTIC) {
      target.src = FALLBACK_IMAGES.ROMANTIC;
    }
  };

  return (
    <div 
      className="perspective-1000 w-full h-[30rem] cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front - Note Card Style */}
        <div className="absolute inset-0 backface-hidden bg-white border border-rose-100 rounded-3xl shadow-lg flex flex-col items-center justify-center p-8 group-hover:shadow-2xl transition-all overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mb-6 border border-rose-100 shadow-inner">
               <span className="text-rose-400 font-serif font-bold text-3xl">{index + 1}</span>
            </div>
            
            <h4 className="text-[#6D4C41] font-serif text-xl tracking-wider mb-2">My Reason</h4>
            <div className="w-12 h-px bg-rose-200 mb-6"></div>
            
            <p className="text-rose-300 uppercase tracking-[0.3em] text-[10px] font-bold">Tap to see why</p>
          </div>
          
          <div className="absolute top-6 left-6 text-rose-100 text-4xl">❤</div>
          <div className="absolute bottom-6 right-6 text-rose-100 text-4xl">❤</div>
        </div>

        {/* Back - Photo & Highly Readable Text */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white border border-rose-100 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
          {/* Image */}
          <div className="h-1/2 w-full relative">
            <img 
              src={reason.image || FALLBACK_IMAGES.ROMANTIC} 
              alt={`Reason ${index + 1}`} 
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-6">
               <span className="text-white font-serif italic text-lg opacity-90">Reason #{index + 1}</span>
            </div>
          </div>
          
          {/* Readable Text Section */}
          <div className="h-1/2 w-full p-8 flex flex-col items-center justify-center text-center bg-white relative">
            <span className="absolute top-4 left-6 text-rose-50/80 text-7xl font-serif select-none">“</span>
            
            <p className="font-serif text-xl md:text-2xl text-[#4A3737] leading-relaxed relative z-10 px-2 italic">
              {reason.text}
            </p>
            
            <span className="absolute bottom-2 right-6 text-rose-50/80 text-7xl font-serif rotate-180 select-none">“</span>
            
            <div className="mt-6 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-200"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-rose-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LoveReasons: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-24">
        <h2 className="font-serif text-5xl md:text-6xl text-[#6D4C41] mb-6 italic drop-shadow-sm">
          Reasons I Choose You
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto mb-6"></div>
        <p className="text-[#8D6E63] font-light max-w-2xl mx-auto text-lg italic">
          {WIFE_NAME}, these are just a few of the thousands of reasons why my heart beats for you every day.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
        {LOVE_REASONS.map((reason, idx) => (
          <FlipCard key={reason.id} reason={reason} index={idx} />
        ))}
      </div>
    </div>
  );
};
