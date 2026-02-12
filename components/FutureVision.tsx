
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { WIFE_NAME } from '../constants';

const VIBES = [
  { 
    label: 'Rainy', 
    emoji: '🌧️', 
    prompt: 'A romantic monsoon afternoon in Bangladesh. A couple is sitting on a balcony watching the rain, drinking tea from clay cups. The woman is wearing a beautiful blue saree, the man in a comfortable panjabi. Lush green trees in the background, soft watercolor style, cozy lighting.' 
  },
  { 
    label: 'Festive', 
    emoji: '🌺', 
    prompt: 'A celebratory traditional moment in Bangladesh. A happy couple wearing matching red and white traditional attire (Lal-Shada Saree and Panjabi). They are surrounded by marigold flowers and festive alpana floor art. Vibrant, heartwarming digital art style.' 
  },
  { 
    label: 'River', 
    emoji: '⛵', 
    prompt: 'A serene sunset boat ride on a wide river in rural Bangladesh. A couple is sitting together on a traditional wooden "Nouka". Golden hour sunlight reflecting on the water, peaceful atmosphere, soft impressionist oil painting style.' 
  },
  { 
    label: 'Classic Rickshaw', 
    emoji: '🛺', 
    prompt: 'A romantic ride on a colorful, hand-painted rickshaw through a quiet tree-lined street in Bangladesh. The couple is smiling together. The rickshaw has vibrant, intricate folk art. Cinematic lighting, nostalgic and warm feel.' 
  }
];

export const FutureVision: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateVisionImage = async (vibe: typeof VIBES[0]) => {
    setLoading(true);
    setSelectedVibe(vibe.label);
    setImageUrl(null);
    setError(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `Generate a beautiful, romantic, and artistic illustration of a happy couple in Bangladesh enjoying ${vibe.prompt}. 
                     Ensure the attire reflects Bangladeshi culture (Saree and Panjabi). The style should be elegant and heartwarming. No text in the image.`,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });

      // Find the image part in the response
      let foundImage = false;
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          setImageUrl(`data:image/png;base64,${base64Data}`);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) {
        throw new Error("No image data returned");
      }
    } catch (err) {
      console.error(err);
      setError("The stars are a bit blurry right now. Let's try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `Our_Future_${selectedVibe}_Vision.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto glass-card rounded-[3rem] p-8 md:p-12 text-center border border-rose-100 shadow-xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-200 via-rose-400 to-rose-200"></div>
      
      <h3 className="font-serif text-3xl md:text-4xl text-[#6D4C41] mb-4 italic">Visions of Our Tomorrow</h3>
      <p className="text-[#8D6E63] mb-8 text-sm uppercase tracking-[0.3em] font-medium">Choose a vibe to manifest a moment of our life</p>
      
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {VIBES.map((v) => (
          <button
            key={v.label}
            onClick={() => generateVisionImage(v)}
            disabled={loading}
            className={`px-6 py-4 rounded-full border transition-all duration-500 flex items-center gap-3 ${
              selectedVibe === v.label 
                ? 'bg-rose-500 text-white border-rose-500 shadow-xl scale-105 z-10' 
                : 'bg-white text-[#8D6E63] border-rose-100 hover:border-rose-300 hover:bg-rose-50 shadow-sm'
            }`}
          >
            <span className="text-xl">{v.emoji}</span>
            <span className="font-semibold tracking-wide whitespace-nowrap">{v.label}</span>
          </button>
        ))}
      </div>

      <div className="relative min-h-[400px] flex items-center justify-center bg-rose-50/20 rounded-[2rem] p-4 md:p-8 border border-dashed border-rose-200 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-rose-100 border-t-rose-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-rose-500 animate-pulse">❤️</div>
            </div>
            <p className="text-rose-400 text-lg italic font-script">Painting our future, {WIFE_NAME}...</p>
          </div>
        ) : imageUrl ? (
          <div className="animate-fade-in w-full max-w-lg mx-auto relative">
            <div className="bg-white p-4 pb-12 shadow-2xl rounded-sm border border-gray-100 transform rotate-1 transition-transform hover:rotate-0 duration-500 relative group">
              <img 
                src={imageUrl} 
                alt="Our Future Vision" 
                className="w-full h-auto rounded-sm shadow-inner"
              />
              
              {/* Download Button Overlay */}
              <button 
                onClick={handleDownload}
                className="absolute top-6 right-6 p-3 bg-white/80 hover:bg-white backdrop-blur-md rounded-full shadow-lg text-rose-500 border border-rose-100 opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 active:scale-95"
                title="Download this memory"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>

              <div className="mt-6 text-center">
                <p className="font-script text-3xl text-[#8D6E63] italic">
                   {selectedVibe} Dreams
                </p>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="text-rose-400 italic">
            <p className="text-4xl mb-4">✨</p>
            <p>{error}</p>
          </div>
        ) : (
          <div className="text-[#BCAAA4] flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white/50 flex items-center justify-center text-3xl shadow-inner">🎨</div>
            <p className="italic text-xl font-light">Choose a vibe to see a glimpse of our life together...</p>
          </div>
        )}
      </div>
      
      <p className="mt-8 text-[10px] text-[#BCAAA4] uppercase tracking-[0.4em] opacity-60">
        AI Generated Visions • Powered by our love in Bangladesh
      </p>
    </div>
  );
};
