import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2, X, Tag } from 'lucide-react';

const initialForm = {
    code: '', discountType: 'flat', discountValue: '', minAmount: 0,
    maxUses: 100, expiresAt: '', isActive: true
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

const AdminCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editCoupon, setEditCoupon] = useState(null);
    const [form, setForm] = useState(initialForm);
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const fetchCoupons = () => {
        setLoading(true);
        axios.get('/api/coupons').then(res => setCoupons(res.data)).finally(() => setLoading(false));
    };

    useEffect(() => { fetchCoupons(); }, []);

    const openAdd = () => { setForm(initialForm); setEditCoupon(null); setShowModal(true); };
    const openEdit = (coupon) => {
        setForm({
            code: coupon.code,
            discountType: coupon.discountType,
            discountValue: coupon.discountValue,
            minAmount: coupon.minAmount,
            maxUses: coupon.maxUses,
            expiresAt: coupon.expiresAt ? new Date(coupon.expiresAt).toISOString().slice(0, 10) : '',
            isActive: coupon.isActive
        });
        setEditCoupon(coupon);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editCoupon) {
                await axios.put(`/api/coupons/${editCoupon._id}`, form);
            } else {
                await axios.post('/api/coupons', form);
            }
            setShowModal(false);
            fetchCoupons();
        } catch (err) {
            alert(err.response?.data?.message || 'Error saving coupon');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/coupons/${id}`);
            setDeleteConfirm(null);
            fetchCoupons();
        } catch (err) {
            alert(err.response?.data?.message || 'Error deleting coupon');
        }
    };

    const isExpired = (date) => new Date(date) < new Date();

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Coupons & Offers</h1>
                    <p className="text-gray-500 text-sm mt-1">{coupons.length} coupons</p>
                </div>
                <button onClick={openAdd} className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition">
                    <Plus size={18} /> Create Coupon
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-10 text-center text-gray-400">Loading coupons...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Code</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Type</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Discount</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Min Amount</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Uses</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Expires</th>
                                    <th className="px-5 py-3.5 text-left font-semibold text-gray-600">Status</th>
                                    <th className="px-5 py-3.5 text-right font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {coupons.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="px-5 py-12 text-center">
                                            <div className="flex flex-col items-center gap-3 text-gray-400">
                                                <Tag size={36} strokeWidth={1} />
                                                <p>No coupons yet. Create your first offer!</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {coupons.map(coupon => (
                                    <tr key={coupon._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-4">
                                            <span className="font-mono font-bold text-gray-800 bg-orange-50 text-orange-700 px-2.5 py-1 rounded-lg text-sm">
                                                {coupon.code}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${coupon.discountType === 'percent' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                                {coupon.discountType === 'percent' ? 'Percent' : 'Flat'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 font-semibold text-gray-800">
                                            {coupon.discountType === 'percent' ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}
                                        </td>
                                        <td className="px-5 py-4 text-gray-600">₹{coupon.minAmount}</td>
                                        <td className="px-5 py-4 text-gray-600">
                                            {coupon.usedCount} / {coupon.maxUses}
                                        </td>
                                        <td className="px-5 py-4 text-gray-500 text-xs">
                                            {new Date(coupon.expiresAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-5 py-4">
                                            {isExpired(coupon.expiresAt) ? (
                                                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">Expired</span>
                                            ) : coupon.isActive ? (
                                                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Active</span>
                                            ) : (
                                                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600">Inactive</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => openEdit(coupon)} className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition"><Pencil size={16} /></button>
                                                <button onClick={() => setDeleteConfirm(coupon)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"><Trash2 size={16} /></button>
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
                <Modal title={editCoupon ? 'Edit Coupon' : 'Create Coupon'} onClose={() => setShowModal(false)}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code *</label>
                            <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-orange-400"
                                value={form.code} onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))}
                                placeholder="e.g. SUMMER20" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type *</label>
                                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    value={form.discountType} onChange={e => setForm(p => ({ ...p, discountType: e.target.value }))}>
                                    <option value="flat">Flat (₹)</option>
                                    <option value="percent">Percent (%)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value *</label>
                                <input type="number" min="1" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    value={form.discountValue} onChange={e => setForm(p => ({ ...p, discountValue: e.target.value }))} required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Min Amount (₹)</label>
                                <input type="number" min="0" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    value={form.minAmount} onChange={e => setForm(p => ({ ...p, minAmount: e.target.value }))} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Max Uses</label>
                                <input type="number" min="1" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    value={form.maxUses} onChange={e => setForm(p => ({ ...p, maxUses: e.target.value }))} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                            <input type="date" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                                value={form.expiresAt} onChange={e => setForm(p => ({ ...p, expiresAt: e.target.value }))} required />
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="isActive" checked={form.isActive} onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))}
                                className="w-4 h-4 accent-orange-500 rounded" />
                            <label htmlFor="isActive" className="text-sm text-gray-700">Active (users can apply this coupon)</label>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                            <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white transition disabled:opacity-60">
                                {saving ? 'Saving...' : (editCoupon ? 'Update Coupon' : 'Create Coupon')}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {deleteConfirm && (
                <Modal title="Confirm Delete" onClose={() => setDeleteConfirm(null)}>
                    <p className="text-gray-600 mb-6">Delete coupon <strong>{deleteConfirm.code}</strong>?</p>
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                        <button onClick={() => handleDelete(deleteConfirm._id)} className="px-5 py-2 rounded-lg text-sm font-semibold bg-red-500 hover:bg-red-600 text-white transition">Delete</button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default AdminCoupons;
