import React from 'react'
import { RSVPForm } from './RSVPForm'

export const RSVPSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2" dir="rtl" style={{fontFamily: 'Georgia, serif'}}>
          تأكيد الحضور
        </h2>
        <p className="text-center text-gray-600 mb-8" dir="rtl">
          الرجاء إكمال النموذج أدناه
        </p>
        <RSVPForm />
      </div>
    </div>
  )
}