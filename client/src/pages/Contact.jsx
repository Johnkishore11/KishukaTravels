import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
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
            // Using the feedback endpoint for contact form submissions as well
            await axios.post('http://localhost:5000/api/feedback', formData);
            setStatus({ type: 'success', message: 'Your message has been sent successfully. We will get back to you soon!' });
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
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                {/* Header Phase */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch with Us</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Have a question, concern, or special request? We're here to help! Reach out to us through any of the channels below or fill out the form.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {/* Information Cards */}
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center flex flex-col items-center hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-orange-100 text-primary rounded-full flex items-center justify-center mb-6">
                            <MapPin size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Head Office</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            No. 123, Travel Plaza, Main Road,<br />
                            Chennai, Tamil Nadu - 600001
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center flex flex-col items-center hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                            <Phone size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Phone Support</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            Talk to our customer support executive for instant queries.
                        </p>
                        <p className="text-lg font-bold text-blue-600 mt-2">+91 98765 43210</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-8 text-center flex flex-col items-center hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                            <Mail size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Email Support</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            Send us your queries and we'll reply within 24 hours.
                        </p>
                        <a href="mailto:support@kishukatravels.com" className="text-lg font-bold text-green-600 mt-2 hover:underline">
                            support@kishukatravels.com
                        </a>
                    </div>
                </div>

                {/* Form and Map Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Map Mockup */}
                    <div className="h-96 lg:h-auto bg-gray-200 relative">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15546.516541604085!2d80.25203795!3d13.04533035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526620f4ae877b%3A0xc6cbfa848d7065aa!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1709403332000!5m2!1sen!2sin" 
                            className="absolute inset-0 w-full h-full border-0" 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Office Location"
                        ></iframe>
                    </div>

                    {/* Contact Form */}
                    <div className="p-8 md:p-12">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
                        
                        {status.message && (
                            <div className={`p-4 mb-6 rounded-md ${status.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'} border text-sm`}>
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
                                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50"
                                    placeholder="Enter your full name"
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
                                        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50"
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
                                        className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Your Message *</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none bg-gray-50"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full md:w-auto px-8 py-3 rounded-md text-white font-bold text-center flex justify-center items-center gap-2 transition-all
                                    ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-orange-600 hover:shadow-lg hover:-translate-y-0.5'}`}
                            >
                                {loading ? 'Sending...' : (
                                    <>
                                        Send Message <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
