import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50 h-20 flex items-center border-b border-gray-100">
            <div className="container mx-auto px-4 flex justify-between items-center h-full">
                {/* Logo Section */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/ctlogo.jpeg" alt="Kishuka Travels Logo" className="h-12 w-auto object-contain" />
                    </Link>
                </div>

                {/* Right Menu (Desktop) */}
                <div className="hidden lg:flex items-center gap-6">
                    <div className="relative group cursor-pointer h-full flex items-center">
                        <div className="flex items-center gap-1 text-gray-700 hover:text-primary transition font-medium py-2">
                            <span>Manage Ticket</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white shadow-xl border border-gray-100 rounded-lg py-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-100 transform rotate-45"></div>
                            <Link to="/manage-booking" className="block px-5 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-orange-50 hover:pl-6 transition-all relative z-10">Download Ticket</Link>
                            <Link to="/manage-booking" className="block px-5 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-orange-50 hover:pl-6 transition-all relative z-10">Track Your Bus</Link>
                            <Link to="/manage-booking" className="block px-5 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-orange-50 hover:pl-6 transition-all relative z-10">Cancel Ticket</Link>
                            <Link to="/manage-booking" className="block px-5 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-orange-50 hover:pl-6 transition-all relative z-10">Check Refund Status</Link>
                        </div>
                    </div>

                    <Link to="/contact" className="flex items-center gap-1 text-gray-700 hover:text-primary transition font-medium">
                        <span>Contact Us</span>
                    </Link>
                    {user ? (
                        <div className="flex items-center gap-3 group relative cursor-pointer bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 hover:border-gray-300 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-sm">
                                <span>{user.name.charAt(0).toUpperCase()}</span>
                            </div>
                            <span className="text-gray-800 font-medium text-sm hidden sm:block">{user.name.split(' ')[0]}</span>
                            <div className="h-4 w-px bg-gray-300 mx-1 hidden sm:block"></div>
                            <button onClick={logout} className="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors">Logout</button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span>Login / Sign Up</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle button */}
                <div className="lg:hidden flex items-center">
                    <button 
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="text-gray-700 hover:text-primary focus:outline-none p-2"
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] bg-black/50 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
            )}

            {/* Mobile Menu Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-5 flex justify-between items-center border-b border-gray-100">
                    <span className="font-bold text-gray-800 text-lg">Menu</span>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-red-500 p-1">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-4 px-5 flex flex-col gap-6">
                    {user ? (
                        <div className="bg-orange-50 p-4 rounded-xl flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-sm">
                                <span>{user.name.charAt(0).toUpperCase()}</span>
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">{user.name}</p>
                                <button 
                                    onClick={() => {
                                        logout();
                                        setIsMobileMenuOpen(false);
                                    }} 
                                    className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors mt-1"
                                >
                                    Log out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link 
                            to="/login" 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="bg-primary text-white text-center py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
                        >
                            Login / Sign Up
                        </Link>
                    )}

                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Manage</p>
                        <Link to="/manage-booking" className="font-medium text-gray-700 py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Download Ticket</Link>
                        <Link to="/manage-booking" className="font-medium text-gray-700 py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Track Your Bus</Link>
                        <Link to="/manage-booking" className="font-medium text-gray-700 py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Cancel Ticket</Link>
                        <Link to="/manage-booking" className="font-medium text-gray-700 py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Check Refund Status</Link>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Support</p>
                        <Link to="/contact" className="font-medium text-gray-700 py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
                        <Link to="/faq" className="font-medium text-gray-700 py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>FAQs</Link>
                        <Link to="/terms" className="font-medium text-gray-700 py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
