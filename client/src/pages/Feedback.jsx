import React, { useState } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';

const Feedback = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await axios.post('http://localhost:5000/api/feedback', formData);
            setStatus({ type: 'success', message: 'Thank you for your feedback!' });
            setFormData({ name: '', phone: '', email: '', message: '' });
        } catch (error) {
            setStatus({ 
                type: 'error', 
                message: error.response?.data?.message || 'Something went wrong. Please try again.' 
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">We Value Your Feedback</h2>
                    <p className="text-gray-500 mt-2">Please share your experience with Captain Travels</p>
                </div>

                {status.message && (
                    <div className={`p-4 mb-6 rounded-md ${status.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'} border`}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                                required
                                maxLength="10"
                                pattern="\d{10}"
                                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="9876543210"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Your Feedback *</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                            placeholder="Tell us what you loved or what we can improve..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 rounded-md text-white font-bold text-lg flex justify-center items-center gap-2 transition-all shadow-md
                            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary hover:bg-green-600 hover:shadow-lg focus:ring-4 focus:ring-green-300'}`}
                    >
                        {loading ? 'Submitting...' : (
                            <>
                                Submit Feedback <Send size={18} />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
