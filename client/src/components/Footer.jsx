import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Ticket, Clock, CreditCard, Shield, ChevronRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white pt-16 border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/ctlogo.jpeg" alt="Captain Travels Logo" className="h-16 w-auto object-contain" />
                        </Link>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Book <span className="text-primary font-bold">Captain Travels</span> Bus tickets online in website and from your mobile with few easy steps.
                        </p>
                        <div className="pt-4">
                            <Link to="/my-bookings" className="text-sm font-medium text-primary hover:text-orange-700 transition flex items-center gap-1">
                                Go to My Bookings to manage your account <ChevronRight size={14} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'FAQ', path: '/faq' },
                                { name: 'Terms & Conditions', path: '/terms' },
                                { name: 'Privacy Policy', path: '/privacy' },
                                { name: 'Feedback', path: '/feedback' },
                                { name: 'Boarding Places', path: '#' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-gray-600 hover:text-primary text-sm flex items-center gap-2 transition-colors group">
                                        <ChevronRight size={14} className="text-gray-300 group-hover:text-primary transition-colors" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Head Office */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Head Office</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-gray-600 group">
                                <div className="mt-1 min-w-[20px] text-primary">
                                    <MapPin size={18} />
                                </div>
                                <span className="group-hover:text-gray-900 transition-colors">
                                    No. 123, Travel Plaza, Main Road,<br />
                                    Chennai, Tamil Nadu - 600001
                                </span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600 group">
                                <div className="text-primary">
                                    <Phone size={18} />
                                </div>
                                <span className="group-hover:text-gray-900 transition-colors">+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-600 group">
                                <div className="text-primary">
                                    <Mail size={18} />
                                </div>
                                <a href="mailto:support@captaintravels.com" className="group-hover:text-gray-900 transition-colors">support@captaintravels.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Manage Ticket */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Manage Ticket</h3>
                        <ul className="space-y-3">
                            {['Download Ticket', 'Track Your Bus', 'Cancel Ticket', 'Change Boarding Point', 'Change Travel Date', 'Check Refund Status'].map((item) => (
                                <li key={item}>
                                    <Link to="/manage-booking" className="text-gray-600 hover:text-primary text-sm flex items-center gap-2 transition-colors group">
                                        <ChevronRight size={14} className="text-gray-300 group-hover:text-primary transition-colors" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* App Download Section */}
                <div className="border-t border-gray-100 py-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                    <div className="max-w-xl relative z-10">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Our App</h3>
                        <p className="text-gray-600 mb-6">Get the app for exclusive offers and faster booking experience.</p>
                        <div className="flex gap-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12 w-auto cursor-pointer hover:opacity-90 transition-opacity" />
                            {/* App Store badge could go here */}
                        </div>
                    </div>

                    {/* Decorative Bus Image */}
                    <div className="relative z-10 hidden md:block">
                        <img
                            src="https://s3.rdbuz.com/web/images/homeV2/app-install/app-install-img.png"
                            alt="Captain Travels App"
                            className="h-64 w-auto object-contain transform translate-y-6 hover:translate-y-4 transition-transform duration-500"
                        />
                    </div>

                    {/* Background decoration */}
                    <div className="absolute right-0 bottom-0 w-2/3 h-full bg-gradient-to-l from-orange-50 to-transparent rounded-l-full -z-0 opacity-50"></div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 py-6 text-center md:flex md:justify-between md:items-center">
                    <p className="text-sm text-gray-500 text-center md:text-left">
                        Designed & Developed by <span className="font-bold text-gray-700">Kishore J</span>
                    </p>
                    <div className="flex justify-center gap-4 mt-4 md:mt-0">
                        {[Facebook, Twitter, Instagram].map((Icon, index) => (
                            <a key={index} href="#" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white transition-all">
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
