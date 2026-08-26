import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { validateFullName, validateGuestCount } from '../lib/validation'
import { SuccessMessage } from './SuccessMessage'
import { AlertCircle } from 'lucide-react'

export const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    guest_count: 1,
    attending: true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [successName, setSuccessName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateFullName(formData.full_name)) {
      setError('الرجاء إدخال الاسم الأول والأخير')
      return
    }

    if (!validateGuestCount(formData.guest_count)) {
      setError('عدد الحضور يجب أن يكون بين 1 و 10')
      return
    }

    setLoading(true)

    try {
      const { error: insertError } = await supabase
        .from('rsvp_responses')
        .insert([
          {
            full_name: formData.full_name,
            guest_count: formData.guest_count,
            attending: formData.attending,
          },
        ])

      if (insertError) throw insertError

      setSuccessName(formData.full_name)
      setSuccess(true)
      setFormData({ full_name: '', guest_count: 1, attending: true })
    } catch (err: any) {
      setError(err.message || 'حدث خطأ. الرجاء المحاولة مجددًا')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return <SuccessMessage name={successName} onReset={() => setSuccess(false)} />
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-gray-700 font-bold mb-2">الاسم الكامل</label>
        <input
          type="text"
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          placeholder="الاسم الأول والأخير"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-400"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-bold mb-2">عدد المرافقين</label>
        <select
          value={formData.guest_count}
          onChange={(e) => setFormData({ ...formData, guest_count: parseInt(e.target.value) })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-400"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? 'شخص' : 'أشخاص'}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-bold mb-4">هل ستتمكن من الحضور؟</label>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="attending"
              value="true"
              checked={formData.attending === true}
              onChange={() => setFormData({ ...formData, attending: true })}
              className="w-4 h-4 text-rose-400"
            />
            <span className="text-gray-700 font-medium">نعم، سأحضر</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="attending"
              value="false"
              checked={formData.attending === false}
              onChange={() => setFormData({ ...formData, attending: false })}
              className="w-4 h-4 text-gray-400"
            />
            <span className="text-gray-700 font-medium">للأسف لن أتمكن</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition"
      >
        {loading ? 'جاري الإرسال...' : 'تأكيد الحضور'}
      </button>
    </form>
  )
}