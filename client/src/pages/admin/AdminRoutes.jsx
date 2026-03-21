import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const initialForm = { from: '', to: '', duration: '', distance: '', boardingPoints: [''], droppingPoints: [''] };

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

const PointsInput = ({ label, points, onChange }) => {
    const add = () => onChange([...points, '']);
    const remove = (i) => onChange(points.filter((_, idx) => idx !== i));
    const update = (i, val) => onChange(points.map((p, idx) => idx === i ? val : p));

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">{label}</label>
                <button type="button" onClick={add} className="text-xs text-orange-500 hover:underline flex items-center gap-1"><Plus size={12} /> Add</button>
            </div>
            <div className="space-y-2">
                {points.map((p, i) => (
                    <div key={i} className="flex gap-2">
                        <input
                            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                            placeholder={`Point ${i + 1}`}
                            value={p}
                            onChange={e => update(i, e.target.value)}
                        />
                        {points.length > 1 && (
                            <button type="button" onClick={() => remove(i)} className="p-2 text-red-400 hover:text-red-600 transition"><X size={15} /></button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const AdminRoutes = () => {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editRoute, setEditRoute] = useState(null);
    const [form, setForm] = useState(initialForm);
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const fetchRoutes = () => {
        setLoading(true);
        axios.get('/api/routes').then(res => setRoutes(res.data)).finally(() => setLoading(false));
    };

    useEffect(() => { fetchRoutes(); }, []);

    const openAdd = () => { setForm(initialForm); setEditRoute(null); setShowModal(true); };
    const openEdit = (route) => {
        setForm({
            from: route.from, to: route.to, duration: route.duration, distance: route.distance || '',
            boardingPoints: route.boardingPoints?.length ? route.boardingPoints : [''],
            droppingPoints: route.droppingPoints?.length ? route.droppingPoints : ['']
        });
        setEditRoute(route);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const payload = {
            ...form,
            boardingPoints: form.boardingPoints.filter(Boolean),
            droppingPoints: form.droppingPoints.filter(Boolean)
        };
        try {
            if (editRoute) {
                await axios.put(`/api/routes/${editRoute._id}`, payload);
            } else {
                await axios.post('/api/routes', payload);
            }
            setShowModal(false);
            fetchRoutes();
        } catch (err) {
            alert(err.response?.data?.message || 'Error saving route');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/routes/${id}`);
            setDeleteConfirm(null);
            fetchRoutes();
        } catch (err) {
            alert(err.response?.data?.message || 'Error deleting route');
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Route Management</h1>
                    <p className="text-gray-500 text-sm mt-1">{routes.length} routes configured</p>
                </div>
                <button onClick={openAdd} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition">
                    <Plus size={18} /> Add New Route
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-10 text-center text-gray-400">Loading routes...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">From</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">To</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Duration</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Distance</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Boarding</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Dropping</th>
                                    <th className="px-5 py-3.5 text-right font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {routes.length === 0 && (
                                    <tr><td colSpan="7" className="px-5 py-10 text-center text-gray-400">No routes added yet.</td></tr>
                                )}
                                {routes.map(route => (
                                    <tr key={route._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-4 font-semibold text-gray-800">{route.from}</td>
                                        <td className="px-5 py-4 font-semibold text-gray-800">{route.to}</td>
                                        <td className="px-5 py-4 text-gray-600">{route.duration}</td>
                                        <td className="px-5 py-4 text-gray-600">{route.distance || '—'}</td>
                                        <td className="px-5 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {route.boardingPoints?.slice(0, 2).map(p => (
                                                    <span key={p} className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs">{p}</span>
                                                ))}
                                                {route.boardingPoints?.length > 2 && <span className="text-xs text-gray-400">+{route.boardingPoints.length - 2}</span>}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {route.droppingPoints?.slice(0, 2).map(p => (
                                                    <span key={p} className="bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-xs">{p}</span>
                                                ))}
                                                {route.droppingPoints?.length > 2 && <span className="text-xs text-gray-400">+{route.droppingPoints.length - 2}</span>}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => openEdit(route)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"><Pencil size={16} /></button>
                                                <button onClick={() => setDeleteConfirm(route)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"><Trash2 size={16} /></button>
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
                <Modal title={editRoute ? 'Edit Route' : 'Add New Route'} onClose={() => setShowModal(false)}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">From *</label>
                                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    value={form.from} onChange={e => setForm(p => ({ ...p, from: e.target.value }))} required placeholder="e.g. Chennai" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">To *</label>
                                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    value={form.to} onChange={e => setForm(p => ({ ...p, to: e.target.value }))} required placeholder="e.g. Bangalore" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))} required placeholder="e.g. 6h 30m" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Distance</label>
                                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    value={form.distance} onChange={e => setForm(p => ({ ...p, distance: e.target.value }))} placeholder="e.g. 350 km" />
                            </div>
                        </div>
                        <PointsInput
                            label="Boarding Points"
                            points={form.boardingPoints}
                            onChange={pts => setForm(p => ({ ...p, boardingPoints: pts }))}
                        />
                        <PointsInput
                            label="Dropping Points"
                            points={form.droppingPoints}
                            onChange={pts => setForm(p => ({ ...p, droppingPoints: pts }))}
                        />
                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                            <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white transition disabled:opacity-60">
                                {saving ? 'Saving...' : (editRoute ? 'Update Route' : 'Add Route')}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {deleteConfirm && (
                <Modal title="Confirm Delete" onClose={() => setDeleteConfirm(null)}>
                    <p className="text-gray-600 mb-6">Delete route <strong>{deleteConfirm.from} → {deleteConfirm.to}</strong>?</p>
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                        <button onClick={() => handleDelete(deleteConfirm._id)} className="px-5 py-2 rounded-lg text-sm font-semibold bg-red-500 hover:bg-red-600 text-white transition">Delete</button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminRoutes;
