import React from 'react'
import { Heart, MapPin, Clock } from 'lucide-react'
import { weddingConfig } from '../config/weddingConfig'

interface HeroProps {
  onRsvpClick: () => void
}

export const Hero: React.FC<HeroProps> = ({ onRsvpClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-6">
            <Heart className="w-16 h-16 text-rose-400 animate-pulse" fill="currentColor" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4" style={{fontFamily: 'Georgia, serif'}}>
            {weddingConfig.coupleName}
          </h1>
          <p className="text-2xl text-gray-600 mb-2">{weddingConfig.invitationText}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto mb-12">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-6 h-6 text-rose-400" />
              <div>
                <p className="text-gray-600">تاريخ الفرح</p>
                <p className="text-2xl font-bold text-gray-800">
                  {new Date(weddingConfig.weddingDate).toLocaleDateString('ar-SA')} الساعة {weddingConfig.weddingTime}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <MapPin className="w-6 h-6 text-rose-400" />
              <div>
                <p className="text-gray-600">قاعة الفرح</p>
                <p className="text-lg font-semibold text-gray-800">{weddingConfig.venueName}</p>
                <p className="text-gray-600">{weddingConfig.venueAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onRsvpClick}
            className="bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 text-lg"
          >
            تأكيد الحضور
          </button>
        </div>
      </div>
    </div>
  )
}