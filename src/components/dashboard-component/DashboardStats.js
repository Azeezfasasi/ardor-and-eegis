"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

// Client-only last updated time to prevent hydration mismatch
function LastUpdated({ timestamp }) {
  const [now, setNow] = useState('');
  
  useEffect(() => {
    // Update time on client side only
    const updateTime = () => setNow(new Date().toLocaleString());
    updateTime();
    
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);
  
  return now ? <p className="text-sm text-gray-500 font-semibold">Last updated: <span className='font-normal'><time>{now}</time></span></p> : null;
}

function Icon({ name }) {
  switch (name) {
    case 'activeUsers':
      return (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'admins':
      return (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
          <circle cx="12" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
        </svg>
      )
    case 'staffMembers':
      return (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="8.5" cy="7" r="4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M20 8v6" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M23 11h-6" />
        </svg>
      )
    case 'totalBlogs':
      return (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 006.5 22H20" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M14 2H6.5A2.5 2.5 0 004 4.5V18" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M14 2h6v6" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M20 2l-7 7" />
        </svg>
      )
    case 'pendingQuoteRequests':
      return (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 9v2" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 17h.01" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10 2h4l1 2h3l-1 17H7L6 4h3l1-2z" />
        </svg>
      )
    case 'pendingContactForms':
      return (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 15a4 4 0 01-4 4H7l-4 4V7a4 4 0 014-4h10a4 4 0 014 4v8z" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 8h10" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 12h6" />
        </svg>
      )
    case 'totalSubscribers':
      return (
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    default:
      return null;
  }
}

function Count({ value = 0, duration = 800 }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let frame
    const start = performance.now()
    const from = display
    const to = Number(value) || 0

    function step(now) {
      const t = Math.min(1, (now - start) / duration)
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t // easeInOutQuad-like
      const current = Math.round(from + (to - from) * eased)
      setDisplay(current)
      if (t < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <span className="text-2xl md:text-3xl font-bold text-gray-900">{display.toLocaleString()}</span>
}

export default function DashboardStats({ data = {} }) {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date().toISOString());

  // Fetch stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get('/api/dashboard/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success && response.data.stats) {
          setStats(response.data.stats);
          setLastUpdated(response.data.timestamp || new Date().toISOString());
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
        setError('Failed to load statistics');

        // Fallback to provided data or defaults
        const defaults = {
          activeUsers: 0,
          admins: 0,
          staffMembers: 0,
          totalBlogs: 0,
          pendingQuoteRequests: 0,
          pendingContactForms: 0,
          totalSubscribers: 0,
        };
        setStats({ ...defaults, ...data });

      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStats();

      // Refresh stats every 5 minutes
      const interval = setInterval(fetchStats, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Use provided data if no token, otherwise use fetched stats
  const displayStats = stats || data || {
    activeUsers: 0,
    admins: 0,
    staffMembers: 0,
    totalBlogs: 0,
    pendingQuoteRequests: 0,
    pendingContactForms: 0,
    totalSubscribers: 0,
  };

  const items = [
    { key: 'activeUsers', label: 'Active Users', value: displayStats.activeUsers, icon: 'activeUsers', gradient: 'from-indigo-500 to-indigo-700' },
    { key: 'admins', label: 'Admin Users', value: displayStats.admins, icon: 'admins', gradient: 'from-pink-500 to-pink-700' },
    { key: 'staffMembers', label: 'Staff Members', value: displayStats.staffMembers, icon: 'staffMembers', gradient: 'from-emerald-500 to-emerald-700' },
    { key: 'totalBlogs', label: 'Total Blogs', value: displayStats.totalBlogs, icon: 'totalBlogs', gradient: 'from-amber-500 to-amber-700' },
    { key: 'pendingQuoteRequests', label: 'Pending Quote Requests', value: displayStats.pendingQuoteRequests, icon: 'pendingQuoteRequests', gradient: 'from-orange-500 to-orange-700' },
    { key: 'pendingContactForms', label: 'Pending Contact Forms', value: displayStats.pendingContactForms, icon: 'pendingContactForms', gradient: 'from-rose-500 to-rose-700' },
    { key: 'totalSubscribers', label: 'Total Subscribers', value: displayStats.totalSubscribers, icon: 'totalSubscribers', gradient: 'from-cyan-500 to-cyan-700' },
  ];


  if (error && !stats) {
    return (
      <section aria-labelledby="dashboard-stats" className="mt-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
          <p className="text-sm">{error}. Using fallback data.</p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="dashboard-stats" className="mt-6">
      <div className="flex flex-col md:flex-row items-start md:justify-between mb-4">
        <h2 id="dashboard-stats" className="text-lg font-semibold text-gray-800">
          Overview {loading && <span className="text-xs text-gray-500">(updating...)</span>}
        </h2>
        <LastUpdated timestamp={lastUpdated} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.key}
            className={`group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 p-3 md:p-4 flex items-start gap-4 transition-all hover:shadow-md hover:-translate-y-0.5 ${
              loading ? 'opacity-60' : ''
            }`}
          >
            {/* Decorative gradient accent */}
            <div
              aria-hidden="true"
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.gradient} opacity-90`}
            />

            <div className="shrink-0">
              <div
                className={`h-12 w-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-sm`}
              >
                <Icon name={item.icon} />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="lg:truncate">
                  <div className="text-xs font-semibold text-gray-500">{item.label}</div>
                  <div className="mt-2">
                    {loading ? (
                      <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
                    ) : (
                      <Count value={item.value} />
                    )}
                  </div>
                </div>

                <div className="text-right text-xs text-gray-400">
                  {/* subtle dot */}
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-gray-200 group-hover:bg-gray-300 transition" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
