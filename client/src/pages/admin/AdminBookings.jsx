import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Filter, X, Eye, Download, Ban, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

const Modal = ({ title, onClose, children }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition"><X size={20} /></button>
            </div>
            <div className="p-6">{children}</div>
        </div>
    </div>
);

const statusClass = (status) => {
    if (status === 'Confirmed') return 'bg-green-100 text-green-700';
    if (status === 'Cancelled') return 'bg-red-100 text-red-600';
    return 'bg-gray-100 text-gray-600';
};
const paymentClass = (status) => {
    if (status === 'Completed') return 'bg-blue-100 text-blue-700';
    if (status === 'Refunded') return 'bg-purple-100 text-purple-700';
    if (status === 'Failed') return 'bg-red-100 text-red-600';
    return 'bg-yellow-100 text-yellow-700';
};

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterDate, setFilterDate] = useState('');
    const [filterRoute, setFilterRoute] = useState('');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [actionLoading, setActionLoading] = useState('');

    const fetchBookings = async () => {
        setLoading(true);
        const params = {};
        if (filterDate) params.date = filterDate;
        if (filterRoute) params.routeId = filterRoute;
        const res = await axios.get('/api/bookings', { params });
        setBookings(res.data);
        setLoading(false);
    };

    useEffect(() => {
        axios.get('/api/routes').then(res => setRoutes(res.data));
    }, []);

    useEffect(() => { fetchBookings(); }, [filterDate, filterRoute]);

    const handleCancel = async (booking) => {
        if (!window.confirm(`Cancel booking ${booking.PNR}? This will free the seats.`)) return;
        setActionLoading(booking._id + '_cancel');
        try {
            await axios.put(`/api/bookings/${booking._id}/cancel`);
            fetchBookings();
            setSelectedBooking(null);
        } catch (err) {
            alert(err.response?.data?.message || 'Error cancelling booking');
        } finally {
            setActionLoading('');
        }
    };

    const handleRefund = async (booking) => {
        if (!window.confirm(`Trigger refund for ${booking.PNR}?`)) return;
        setActionLoading(booking._id + '_refund');
        try {
            await axios.put(`/api/bookings/${booking._id}/refund`);
            fetchBookings();
            setSelectedBooking(null);
        } catch (err) {
            alert(err.response?.data?.message || 'Error processing refund');
        } finally {
            setActionLoading('');
        }
    };

    const handleCSVDownload = () => {
        window.open('/api/bookings/export/csv', '_blank');
    };

    const clearFilters = () => { setFilterDate(''); setFilterRoute(''); };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
                    <p className="text-gray-500 text-sm mt-1">{bookings.length} bookings found</p>
                </div>
                <button onClick={handleCSVDownload}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition">
                    <Download size={16} /> Export CSV
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5 flex flex-wrap gap-4 items-end">
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Filter by Date</label>
                    <input type="date" className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        value={filterDate} onChange={e => setFilterDate(e.target.value)} />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Filter by Route</label>
                    <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                        value={filterRoute} onChange={e => setFilterRoute(e.target.value)}>
                        <option value="">All Routes</option>
                        {routes.map(r => <option key={r._id} value={r._id}>{r.from} → {r.to}</option>)}
                    </select>
                </div>
                {(filterDate || filterRoute) && (
                    <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition py-2">
                        <X size={14} /> Clear
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-10 text-center text-gray-400">Loading bookings...</div>
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
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Payment</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Status</th>
                                    <th className="px-5 py-3.5 text-right font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.length === 0 && (
                                    <tr><td colSpan="8" className="px-5 py-10 text-center text-gray-400">No bookings found.</td></tr>
                                )}
                                {bookings.map(booking => (
                                    <tr key={booking._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-4 font-mono font-semibold text-orange-600">{booking.PNR}</td>
                                        <td className="px-5 py-4">
                                            <p className="font-medium text-gray-800">{booking.userId?.name || '—'}</p>
                                            <p className="text-xs text-gray-400">{booking.userId?.email}</p>
                                        </td>
                                        <td className="px-5 py-4 text-gray-700">
                                            {booking.tripId?.routeId ? `${booking.tripId.routeId.from} → ${booking.tripId.routeId.to}` : '—'}
                                        </td>
                                        <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                                            {booking.tripId?.date ? new Date(booking.tripId.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                                        </td>
                                        <td className="px-5 py-4 font-semibold text-gray-800">₹{booking.totalAmount}</td>
                                        <td className="px-5 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${paymentClass(booking.paymentStatus)}`}>
                                                {booking.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusClass(booking.bookingStatus)}`}>
                                                {booking.bookingStatus}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button onClick={() => setSelectedBooking(booking)}
                                                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition" title="View details">
                                                    <Eye size={15} />
                                                </button>
                                                {booking.bookingStatus === 'Confirmed' && (
                                                    <button onClick={() => handleCancel(booking)}
                                                        disabled={actionLoading === booking._id + '_cancel'}
                                                        className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition" title="Cancel booking">
                                                        <Ban size={15} />
                                                    </button>
                                                )}
                                                {booking.bookingStatus === 'Cancelled' && booking.paymentStatus !== 'Refunded' && (
                                                    <button onClick={() => handleRefund(booking)}
                                                        disabled={actionLoading === booking._id + '_refund'}
                                                        className="p-2 rounded-lg hover:bg-purple-50 text-purple-600 transition" title="Trigger refund">
                                                        <RefreshCw size={15} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedBooking && (
                <Modal title={`Booking Details – ${selectedBooking.PNR}`} onClose={() => setSelectedBooking(null)}>
                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Trip Info</p>
                                <p className="text-sm font-medium text-gray-800">{selectedBooking.tripId?.busId?.busName} ({selectedBooking.tripId?.busId?.busNumber})</p>
                                <p className="text-sm text-gray-600">{selectedBooking.tripId?.routeId?.from} → {selectedBooking.tripId?.routeId?.to}</p>
                                <p className="text-sm text-gray-500">{selectedBooking.tripId?.date && new Date(selectedBooking.tripId.date).toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                <p className="text-sm text-gray-500">{selectedBooking.tripId?.departureTime} → {selectedBooking.tripId?.arrivalTime}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Payment</p>
                                <p className="text-2xl font-bold text-gray-800">₹{selectedBooking.totalAmount}</p>
                                <div className="mt-2 flex gap-2">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${paymentClass(selectedBooking.paymentStatus)}`}>{selectedBooking.paymentStatus}</span>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusClass(selectedBooking.bookingStatus)}`}>{selectedBooking.bookingStatus}</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">Seats: {selectedBooking.seats?.join(', ')}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Passenger Details</p>
                            <div className="space-y-2">
                                {selectedBooking.passengerDetails?.map((p, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-gray-50 rounded-lg px-4 py-3">
                                        <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">{p.name}</p>
                                            <p className="text-xs text-gray-500">{p.age} yrs · {p.gender}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2 border-t">
                            {selectedBooking.bookingStatus === 'Confirmed' && (
                                <button onClick={() => handleCancel(selectedBooking)} className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition">
                                    Cancel Booking
                                </button>
                            )}
                            {selectedBooking.bookingStatus === 'Cancelled' && selectedBooking.paymentStatus !== 'Refunded' && (
                                <button onClick={() => handleRefund(selectedBooking)} className="px-4 py-2 rounded-lg text-sm font-semibold bg-purple-50 text-purple-600 hover:bg-purple-100 transition">
                                    Trigger Refund
                                </button>
                            )}
                            <button onClick={() => setSelectedBooking(null)} className="px-5 py-2 rounded-lg text-sm font-semibold bg-gray-800 text-white hover:bg-gray-900 transition">Close</button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminBookings;
