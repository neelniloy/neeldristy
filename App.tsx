
import React, { useState, useEffect, useRef } from 'react';
import { Hero } from './components/Hero';
import { Timeline } from './components/Timeline';
import { ProposalCard } from './components/ProposalCard';
import { LoveReasons } from './components/LoveReasons';
import { HeartfeltLetter } from './components/HeartfeltLetter';
import { FutureVision } from './components/FutureVision';
import { Closing } from './components/Closing';
import { CustomCursor } from './components/CustomCursor';


const App: React.FC = () => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const reasonsRef = useRef<HTMLDivElement>(null);

  const handleAccept = () => {
    setHasAccepted(true);
    // Smooth scroll to the next section after a brief animation delay
    setTimeout(() => {
      reasonsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 1200);
  };

  return (
    <main className="relative min-h-screen bg-[#FFF9F9] cursor-none">
      <CustomCursor />
      <Hero />
      
      <Timeline />
      
      <section id="proposal" className="py-32 px-4 bg-gradient-to-b from-[#FFF9F9] to-[#FFF0F5]">
        <ProposalCard onAccept={handleAccept} />
      </section>

      <div ref={reasonsRef} className="transition-all duration-1000">
        {hasAccepted ? (
          <div className="animate-fade-in">
            <section className="py-24 px-4 bg-[#FFF0F5]">
              <LoveReasons />
            </section>
            
            <section className="py-24 px-4 bg-white/50 backdrop-blur-sm">
              <FutureVision />
            </section>
            
            <section className="py-32 px-4 bg-white">
              <HeartfeltLetter />
            </section>

            <Closing />
          </div>
        ) : (
          <div className="text-center py-20 px-6">
            <div className="max-w-md mx-auto p-8 rounded-3xl border border-dashed border-rose-200 bg-white/30">
              <p className="text-rose-300 italic font-light text-lg">
                The rest of our story is waiting for your heart's answer...
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
