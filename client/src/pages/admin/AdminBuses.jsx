import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2, X, Wifi, Wind, Tv, Coffee, Zap, Accessibility } from 'lucide-react';

const AMENITY_OPTIONS = ['WiFi', 'AC', 'Charging Point', 'TV', 'Blanket', 'Water Bottle', 'Snacks'];
const BUS_TYPES = ['AC', 'Non-AC', 'Sleeper', 'Seater', 'AC Sleeper', 'AC Seater'];

const initialForm = {
    busName: '', busNumber: '', busType: 'AC', totalSeats: 40,
    seatLayout: '2+2', amenities: [], images: ''
};

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

const AdminBuses = () => {
    const [buses, setBuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editBus, setEditBus] = useState(null);
    const [form, setForm] = useState(initialForm);
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const fetchBuses = () => {
        setLoading(true);
        axios.get('/api/buses').then(res => setBuses(res.data)).finally(() => setLoading(false));
    };

    useEffect(() => { fetchBuses(); }, []);

    const openAdd = () => { setForm(initialForm); setEditBus(null); setShowModal(true); };
    const openEdit = (bus) => {
        setForm({ ...bus, images: bus.images?.join(', ') || '', amenities: bus.amenities || [] });
        setEditBus(bus);
        setShowModal(true);
    };

    const toggleAmenity = (a) => {
        setForm(prev => ({
            ...prev,
            amenities: prev.amenities.includes(a) ? prev.amenities.filter(x => x !== a) : [...prev.amenities, a]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const payload = {
            ...form,
            images: form.images ? form.images.split(',').map(s => s.trim()).filter(Boolean) : []
        };
        try {
            if (editBus) {
                await axios.put(`/api/buses/${editBus._id}`, payload);
            } else {
                await axios.post('/api/buses', payload);
            }
            setShowModal(false);
            fetchBuses();
        } catch (err) {
            alert(err.response?.data?.message || 'Error saving bus');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/buses/${id}`);
            setDeleteConfirm(null);
            fetchBuses();
        } catch (err) {
            alert(err.response?.data?.message || 'Error deleting bus');
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Bus Management</h1>
                    <p className="text-gray-500 text-sm mt-1">{buses.length} buses in fleet</p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition"
                >
                    <Plus size={18} /> Add New Bus
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-10 text-center text-gray-400">Loading buses...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Bus Name</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Number</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Type</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Seats</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Layout</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Amenities</th>
                                    <th className="px-5 py-3.5 text-right font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {buses.length === 0 && (
                                    <tr><td colSpan="7" className="px-5 py-10 text-center text-gray-400">No buses added yet. Click "Add New Bus" to get started.</td></tr>
                                )}
                                {buses.map(bus => (
                                    <tr key={bus._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-4 font-semibold text-gray-800">{bus.busName}</td>
                                        <td className="px-5 py-4 font-mono text-gray-600">{bus.busNumber}</td>
                                        <td className="px-5 py-4">
                                            <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold">{bus.busType}</span>
                                        </td>
                                        <td className="px-5 py-4 text-gray-700">{bus.totalSeats}</td>
                                        <td className="px-5 py-4 text-gray-700">{bus.seatLayout}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {bus.amenities?.slice(0, 3).map(a => (
                                                    <span key={a} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">{a}</span>
                                                ))}
                                                {bus.amenities?.length > 3 && (
                                                    <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs">+{bus.amenities.length - 3}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => openEdit(bus)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"><Pencil size={16} /></button>
                                                <button onClick={() => setDeleteConfirm(bus)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <Modal title={editBus ? 'Edit Bus' : 'Add New Bus'} onClose={() => setShowModal(false)}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bus Name *</label>
                                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    value={form.busName} onChange={e => setForm(p => ({ ...p, busName: e.target.value }))} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bus Number *</label>
                                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    value={form.busNumber} onChange={e => setForm(p => ({ ...p, busNumber: e.target.value }))} required />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bus Type *</label>
                                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    value={form.busType} onChange={e => setForm(p => ({ ...p, busType: e.target.value }))}>
                                    {BUS_TYPES.map(t => <option key={t}>{t}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Total Seats *</label>
                                <input type="number" min="1" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    value={form.totalSeats} onChange={e => setForm(p => ({ ...p, totalSeats: e.target.value }))} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Seat Layout *</label>
                                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    value={form.seatLayout} onChange={e => setForm(p => ({ ...p, seatLayout: e.target.value }))}>
                                    <option value="2+1">2+1</option>
                                    <option value="2+2">2+2</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                            <div className="flex flex-wrap gap-2">
                                {AMENITY_OPTIONS.map(a => (
                                    <button type="button" key={a}
                                        onClick={() => toggleAmenity(a)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                                            form.amenities.includes(a)
                                                ? 'bg-orange-500 text-white border-orange-500'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
                                        }`}
                                    >{a}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bus Images (comma-separated URLs)</label>
                            <textarea rows="2" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                                placeholder="https://example.com/bus1.jpg, https://example.com/bus2.jpg"
                                value={form.images} onChange={e => setForm(p => ({ ...p, images: e.target.value }))} />
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                            <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white transition disabled:opacity-60">
                                {saving ? 'Saving...' : (editBus ? 'Update Bus' : 'Add Bus')}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {/* Delete Confirm */}
            {deleteConfirm && (
                <Modal title="Confirm Delete" onClose={() => setDeleteConfirm(null)}>
                    <p className="text-gray-600 mb-6">Are you sure you want to delete <strong>{deleteConfirm.busName}</strong>? This action cannot be undone.</p>
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                        <button onClick={() => handleDelete(deleteConfirm._id)} className="px-5 py-2 rounded-lg text-sm font-semibold bg-red-500 hover:bg-red-600 text-white transition">Delete</button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminBuses;
