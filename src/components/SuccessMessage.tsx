import React from 'react'
import { CheckCircle } from 'lucide-react'

interface SuccessMessageProps {
  name: string
  onReset: () => void
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ name, onReset }) => {
  return (
    <div className="text-center py-12" dir="rtl">
      <div className="inline-block mb-6">
        <CheckCircle className="w-20 h-20 text-green-500" fill="currentColor" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-3">شكرًا يا {name.split(' ')[0]}!</h2>
      <p className="text-gray-600 text-lg mb-8">تم تأكيد حضورك بنجاح</p>
      <p className="text-gray-500 mb-8">نتطلع لرؤيتك في حفلتنا السعيدة</p>
      <button
        onClick={onReset}
        className="bg-rose-400 hover:bg-rose-500 text-white font-bold py-2 px-6 rounded-lg transition"
      >
        تأكيد حضور آخر
      </button>
    </div>
  )
}