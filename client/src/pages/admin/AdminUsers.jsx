import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Shield, ShieldOff, BookOpen, X, User } from 'lucide-react';

const paymentClass = (status) => {
    if (status === 'Completed') return 'bg-blue-100 text-blue-700';
    if (status === 'Refunded') return 'bg-purple-100 text-purple-700';
    return 'bg-yellow-100 text-yellow-700';
};
const bookingClass = (status) => {
    if (status === 'Confirmed') return 'bg-green-100 text-green-700';
    return 'bg-red-100 text-red-600';
};

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

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [historyUser, setHistoryUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);

    const fetchUsers = () => {
        setLoading(true);
        axios.get('/api/users').then(res => setUsers(res.data)).finally(() => setLoading(false));
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleBlock = async (user) => {
        const action = user.isBlocked ? 'Unblock' : 'Block';
        if (!window.confirm(`${action} user ${user.name}?`)) return;
        try {
            await axios.put(`/api/users/${user._id}/block`);
            fetchUsers();
        } catch (err) {
            alert(err.response?.data?.message || 'Error updating user');
        }
    };

    const viewBookings = async (user) => {
        setHistoryUser(user);
        setHistoryLoading(true);
        const res = await axios.get(`/api/users/${user._id}/bookings`);
        setBookings(res.data);
        setHistoryLoading(false);
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-500 text-sm mt-1">{users.length} registered users</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-10 text-center text-gray-400">Loading users...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">User</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Phone</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Role</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Joined</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Status</th>
                                    <th className="px-5 py-3.5 text-right font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 && (
                                    <tr><td colSpan="6" className="px-5 py-10 text-center text-gray-400">No users found.</td></tr>
                                )}
                                {users.map(user => (
                                    <tr key={user._id} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${user.isBlocked ? 'opacity-60' : ''}`}>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                                    {user.name?.[0]?.toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{user.name}</p>
                                                    <p className="text-xs text-gray-400">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-gray-600">{user.phone}</td>
                                        <td className="px-5 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-gray-500 text-xs">
                                            {new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${user.isBlocked ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                                                {user.isBlocked ? 'Blocked' : 'Active'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => viewBookings(user)}
                                                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition" title="View booking history">
                                                    <BookOpen size={15} />
                                                </button>
                                                {user.role !== 'admin' && (
                                                    <button
                                                        onClick={() => handleBlock(user)}
                                                        className={`p-2 rounded-lg transition ${user.isBlocked ? 'hover:bg-green-50 text-green-600' : 'hover:bg-red-50 text-red-500'}`}
                                                        title={user.isBlocked ? 'Unblock user' : 'Block user'}
                                                    >
                                                        {user.isBlocked ? <ShieldOff size={15} /> : <Shield size={15} />}
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

            {/* Booking History Modal */}
            {historyUser && (
                <Modal title={`Bookings – ${historyUser.name}`} onClose={() => { setHistoryUser(null); setBookings([]); }}>
                    {historyLoading ? (
                        <div className="text-center py-10 text-gray-400">Loading...</div>
                    ) : bookings.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">No bookings found for this user.</div>
                    ) : (
                        <div className="space-y-3">
                            {bookings.map(b => (
                                <div key={b._id} className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                                    <div className="font-mono font-bold text-orange-600 text-sm w-24 flex-shrink-0">{b.PNR}</div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-800">
                                            {b.tripId?.routeId?.from} → {b.tripId?.routeId?.to}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {b.tripId?.date && new Date(b.tripId.date).toLocaleDateString('en-IN')} · Seats: {b.seats?.join(', ')}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-800">₹{b.totalAmount}</p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${bookingClass(b.bookingStatus)}`}>{b.bookingStatus}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Modal>
            )}
        </div>
    );
};

export default AdminUsers;
