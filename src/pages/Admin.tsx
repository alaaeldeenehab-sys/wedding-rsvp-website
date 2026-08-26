import React, { useState, useEffect } from 'react';
import { LogOut, Search, BarChart3 } from 'lucide-react';
import { supabase, type RSVPRecord } from '../lib/supabase';
import { AdminStats } from '../types';

export const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [responses, setResponses] = useState<RSVPRecord[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    total_confirmed: 0,
    total_guests_confirmed: 0,
    total_declined: 0,
    total_responses: 0,
  });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAttending, setFilterAttending] = useState<'all' | 'attending' | 'declined'>('all');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (password === adminPassword) {
      setIsAuthenticated(true);
      setPasswordError('');
      setPassword('');
      fetchData();
    } else {
      setPasswordError('كلمة المرور غير صحيحة');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('rsvp_responses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const typedData = (data || []) as RSVPRecord[];
      setResponses(typedData);
      calculateStats(typedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: RSVPRecord[]) => {
    const confirmed = data.filter((r) => r.attending);
    const declined = data.filter((r) => !r.attending);
    const totalGuests = confirmed.reduce((sum, r) => sum + r.guest_count, 0);

    setStats({
      total_confirmed: confirmed.length,
      total_guests_confirmed: totalGuests,
      total_declined: declined.length,
      total_responses: data.length,
    });
  };

  const filteredResponses = responses.filter((response) => {
    const matchesSearch = response.full_name.includes(searchQuery) || searchQuery === '';
    const matchesFilter =
      filterAttending === 'all' ||
      (filterAttending === 'attending' && response.attending) ||
      (filterAttending === 'declined' && !response.attending);
    return matchesSearch && matchesFilter;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-rose-50 flex items-center justify-center px-4" dir="rtl">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center font-arabic">
            🔐 لوحة التحكم
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2 font-arabic">
                كلمة المرور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none font-arabic"
              />
            </div>
            {passwordError && (
              <p className="text-red-600 font-semibold text-center font-arabic">{passwordError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg transition font-arabic"
            >
              الدخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8" dir="rtl">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 font-arabic">📊 لوحة التحكم</h1>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setResponses([]);
            }}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition font-arabic"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon="📋"
            title="إجمالي الردود"
            value={stats.total_responses}
            color="from-blue-400 to-blue-600"
          />
          <StatCard
            icon="✅"
            title="سيحضرون"
            value={stats.total_confirmed}
            color="from-green-400 to-green-600"
          />
          <StatCard
            icon="👥"
            title="إجمالي الحضور"
            value={stats.total_guests_confirmed}
            color="from-rose-400 to-rose-600"
          />
          <StatCard
            icon="😢"
            title="لن يحضروا"
            value={stats.total_declined}
            color="from-gray-400 to-gray-600"
          />
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-bold mb-2 font-arabic">🔍 البحث بالاسم</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن اسم"
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none font-arabic"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-bold mb-2 font-arabic">⚙️ الفلترة</label>
              <select
                value={filterAttending}
                onChange={(e) => setFilterAttending(e.target.value as any)}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none font-arabic"
              >
                <option value="all">الكل</option>
                <option value="attending">سيحضرون</option>
                <option value="declined">لن يحضروا</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-right font-bold font-arabic">الاسم</th>
                  <th className="px-6 py-4 text-right font-bold font-arabic">الحالة</th>
                  <th className="px-6 py-4 text-right font-bold font-arabic">عدد الحضور</th>
                  <th className="px-6 py-4 text-right font-bold font-arabic">التاريخ والوقت</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-600 font-arabic">
                      جاري التحميل...
                    </td>
                  </tr>
                ) : filteredResponses.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-600 font-arabic">
                      لا توجد نتائج
                    </td>
                  </tr>
                ) : (
                  filteredResponses.map((response, index) => (
                    <tr
                      key={response.id || index}
                      className={`border-t border-gray-200 hover:bg-gray-50 transition ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold text-gray-800 font-arabic">
                        {response.full_name}
                      </td>
                      <td className="px-6 py-4 font-arabic">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
                            response.attending
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-200 text-gray-800'
                          }`}
                        >
                          {response.attending ? '✅ سيحضر' : '😢 لن يحضر'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-800 font-arabic">
                        {response.guest_count}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm font-arabic">
                        {new Date(response.created_at).toLocaleDateString('ar-EG', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 font-arabic">
          <p>إجمالي النتائج المعروضة: {filteredResponses.length}</p>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: string;
  title: string;
  value: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color }) => (
  <div className={`bg-gradient-to-br ${color} text-white rounded-xl shadow-lg p-6 text-center`}>
    <div className="text-4xl mb-2">{icon}</div>
    <p className="text-sm opacity-90 font-arabic">{title}</p>
    <p className="text-4xl font-bold font-arabic">{value}</p>
  </div>
);
