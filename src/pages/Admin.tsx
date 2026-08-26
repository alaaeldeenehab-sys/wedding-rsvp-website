import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { AlertCircle, Eye, EyeOff, LogOut } from 'lucide-react'
import { RSVPResponse } from '../types'

export const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [responses, setResponses] = useState<RSVPResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password === adminPassword) {
      setIsAuthenticated(true)
      setPassword('')
      fetchResponses()
    } else {
      setError('كلمة المرور غير صحيحة')
    }
  }

  const fetchResponses = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('rsvp_responses')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setResponses(data || [])
    } catch (err: any) {
      setError('خطأ في جلب البيانات')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center px-4" dir="rtl">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">لوحة التحكم</h1>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-bold mb-2">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white font-bold py-3 rounded-lg transition"
            >
              الدخول
            </button>
          </form>
        </div>
      </div>
    )
  }

  const attending = responses.filter((r) => r.attending).length
  const notAttending = responses.filter((r) => !r.attending).length
  const totalGuests = responses.reduce((sum, r) => sum + (r.attending ? r.guest_count : 0), 0)
  const filteredResponses = responses.filter((r) =>
    r.full_name.includes(searchTerm)
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white p-4" dir="rtl">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">لوحة التحكم</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            <LogOut size={20} />
            تسجيل الخروج
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 font-semibold">إجمالي الردود</p>
            <p className="text-3xl font-bold text-gray-800">{responses.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 font-semibold">المؤكدون</p>
            <p className="text-3xl font-bold text-green-500">{attending}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 font-semibold">إجمالي الحضور</p>
            <p className="text-3xl font-bold text-blue-500">{totalGuests}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 font-semibold">المعتذرون</p>
            <p className="text-3xl font-bold text-red-500">{notAttending}</p>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="ابحث عن اسم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-400"
          />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-gray-600">جاري التحميل...</div>
          ) : filteredResponses.length === 0 ? (
            <div className="p-8 text-center text-gray-600">لا توجد ردود حتى الآن</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-right text-gray-700 font-bold">الاسم</th>
                    <th className="px-6 py-3 text-right text-gray-700 font-bold">الحالة</th>
                    <th className="px-6 py-3 text-right text-gray-700 font-bold">عدد الحضور</th>
                    <th className="px-6 py-3 text-right text-gray-700 font-bold">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResponses.map((response) => (
                    <tr key={response.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-800">{response.full_name}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-white font-semibold ${
                            response.attending ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        >
                          {response.attending ? 'سيحضر' : 'اعتذر'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-800">{response.guest_count}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(response.created_at).toLocaleDateString('ar-SA')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin