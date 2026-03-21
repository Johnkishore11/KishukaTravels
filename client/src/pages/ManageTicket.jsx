import React, { useState } from 'react';
import axios from 'axios';
import { Ticket, Search, Download, XCircle, MapPin, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';

const ManageTicket = () => {
    const [formData, setFormData] = useState({ pnr: '', emailOrPhone: '' });
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [actionLoading, setActionLoading] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await axios.post('http://localhost:5000/api/bookings/manage', formData);
            setBooking(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch booking details');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        setActionLoading('download');
        try {
            const response = await axios.post('http://localhost:5000/api/bookings/manage/download', formData, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `ticket-${booking.PNR}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (err) {
            alert('Failed to download ticket');
        } finally {
            setActionLoading(null);
        }
    };

    const handleCancel = async () => {
        if (!window.confirm('Are you sure you want to cancel this ticket? This action cannot be undone.')) return;
        
        setActionLoading('cancel');
        try {
            await axios.post('http://localhost:5000/api/bookings/manage/cancel', formData);
            setBooking({ ...booking, bookingStatus: 'Cancelled' });
            alert('Ticket has been cancelled successfully. Refund will be initiated shortly.');
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to cancel ticket');
        } finally {
            setActionLoading(null);
        }
    };

    const mockAction = (message) => {
        alert(message);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4 font-sans">
            <div className="w-full max-w-3xl">
                {!booking ? (
                    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-orange-100 text-primary rounded-full flex items-center justify-center">
                                <Ticket size={32} />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Manage Your Ticket</h2>
                        <p className="text-center text-gray-500 mb-8 text-sm">Enter your PNR details to view, download, or cancel your booking.</p>
                        
                        {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm font-medium text-center border border-red-100">{error}</div>}

                        <form onSubmit={handleSearch} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Ticket PNR Number</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary uppercase transition-all"
                                    placeholder="e.g. CT819302"
                                    value={formData.pnr}
                                    onChange={(e) => setFormData({ ...formData, pnr: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email ID or Mobile Number</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    placeholder="Registered Email or Phone"
                                    value={formData.emailOrPhone}
                                    onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-lg shadow transition-all focus:outline-none focus:ring-4 focus:ring-orange-500/30 flex justify-center items-center gap-2 mt-4"
                            >
                                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <><Search size={20} /> Fetch Booking</>}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
                        <div className="bg-gray-900 text-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">Booking Overview</h2>
                                <p className="text-gray-400 mt-1">PNR: <span className="text-white font-medium">{booking.PNR}</span></p>
                            </div>
                            <button onClick={() => setBooking(null)} className="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors border border-gray-700">Back to Search</button>
                        </div>
                        
                        <div className="p-6 md:p-8 border-b border-gray-100">
                            <div className="flex flex-col md:flex-row justify-between gap-6 relative">
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400 font-medium tracking-wide uppercase mb-1">From</p>
                                    <p className="text-xl font-bold text-gray-900">{booking.tripId.routeId.from}</p>
                                    <p className="text-gray-500">{booking.tripId.departureTime}</p>
                                </div>
                                <div className="hidden md:flex flex-col justify-center items-center flex-1">
                                    <span className="text-xs text-gray-400 font-medium bg-gray-100 px-3 py-1 rounded-full">{booking.tripId.routeId.duration}</span>
                                    <div className="w-full h-px bg-gray-200 mt-2 relative">
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-primary bg-white"></div>
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary outline outline-2 outline-white"></div>
                                    </div>
                                </div>
                                <div className="flex-1 text-left md:text-right">
                                    <p className="text-sm text-gray-400 font-medium tracking-wide uppercase mb-1">To</p>
                                    <p className="text-xl font-bold text-gray-900">{booking.tripId.routeId.to}</p>
                                    <p className="text-gray-500">{booking.tripId.arrivalTime}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-8 border-t border-gray-100">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Date</p>
                                    <p className="font-bold text-gray-900">{new Date(booking.tripId.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Bus Operator</p>
                                    <p className="font-bold text-gray-900 truncate">{booking.tripId.busId.busName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Seats ({booking.seats.length})</p>
                                    <p className="font-bold text-gray-900">{booking.seats.join(', ')}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Total Fare</p>
                                    <p className="font-bold text-gray-900">₹{booking.totalAmount}</p>
                                </div>
                            </div>
                        </div>

                        {/* Status Label */}
                        <div className="px-6 md:px-8 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">Ticket Status:</span>
                            {booking.bookingStatus === 'Confirmed' ? (
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"><CheckCircle size={16} /> Confirmed</span>
                            ) : (
                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"><XCircle size={16} /> Cancelled</span>
                            )}
                        </div>

                        {/* Management Options */}
                        <div className="p-6 md:p-8">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Management Options</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                
                                {booking.bookingStatus === 'Confirmed' ? (
                                    <>
                                        <button 
                                            onClick={handleDownload}
                                            disabled={actionLoading === 'download'}
                                            className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-primary hover:bg-orange-50 transition-colors text-left group"
                                        >
                                            <div className="bg-orange-100 text-primary p-2 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                                {actionLoading === 'download' ? <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div> : <Download size={20} />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 group-hover:text-primary transition-colors">Download E-Ticket</p>
                                                <p className="text-xs text-gray-500">Get a PDF copy of your ticket</p>
                                            </div>
                                        </button>

                                        <button 
                                            onClick={handleCancel}
                                            disabled={actionLoading === 'cancel'}
                                            className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-colors text-left group"
                                        >
                                            <div className="bg-red-100 text-red-500 p-2 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors">
                                                {actionLoading === 'cancel' ? <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div> : <XCircle size={20} />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 group-hover:text-red-600 transition-colors">Cancel Ticket</p>
                                                <p className="text-xs text-gray-500">Instantly cancel and initiate refund</p>
                                            </div>
                                        </button>

                                        <button 
                                            onClick={() => mockAction('Live tracking link will be sent via SMS to your registered mobile number 1 hour before departure.')}
                                            className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-left group"
                                        >
                                            <div className="bg-blue-100 text-blue-500 p-2 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Track Your Bus</p>
                                                <p className="text-xs text-gray-500">View live GPS tracking</p>
                                            </div>
                                        </button>

                                        <button 
                                            onClick={() => mockAction('To change your travel date, please cancel this ticket and book a new one.')}
                                            className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-colors text-left group"
                                        >
                                            <div className="bg-gray-100 text-gray-600 p-2 rounded-lg group-hover:bg-gray-600 group-hover:text-white transition-colors">
                                                <Calendar size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">Change Travel Date</p>
                                                <p className="text-xs text-gray-500">Modify your journey explicitly</p>
                                            </div>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="col-span-1 md:col-span-2 flex items-start gap-4 p-4 border border-red-200 bg-red-50 rounded-xl">
                                            <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="font-bold text-red-800">Ticket Cancelled</h4>
                                                <p className="text-sm text-red-600 mt-1">This booking was cancelled. Below is your refund status.</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50 text-left">
                                            <div className="bg-gray-200 text-gray-600 p-2 rounded-lg">
                                                <CheckCircle size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">Refund Status</p>
                                                <p className="text-sm text-blue-600 font-bold">{booking.paymentStatus === 'Completed' ? 'Processing (5-7 Bus. Days)' : booking.paymentStatus}</p>
                                            </div>
                                        </div>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageTicket;
