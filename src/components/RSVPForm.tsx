import React, { useState } from 'react';
import { Heart, AlertCircle, Loader } from 'lucide-react';
import { validateFullName, getNameErrorMessage, validateGuestCount } from '../lib/validation';
import { supabase, type RSVPRecord } from '../lib/supabase';

interface RSVPFormProps {
  onSuccess: (data: RSVPRecord) => void;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({ onSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [attending, setAttending] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [formError, setFormError] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFullName(value);
    if (value && !validateFullName(value)) {
      setNameError(getNameErrorMessage(value));
    } else {
      setNameError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Validation
    if (!validateFullName(fullName)) {
      setNameError(getNameErrorMessage(fullName));
      return;
    }

    if (!validateGuestCount(guestCount)) {
      setFormError('عدد الحضور يجب أن يكون بين 1 و 10');
      return;
    }

    if (attending === null) {
      setFormError('الرجاء تحديد ما إذا كنت ستحضر أم لا');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('rsvp_responses')
        .insert([
          {
            full_name: fullName.trim(),
            guest_count: guestCount,
            attending: attending,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        onSuccess(data);
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setFormError('حدث خطأ أثناء إرسال البيانات. الرجاء المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4" dir="rtl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name Input */}
        <div>
          <label className="block text-gray-700 font-bold mb-2 font-arabic">
            الاسم الكامل *
          </label>
          <input
            type="text"
            value={fullName}
            onChange={handleNameChange}
            placeholder="مثال: أحمد محمد"
            className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors font-arabic text-right ${
              nameError
                ? 'border-red-500 bg-red-50 focus:border-red-600'
                : 'border-gray-200 bg-white focus:border-rose-500'
            }`}
            disabled={loading}
          />
          {nameError && (
            <div className="flex items-center gap-2 text-red-600 mt-2 text-sm font-arabic">
              <AlertCircle className="w-4 h-4" />
              {nameError}
            </div>
          )}
        </div>

        {/* Guest Count */}
        <div>
          <label className="block text-gray-700 font-bold mb-2 font-arabic">
            عدد الحضور *
          </label>
          <select
            value={guestCount}
            onChange={(e) => setGuestCount(parseInt(e.target.value))}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none bg-white font-arabic text-right transition-colors"
            disabled={loading}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'شخص' : 'أشخاص'}
              </option>
            ))}
          </select>
          {guestCount > 1 && (
            <p className="text-gray-600 text-sm mt-2 font-arabic">
              ℹ️ العدد يشمل أنت و {guestCount - 1} مرافق{guestCount - 1 > 1 ? 'ين' : ''}
            </p>
          )}
        </div>

        {/* Attendance Buttons */}
        <div>
          <label className="block text-gray-700 font-bold mb-3 font-arabic">
            هل ستتمكن من الحضور؟ *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setAttending(true)}
              disabled={loading}
              className={`py-3 px-4 rounded-lg font-bold transition-all transform hover:scale-105 font-arabic ${
                attending === true
                  ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ❤️ نعم، سأحضر
            </button>
            <button
              type="button"
              onClick={() => setAttending(false)}
              disabled={loading}
              className={`py-3 px-4 rounded-lg font-bold transition-all transform hover:scale-105 font-arabic ${
                attending === false
                  ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              😢 للأسف لن أتمكن
            </button>
          </div>
        </div>

        {/* Error Message */}
        {formError && (
          <div className="flex items-center gap-2 bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700 font-arabic">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {formError}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !fullName || attending === null}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 font-arabic"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              جاري الإرسال...
            </>
          ) : attending === true ? (
            '✨ تأكيد الحضور'
          ) : (
            '✨ تأكيد الاعتذار'
          )}
        </button>
      </form>
    </div>
  );
};
