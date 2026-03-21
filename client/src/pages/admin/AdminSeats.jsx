import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Lock, Unlock } from 'lucide-react';

const AdminSeats = () => {
    const [trips, setTrips] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const [tripDetails, setTripDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState('');

    useEffect(() => {
        axios.get('/api/trips').then(res => setTrips(res.data));
    }, []);

    const loadTrip = async (id) => {
        setLoading(true);
        const res = await axios.get(`/api/trips/${id}`);
        setTripDetails(res.data);
        setSelectedTrip(id);
        setLoading(false);
    };

    const toggleSeat = async (seat) => {
        if (!tripDetails) return;
        const isBooked = tripDetails.bookedSeats.includes(seat);
        const endpoint = isBooked ? 'unblock-seat' : 'block-seat';
        setActionLoading(seat);
        try {
            const res = await axios.put(`/api/trips/${tripDetails._id}/${endpoint}`, { seat });
            setTripDetails(prev => ({ ...prev, bookedSeats: res.data.bookedSeats }));
        } catch (err) {
            alert(err.response?.data?.message || 'Error updating seat');
        } finally {
            setActionLoading('');
        }
    };

    const buildSeats = (trip) => {
        if (!trip?.busId) return [];
        const layout = trip.busId.seatLayout || '2+2';
        const total = trip.busId.totalSeats || 40;
        const cols = layout === '2+1' ? 3 : 4; // columns per row
        const seats = [];
        for (let i = 1; i <= total; i++) {
            const row = Math.ceil(i / cols);
            const col = ((i - 1) % cols) + 1;
            const label = `${row}${String.fromCharCode(64 + col)}`; // 1A, 1B, ...
            seats.push(label);
        }
        return seats;
    };

    const seats = tripDetails ? buildSeats(tripDetails) : [];
    const layout = tripDetails?.busId?.seatLayout || '2+2';
    const cols = layout === '2+1' ? 3 : 4;

    const getSeatStatus = (seat) => {
        return tripDetails?.bookedSeats?.includes(seat) ? 'blocked' : 'available';
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Seat Control</h1>
                <p className="text-gray-500 text-sm mt-1">Manually block or unblock seats for any trip</p>
            </div>

            {/* Trip Selector */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Select a Trip</label>
                <select
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    value={selectedTrip || ''}
                    onChange={e => e.target.value && loadTrip(e.target.value)}
                >
                    <option value="">Choose a trip to manage seats...</option>
                    {trips.map(t => (
                        <option key={t._id} value={t._id}>
                            {t.routeId?.from} → {t.routeId?.to} | {t.busId?.busName} | {t.date && new Date(t.date).toLocaleDateString('en-IN')} | {t.departureTime}
                        </option>
                    ))}
                </select>
            </div>

            {/* Seat Layout */}
            {loading && <div className="bg-white rounded-2xl p-10 text-center text-gray-400">Loading seat layout...</div>}

            {!loading && tripDetails && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    {/* Legend */}
                    <div className="flex items-center gap-6 mb-6 pb-5 border-b border-gray-100">
                        <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-emerald-100 border-2 border-emerald-300" /><span className="text-sm text-gray-600">Available</span></div>
                        <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-red-100 border-2 border-red-300" /><span className="text-sm text-gray-600">Blocked</span></div>
                        <div className="ml-auto text-sm text-gray-500">
                            <span className="font-semibold text-gray-800">{tripDetails.bookedSeats?.length || 0}</span> / {tripDetails.busId?.totalSeats} seats occupied
                        </div>
                    </div>

                    {/* Bus Driver icon */}
                    <div className="flex justify-center mb-6">
                        <div className="bg-gray-100 rounded-xl px-8 py-2 text-xs font-bold text-gray-500 tracking-widest">DRIVER</div>
                    </div>

                    {/* Seats Grid */}
                    <div className={`grid gap-2.5 mx-auto`} style={{ gridTemplateColumns: `repeat(${cols}, 2.5rem)`, width: 'fit-content' }}>
                        {seats.map(seat => {
                            const status = getSeatStatus(seat);
                            const isLoading = actionLoading === seat;
                            return (
                                <button
                                    key={seat}
                                    onClick={() => toggleSeat(seat)}
                                    disabled={isLoading}
                                    title={status === 'blocked' ? `Click to unblock ${seat}` : `Click to block ${seat}`}
                                    className={`w-10 h-10 rounded-lg text-xs font-bold border-2 transition-all flex items-center justify-center
                                        ${status === 'available'
                                            ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-200'
                                            : 'bg-red-50 border-red-300 text-red-700 hover:bg-red-200'
                                        }
                                        ${isLoading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}
                                    `}
                                >
                                    {seat}
                                </button>
                            );
                        })}
                    </div>

                    <p className="text-center text-xs text-gray-400 mt-6">Click any seat to toggle its blocked/available status</p>
                </div>
            )}

            {!loading && !tripDetails && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
                    <div className="text-5xl mb-4">🚌</div>
                    <p className="text-gray-400">Select a trip above to view and manage its seat layout</p>
                </div>
            )}
        </div>
    );
};

export default AdminSeats;
