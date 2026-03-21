import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const initialForm = { busId: '', routeId: '', date: '', departureTime: '', arrivalTime: '', price: '' };

const Modal = ({ title, onClose, children }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b">
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition"><X size={20} /></button>
            </div>
            <div className="p-6">{children}</div>
        </div>
    </div>
);

const AdminTrips = () => {
    const [trips, setTrips] = useState([]);
    const [buses, setBuses] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editTrip, setEditTrip] = useState(null);
    const [form, setForm] = useState(initialForm);
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const fetchAll = async () => {
        setLoading(true);
        const [tripsRes, busesRes, routesRes] = await Promise.all([
            axios.get('/api/trips'),
            axios.get('/api/buses'),
            axios.get('/api/routes')
        ]);
        setTrips(tripsRes.data);
        setBuses(busesRes.data);
        setRoutes(routesRes.data);
        setLoading(false);
    };

    useEffect(() => { fetchAll(); }, []);

    const openAdd = () => {
        setForm({ ...initialForm, busId: buses[0]?._id || '', routeId: routes[0]?._id || '' });
        setEditTrip(null);
        setShowModal(true);
    };

    const openEdit = (trip) => {
        setForm({
            busId: trip.busId?._id || trip.busId,
            routeId: trip.routeId?._id || trip.routeId,
            date: trip.date ? new Date(trip.date).toISOString().slice(0, 10) : '',
            departureTime: trip.departureTime,
            arrivalTime: trip.arrivalTime,
            price: trip.price
        });
        setEditTrip(trip);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editTrip) {
                await axios.put(`/api/trips/${editTrip._id}`, form);
            } else {
                await axios.post('/api/trips', form);
            }
            setShowModal(false);
            fetchAll();
        } catch (err) {
            alert(err.response?.data?.message || 'Error saving trip');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/trips/${id}`);
            setDeleteConfirm(null);
            fetchAll();
        } catch (err) {
            alert(err.response?.data?.message || 'Error deleting trip');
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Trip Management</h1>
                    <p className="text-gray-500 text-sm mt-1">{trips.length} trips scheduled</p>
                </div>
                <button onClick={openAdd} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition">
                    <Plus size={18} /> Create Trip
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-10 text-center text-gray-400">Loading trips...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Bus</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Route</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Date</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Departure</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Arrival</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Price</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Seats Booked</th>
                                    <th className="px-5 py-3.5 text-right font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trips.length === 0 && (
                                    <tr><td colSpan="8" className="px-5 py-10 text-center text-gray-400">No trips created yet.</td></tr>
                                )}
                                {trips.map(trip => (
                                    <tr key={trip._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-4">
                                            <p className="font-semibold text-gray-800">{trip.busId?.busName || '—'}</p>
                                            <p className="text-xs text-gray-400">{trip.busId?.busType}</p>
                                        </td>
                                        <td className="px-5 py-4 font-medium text-gray-700">
                                            {trip.routeId ? `${trip.routeId.from} → ${trip.routeId.to}` : '—'}
                                        </td>
                                        <td className="px-5 py-4 text-gray-600">
                                            {trip.date ? new Date(trip.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                                        </td>
                                        <td className="px-5 py-4 text-gray-600">{trip.departureTime}</td>
                                        <td className="px-5 py-4 text-gray-600">{trip.arrivalTime}</td>
                                        <td className="px-5 py-4 font-semibold text-gray-800">₹{trip.price}</td>
                                        <td className="px-5 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                trip.bookedSeats?.length >= trip.busId?.totalSeats
                                                    ? 'bg-red-100 text-red-600'
                                                    : 'bg-green-100 text-green-700'
                                            }`}>
                                                {trip.bookedSeats?.length || 0} / {trip.busId?.totalSeats || '—'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => openEdit(trip)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"><Pencil size={16} /></button>
                                                <button onClick={() => setDeleteConfirm(trip)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showModal && (
                <Modal title={editTrip ? 'Edit Trip' : 'Create New Trip'} onClose={() => setShowModal(false)}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bus *</label>
                            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                value={form.busId} onChange={e => setForm(p => ({ ...p, busId: e.target.value }))} required>
                                <option value="">Select a bus</option>
                                {buses.map(b => <option key={b._id} value={b._id}>{b.busName} ({b.busNumber})</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Route *</label>
                            <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                value={form.routeId} onChange={e => setForm(p => ({ ...p, routeId: e.target.value }))} required>
                                <option value="">Select a route</option>
                                {routes.map(r => <option key={r._id} value={r._id}>{r.from} → {r.to}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                            <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} required />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Departure *</label>
                                <input type="time" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    value={form.departureTime} onChange={e => setForm(p => ({ ...p, departureTime: e.target.value }))} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Arrival *</label>
                                <input type="time" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    value={form.arrivalTime} onChange={e => setForm(p => ({ ...p, arrivalTime: e.target.value }))} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                                <input type="number" min="1" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} required />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                            <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white transition disabled:opacity-60">
                                {saving ? 'Saving...' : (editTrip ? 'Update Trip' : 'Create Trip')}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {deleteConfirm && (
                <Modal title="Confirm Delete" onClose={() => setDeleteConfirm(null)}>
                    <p className="text-gray-600 mb-6">Delete this trip? This will remove all seat availability data.</p>
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                        <button onClick={() => handleDelete(deleteConfirm._id)} className="px-5 py-2 rounded-lg text-sm font-semibold bg-red-500 hover:bg-red-600 text-white transition">Delete</button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminTrips;
