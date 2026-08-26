import React from 'react';
import { Heart } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';

interface HeroProps {
  onRsvpClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRsvpClick }) => {
  const weddingDateTime = new Date(weddingConfig.weddingDate + 'T' + weddingConfig.weddingTime);
  const formattedDate = weddingDateTime.toLocaleDateString('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-rose-50 to-white flex flex-col items-center justify-center px-4 py-12 text-center" dir="rtl">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-amber-100 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-rose-100 rounded-full opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-pink-100 rounded-full opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Main invitation text */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-8 animate-fade-in font-arabic">
          {weddingConfig.invitationText}
        </h1>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-12 h-0.5 bg-gradient-to-l from-rose-300 to-transparent"></div>
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
          <div className="w-12 h-0.5 bg-gradient-to-r from-rose-300 to-transparent"></div>
        </div>

        {/* Couple names */}
        <h2 className="text-3xl md:text-4xl font-serif text-gray-700 mb-12 animate-slide-up font-arabic">
          {weddingConfig.groom} <span className="text-rose-500">&</span> {weddingConfig.bride}
        </h2>

        {/* Wedding details */}
        <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg border border-rose-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date and Time */}
            <div className="font-arabic">
              <p className="text-gray-600 mb-2">📅 يوم الزفاف</p>
              <p className="text-xl font-semibold text-gray-800 mb-2">{formattedDate}</p>
              <p className="text-lg text-rose-600 font-semibold">الساعة {weddingConfig.weddingTime}</p>
            </div>

            {/* Venue */}
            <div className="font-arabic">
              <p className="text-gray-600 mb-2">📍 مكان الحفل</p>
              <p className="text-xl font-semibold text-gray-800 mb-2">{weddingConfig.venueName}</p>
              <p className="text-sm text-gray-600">{weddingConfig.venueAddress}</p>
            </div>
          </div>

          {/* Map Link */}
          <div className="mt-6">
            <a
              href={weddingConfig.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-rose-600 hover:text-rose-700 font-semibold text-sm underline font-arabic"
            >
              📍 اضغط هنا لرؤية المكان على الخريطة
            </a>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onRsvpClick}
          className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-4 px-12 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-arabic"
        >
          ✨ تأكيد الحضور
        </button>

        {/* Decorative text */}
        <p className="text-gray-600 mt-12 text-sm font-arabic leading-relaxed">
          نتطلع لمشاركتكم أجمل لحظات حياتنا
        </p>
      </div>
    </div>
  );
};
