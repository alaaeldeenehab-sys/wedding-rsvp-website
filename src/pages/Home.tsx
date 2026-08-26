import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { RSVPSection } from '../components/RSVPSection';

export const Home: React.FC = () => {
  const [showRSVP, setShowRSVP] = useState(false);

  return (
    <div className="min-h-screen bg-white font-arabic">
      {showRSVP ? (
        <>
          <div className="py-8 bg-gradient-to-r from-rose-400 to-pink-400 text-white">
            <div className="container mx-auto px-4" dir="rtl">
              <button
                onClick={() => setShowRSVP(false)}
                className="text-white hover:text-gray-200 transition font-bold"
              >
                ← العودة للدعوة
              </button>
            </div>
          </div>
          <RSVPSection />
        </>
      ) : (
        <Hero onRsvpClick={() => setShowRSVP(true)} />
      )}
    </div>
  );
};
