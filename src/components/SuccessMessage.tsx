import React from 'react';
import { Heart, CheckCircle } from 'lucide-react';
import { RSVP } from '../types';

interface SuccessMessageProps {
  data: RSVP;
  onNewResponse: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ data, onNewResponse }) => {
  const isAttending = data.attending;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 text-center" dir="rtl">
      <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-200">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-4">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4 font-arabic">
          شكرًا لك {data.full_name}!
        </h2>

        {/* Conditional message */}
        <div className="mb-8">
          {isAttending ? (
            <div>
              <p className="text-xl text-gray-700 mb-3 font-arabic">
                شكرًا لتأكيد حضوركم، سعداء جدًا بمشاركتكم فرحتنا ❤️
              </p>
              <p className="text-gray-600 font-arabic">
                سيحضر {data.guest_count} {data.guest_count === 1 ? 'شخص' : 'أشخاص'} من فضلك
              </p>
            </div>
          ) : (
            <p className="text-xl text-gray-700 font-arabic">
              شكرًا لإبلاغنا، نتمنى أن نلتقي في مناسبات سعيدة قادمة ❤️
            </p>
          )}
        </div>

        {/* Details */}
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg p-6 mb-8 border border-rose-100">
          <h3 className="font-bold text-gray-800 mb-4 font-arabic">ملخص ردك:</h3>
          <div className="space-y-2 text-left rtl:text-right font-arabic">
            <p className="text-gray-700">
              <span className="font-semibold">الاسم:</span> {data.full_name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">الحالة:</span>
              {isAttending ? (
                <span className="text-green-600 font-semibold"> سأحضر ✅</span>
              ) : (
                <span className="text-gray-600 font-semibold"> لن أتمكن 😢</span>
              )}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">عدد الحضور:</span> {data.guest_count}
            </p>
            {data.created_at && (
              <p className="text-gray-700 text-sm">
                <span className="font-semibold">الوقت:</span>
                {new Date(data.created_at).toLocaleDateString('ar-EG', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            )}
          </div>
        </div>

        {/* Decorative */}
        <div className="flex justify-center gap-2 mb-8">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
        </div>

        {/* Action Button */}
        <button
          onClick={onNewResponse}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 font-arabic"
        >
          إضافة رد جديد
        </button>
      </div>
    </div>
  );
};
