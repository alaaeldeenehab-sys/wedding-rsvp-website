import React, { useState } from 'react';
import { RSVPForm } from './RSVPForm';
import { SuccessMessage } from './SuccessMessage';
import { RSVP } from '../types';

export const RSVPSection: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<RSVP | null>(null);

  const handleSuccess = (data: RSVP) => {
    setSubmittedData(data);
  };

  const handleNewResponse = () => {
    setSubmittedData(null);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-rose-50" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-arabic">
            تأكيد الحضور
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-arabic">
            الرجاء ملء البيانات أدناه لتأكيد حضوركم
          </p>
        </div>

        {/* Content */}
        <div className="flex justify-center">
          {submittedData ? (
            <SuccessMessage data={submittedData} onNewResponse={handleNewResponse} />
          ) : (
            <RSVPForm onSuccess={handleSuccess} />
          )}
        </div>
      </div>
    </section>
  );
};
