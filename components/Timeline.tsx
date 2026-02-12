
import React from 'react';
import { TIMELINE_DATA, FALLBACK_IMAGES } from '../constants';

export const Timeline: React.FC = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== FALLBACK_IMAGES.ROMANTIC) {
      target.src = FALLBACK_IMAGES.ROMANTIC;
    }
  };

  return (
    <section className="max-w-5xl mx-auto py-32 px-6">
      <div className="text-center mb-24">
        <h2 className="font-serif text-5xl text-[#6D4C41] mb-4 italic">Our Journey So Far</h2>
        <div className="w-24 h-px bg-rose-200 mx-auto"></div>
      </div>
      
      <div className="space-y-32">
        {TIMELINE_DATA.map((item, index) => (
          <div 
            key={index} 
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20`}
          >
            {/* Polaroid Container */}
            <div 
              className="w-full md:w-1/2 group"
              style={{
                transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})`
              }}
            >
              <div className="bg-white p-4 pb-16 shadow-2xl rounded-sm border border-gray-100 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-105 relative">
                {/* Tape Effect */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/40 backdrop-blur-sm border border-white/20 rotate-1 opacity-80 z-20"></div>
                
                <div className="aspect-[4/5] overflow-hidden bg-gray-50 relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    onError={handleImageError}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-rose-900/5 group-hover:bg-transparent transition-colors" />
                </div>
                
                <div className="absolute bottom-4 left-0 w-full text-center">
                  <span className="font-script text-2xl text-[#8D6E63] opacity-80">{item.year}</span>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
              <div className="inline-block px-3 py-1 bg-rose-50 rounded-full text-rose-400 text-[10px] uppercase tracking-widest font-bold mb-2">
                Chapter {index + 1}
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-[#6D4C41]">
                {item.title}
              </h3>
              <p className="text-[#8D6E63] leading-relaxed text-lg font-light max-w-lg mx-auto md:mx-0">
                {item.description}
              </p>
              <div className="text-4xl pt-4">{item.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
