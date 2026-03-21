import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bus, Map, Calendar, BookOpen, TrendingUp, IndianRupee, ArrowUpRight } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color, prefix = '' }) => (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5`}>
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>
            <Icon size={26} className="text-white" />
        </div>
        <div>
            <p className="text-sm text-gray-500 font-medium">{label}</p>
            <p className="text-3xl font-bold text-gray-800 mt-0.5">{prefix}{value?.toLocaleString('en-IN') ?? '—'}</p>
        </div>
    </div>
);

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/admin/stats')
            .then(res => setStats(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const statCards = [
        { label: 'Total Bookings', value: stats?.totalBookings, icon: BookOpen, color: 'bg-blue-500' },
        { label: 'Total Revenue', value: stats?.totalRevenue, icon: IndianRupee, color: 'bg-green-500', prefix: '₹' },
        { label: 'Total Buses', value: stats?.totalBuses, icon: Bus, color: 'bg-orange-500' },
        { label: 'Total Routes', value: stats?.totalRoutes, icon: Map, color: 'bg-purple-500' },
        { label: 'Total Trips', value: stats?.totalTrips, icon: Calendar, color: 'bg-pink-500' },
    ];

    const getStatusClass = (status) => {
        if (status === 'Confirmed') return 'bg-green-100 text-green-700';
        if (status === 'Cancelled') return 'bg-red-100 text-red-700';
        return 'bg-yellow-100 text-yellow-700';
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 text-sm mt-1">Welcome back! Here's what's happening with your fleet.</p>
            </div>

            {/* Stat Cards */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 h-28 animate-pulse bg-gray-100" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5">
                    {statCards.map(card => (
                        <StatCard key={card.label} {...card} />
                    ))}
                </div>
            )}

            {/* Recent Bookings */}
            <div className="mt-10">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-gray-800">Recent Bookings</h2>
                    <a href="/admin/bookings" className="text-sm text-orange-500 hover:underline flex items-center gap-1">
                        View all <ArrowUpRight size={14} />
                    </a>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-gray-400">Loading...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="px-5 py-3.5 text-left font-semibold text-gray-600">PNR</th>
                                        <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Passenger</th>
                                        <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Route</th>
                                        <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Date</th>
                                        <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Amount</th>
                                        <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats?.recentBookings?.length === 0 && (
                                        <tr><td colSpan="6" className="px-5 py-8 text-center text-gray-400">No bookings yet</td></tr>
                                    )}
                                    {stats?.recentBookings?.map(booking => (
                                        <tr key={booking._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                            <td className="px-5 py-4 font-mono font-semibold text-orange-600">{booking.PNR}</td>
                                            <td className="px-5 py-4 text-gray-700">{booking.userId?.name || '—'}</td>
                                            <td className="px-5 py-4 text-gray-700">
                                                {booking.tripId?.routeId
                                                    ? `${booking.tripId.routeId.from} → ${booking.tripId.routeId.to}`
                                                    : '—'}
                                            </td>
                                            <td className="px-5 py-4 text-gray-500">
                                                {booking.tripId?.date
                                                    ? new Date(booking.tripId.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                                                    : '—'}
                                            </td>
                                            <td className="px-5 py-4 font-semibold text-gray-800">₹{booking.totalAmount}</td>
                                            <td className="px-5 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusClass(booking.bookingStatus)}`}>
                                                    {booking.bookingStatus}
                                                </span>
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
    );
};

export default AdminDashboard;
