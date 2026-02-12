
import React from 'react';

export const Closing: React.FC = () => {
  return (
    <footer className="py-32 px-6 bg-[#FFF9F9] text-center border-t border-rose-50">
      <div className="max-w-xl mx-auto">
        <div className="text-rose-200 text-3xl mb-8">❦</div>
        <h3 className="font-serif text-xl md:text-2xl text-[#6D4C41] italic mb-4">
          "Whatever our souls are made of, yours and mine are the same."
        </h3>
        <div className="flex items-center justify-center gap-3 mt-10 mb-6">
          <div className="h-px w-12 bg-rose-200"></div>
          <span className="text-rose-300 text-lg">💝</span>
          <div className="h-px w-12 bg-rose-200"></div>
        </div>
        <p className="font-script text-2xl md:text-3xl text-rose-400 mb-4">
          Happy Valentine's Day 2026
        </p>
        <p className="text-[#8D6E63] font-light tracking-wide uppercase text-sm mt-8">
          Forever starts today.
        </p>
      </div>
    </footer>
  );
};
