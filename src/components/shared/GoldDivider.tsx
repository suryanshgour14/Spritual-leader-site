'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function GoldDivider() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative flex items-center justify-center py-8" aria-hidden="true">
      {/* Gradient line background */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-300/40 to-transparent" />
      </div>

      {/* Main circular photo container */}
      <div className="relative">
        {/* Outer pulsing rings */}
        <style>{`
          @keyframes pulse-ring {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 0.4; }
            100% { transform: scale(1); opacity: 0.8; }
          }
          
          @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.1); }
            50% { box-shadow: 0 0 40px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.3); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          
          .ring-outer { animation: pulse-ring 4s ease-in-out infinite; }
          .ring-mid { animation: pulse-ring 4s ease-in-out infinite 1.3s; }
          .ring-inner { animation: pulse-ring 4s ease-in-out infinite 2.6s; }
          .photo-container { animation: glow-pulse 3s ease-in-out infinite; }
          .float-effect { animation: float 4s ease-in-out infinite; }
        `}</style>

        {/* Ring 3 (Outermost) */}
        <div 
          className="ring-outer absolute inset-0 rounded-full border-2 border-gold-300/40"
          style={{ padding: '32px' }}
        />

        {/* Ring 2 */}
        <div 
          className="ring-mid absolute inset-0 rounded-full border border-gold-400/30"
          style={{ padding: '20px' }}
        />

        {/* Ring 1 (Inner) */}
        <div 
          className="ring-inner absolute inset-0 rounded-full border border-gold-500/20"
          style={{ padding: '8px' }}
        />

        {/* Photo container with glow */}
        <div
          className={`photo-container relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden transition-all duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          } ${isVisible ? 'opacity-100' : 'opacity-50'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Inner glow layer */}
          <div className="absolute inset-0 rounded-full border-2 border-gold-300/60 pointer-events-none" />

          {/* Image */}
          <Image
            src="/images/didi/didi-ji.jpeg"
            alt="Sadhvi Samahita Didi"
            fill
            className="object-cover rounded-full"
            priority
          />

          {/* Hover shimmer effect */}
          {isHovered && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-gold-200/20 to-transparent animate-pulse" />
          )}
        </div>

        {/* Optional: Floating accent particles on hover */}
        {isHovered && (
          <>
            <div className="float-effect absolute -top-2 -right-2 w-3 h-3 rounded-full bg-gold-300/60" />
            <div className="float-effect absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-gold-300/50" style={{ animationDelay: '0.5s' }} />
            <div className="float-effect absolute -top-1 left-1/4 w-2 h-2 rounded-full bg-gold-400/40" style={{ animationDelay: '1s' }} />
          </>
        )}
      </div>
    </div>
  );
}
