"use client"
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [step, setStep] = useState(0); 
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [isEscaping, setIsEscaping] = useState(true);

  // Timer for the "Chase" phase on Step 2
  useEffect(() => {
    if (step === 2) {
      setIsEscaping(true);
      const timer = setTimeout(() => {
        setIsEscaping(false);
        setBtnPos({ x: 0, y: 0 }); // Snap back to center
      }, 5000); // 5 seconds of teasing
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleTease = () => {
    if (step === 2 && isEscaping) {
      // Calculate a random jump that stays within view but moves far away
      const randomX = (Math.random() - 0.5) * 300;
      const randomY = (Math.random() - 0.5) * 300;
      setBtnPos({ x: randomX, y: randomY });
    }
  };

  const nextStep = () => {
    if (isEscaping && step === 2) return; // Prevent clicking during tease
    setIsTransitioning(true);
    setTimeout(() => {
      setStep((prev) => prev + 1);
      setIsTransitioning(false);
    }, 800);
  };

  const images = [
    "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    "https://images.unsplash.com/photo-1516589174184-c68526514b4c",
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e"
  ];

  const emojis = ["❤️", "💖", "✨", "💋", "😘", "💕", "🤍", "🌹"];

  const teaserSteps = [
    { title: "This is for you, my love...", btn: "Open with Love 💌" },
    { title: "Wait... just one more step...", btn: "Almost there! ✨" },
    { title: "Okay, last one... try to catch me! 😋", btn: "Catch me! ❤️" }
  ];

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-rose-50">
      
      {/* 1. TEASER OVERLAY */}
      {step < 3 && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-rose-100 to-pink-200 transition-all duration-700 ${isTransitioning ? 'opacity-0 scale-150 blur-lg' : 'opacity-100 scale-100 blur-0'}`}>
          <div className="text-center space-y-12 p-6">
            <div className="text-7xl md:text-9xl animate-bounce-slow">
              {step === 0 ? "💌" : step === 1 ? "💝" : "💖"}
            </div>
            
            <h2 className="text-3xl md:text-5xl font-serif italic text-rose-900 tracking-wide h-20">
              {teaserSteps[step].title}
            </h2>

            {/* The "Runaway" Container */}
            <div 
              className="relative transition-all duration-200 ease-out"
              style={{ transform: `translate(${btnPos.x}px, ${btnPos.y}px)` }}
              onMouseMove={handleTease}
            >
              <button 
                onClick={nextStep}
                className={`btn-kiss px-12 py-5 bg-white/80 backdrop-blur-md text-rose-600 rounded-full font-serif italic text-2xl shadow-2xl border-2 border-rose-200 transition-all
                  ${(step === 2 && isEscaping) ? 'pointer-events-none scale-90' : 'hover:scale-110 active:scale-95 animate-pulse'}
                `}
              >
                {teaserSteps[step].btn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. FINAL SURPRISE PAGE */}
      <div className={`relative min-h-screen w-full transition-all duration-[2500ms] cubic-bezier(0.23, 1, 0.32, 1) ${step === 3 ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[2.5] blur-[60px]'}`}>
        
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-100 via-pink-50 to-orange-100 z-[-1]" />

        {/* Rain Effect */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <span key={i} className={`falling-emoji emoji-drop-${i}`}>{emojis[i % emojis.length]}</span>
          ))}
        </div>

        {/* Floating Images */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {images.map((src, i) => (
            <div key={i} className={`floating-frame image-path-${i}`}>
              <img src={src} alt="Memory" className={`w-full h-full object-cover rounded-[4rem] shadow-2xl border-4 border-white ${i < 2 ? 'opacity-40 scale-90' : 'opacity-100'}`} />
            </div>
          ))}
        </div>

        {/* Center Card */}
        <div className="relative z-20 min-h-screen flex items-center justify-center px-6">
          <div className="text-center w-full max-w-sm p-10 md:p-14 rounded-[4rem] bg-white/30 backdrop-blur-3xl border border-white/50 shadow-2xl floating-card">
            {step === 3 && (
              <div className="space-y-6">
                <h1 className="text-2xl md:text-3xl font-serif italic text-rose-950 animate-typing overflow-hidden border-r-2 border-rose-400 whitespace-nowrap">
                  Thank you so much... 🤍
                </h1>
                <p className="text-lg md:text-xl font-serif text-rose-900/80 italic opacity-0 animate-fade-in-slow">for coming into my life.</p>
                <div className="h-px w-12 bg-rose-200 mx-auto" />
                <p className="text-[10px] font-sans tracking-[0.4em] uppercase text-rose-800/60">I will be with you forever</p>
                <div className="pt-2 opacity-0 animate-fade-in-late">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-600 italic animate-love-shimmer">I love you so much ❤️</h2>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        h1, h2, button { font-family: 'Playfair Display', Georgia, serif; }

        .btn-kiss:hover {
           cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' style='font-size: 24px'><text y='24'>💋</text></svg>"), pointer !important;
        }

        @keyframes typing { from { width: 0 } to { width: 100% } }
        @keyframes blink { 50% { border-color: transparent } }
        .animate-typing { animation: typing 3s steps(30, end) forwards 1s, blink 0.8s step-end infinite; }

        .animate-fade-in-slow { animation: fadeIn 2s ease forwards 4s; }
        .animate-fade-in-late { animation: fadeIn 2s ease forwards 5.5s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

        .floating-frame { position: absolute; width: clamp(100px, 15vw, 220px); aspect-ratio: 1/1; }
        .image-path-0 { top: 10%; left: 5%; animation: drift 30s infinite; }
        .image-path-1 { bottom: 10%; right: 5%; animation: drift 35s infinite reverse; }
        .image-path-2 { top: 15%; right: 10%; animation: drift 25s infinite; }
        .image-path-3 { bottom: 15%; left: 10%; animation: drift 28s infinite reverse; }
        .image-path-4 { top: 45%; right: -5%; animation: drift 32s infinite; }

        @keyframes drift { 0%, 100% { transform: translate(0, 0) rotate(5deg); } 50% { transform: translate(3vw, 3vh) rotate(-5deg); } }

        .falling-emoji { position: absolute; top: -10vh; animation: rain linear infinite; }
        @keyframes rain {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
        ${Array.from({ length: 50 }).map((_, i) => `
          .emoji-drop-${i} {
            left: ${Math.random() * 100}%;
            animation-duration: ${5 + Math.random() * 7}s;
            animation-delay: -${Math.random() * 10}s;
            font-size: ${1.2 + Math.random() * 1.5}rem;
          }
        `).join("")}

        .floating-card { animation: floatCard 8s ease-in-out infinite; }
        @keyframes floatCard { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }

        @keyframes loveShimmer { 0%, 100% { text-shadow: 0 0 8px transparent; } 50% { text-shadow: 0 0 15px rgba(225,29,72,0.3); } }
        .animate-love-shimmer { animation: loveShimmer 3s ease-in-out infinite; }

        @keyframes bounceSlow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .animate-bounce-slow { animation: bounceSlow 3s ease-in-out infinite; }

        html, body { overflow: hidden; margin: 0; }
      `}</style>
    </main>
  );
}