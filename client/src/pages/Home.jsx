import React from 'react';
import SearchForm from '../components/SearchForm';
import { BusFront, ShieldCheck, Zap, Coffee, Wifi, Tv, Map } from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            {/* Hero Section */}
            <div className="relative pt-32 pb-48 flex flex-col items-center justify-center overflow-hidden bg-peach">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-200/40 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-peachDark/50 rounded-full blur-3xl transform -translate-x-1/2"></div>

                {/* Decorative floating bus elements (abstract) */}
                <div className="absolute top-20 left-20 hidden lg:block opacity-20 animation-pulse">
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M4 6 2 7" /><path d="M10 6h4" /><path d="M22 7l-2-1" /><rect width="16" height="16" x="4" y="3" rx="2" /><path d="M4 11h16" /><path d="M8 15h.01" /><path d="M16 15h.01" /><path d="M6 19v2" /><path d="M18 19v2" /></svg>
                </div>

                <div className="relative z-10 w-full max-w-7xl px-4 flex flex-col items-center text-center">
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-600 font-medium text-sm">
                        ✨ Your Journey, Reimagined
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
                        Where Every Journey Feels <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">First Class</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl font-light">
                        Unlock distinctive experiences, best-in-class pricing, and seamless booking for your next adventure across India.
                    </p>

                    <div className="w-full transform translate-y-8 hover:translate-y-6 transition-transform duration-500 z-20 absolute -bottom-12 md:-bottom-24">
                        <SearchForm />
                    </div>
                </div>

                {/* Wavy Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 rotate-180">
                    <svg className="relative block w-[calc(110%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#FFF" className="fill-white"></path>
                    </svg>
                </div>
            </div>

            <div className="bg-white h-24 md:h-16"></div> {/* Spacer for SearchWidget */}

            {/* Features (Amenities) Section */}
            <div className="bg-white py-20 relative">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Premium Amenities</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">More Than a Trip — It's an Experience</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {/* Amenity Card 1 */}
                        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center group hover:bg-peach hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white text-primary transition-colors duration-300">
                                <Coffee size={28} />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Refreshments</h4>
                            <p className="text-sm text-gray-500">Complimentary water and snacks on premium routes.</p>
                        </div>

                        {/* Amenity Card 2 */}
                        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center group hover:bg-peach hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 transform md:translate-y-8 hover:translate-y-6 border border-gray-100">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white text-primary transition-colors duration-300">
                                <Wifi size={28} />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">High-Speed WiFi</h4>
                            <p className="text-sm text-gray-500">Stay connected with our seamless onboard internet.</p>
                        </div>

                        {/* Amenity Card 3 */}
                        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center group hover:bg-peach hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white text-primary transition-colors duration-300">
                                <Tv size={28} />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Entertainment</h4>
                            <p className="text-sm text-gray-500">Personal screens with the latest movies and shows.</p>
                        </div>

                        {/* Amenity Card 4 */}
                        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 flex flex-col items-center text-center group hover:bg-peach hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 transform md:translate-y-8 hover:translate-y-6 border border-gray-100">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary group-hover:text-white text-primary transition-colors duration-300">
                                <ShieldCheck size={28} />
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Safe Journey</h4>
                            <p className="text-sm text-gray-500">GPS tracking, CCTV, and verified professional drivers.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Exclusive Services / Why Choose Us */}
            <div className="bg-gray-50 py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-50 to-transparent"></div>

                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Signature Perks</h2>
                            <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">Setting the Standard in Comfort</h3>
                            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                                Experience a new era of bus travel where comfort meets convenience. Captain Travels is committed to providing a secure, punctual, and absolutely relaxing journey from start to finish.
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-primary flex-shrink-0 border border-orange-100">
                                        <Zap size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-1">Lightning Fast Booking</h4>
                                        <p className="text-gray-500">Secure your seat in under 2 minutes with our streamlined platform.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-primary flex-shrink-0 border border-orange-100">
                                        <Map size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-1">Live Tracking</h4>
                                        <p className="text-gray-500">Share your journey with loved ones for peace of mind.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-primary flex-shrink-0 border border-orange-100">
                                        <BusFront size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-1">Comfy Sleepers</h4>
                                        <p className="text-gray-500">Stretch out in our ergonomically designed sleeper berths.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 relative">
                            {/* Visual Placeholder for a polished image representation */}
                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-orange-500/20 aspect-[4/5] bg-gradient-to-br from-peachDark/80 to-peach flex flex-col justify-end p-8 border border-white">
                                <div className="absolute inset-0 bg-black/10"></div>
                                {/* Can be replaced with an actual image, e.g. <img src="bus-interior.jpg" /> */}
                                <div className="relative z-10 bg-white/90 backdrop-blur pb-6 p-6 rounded-2xl shadow-lg border border-white/50 transform translate-y-4">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xl">
                                            98%
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">On-Time Arrival</p>
                                            <p className="text-sm text-gray-500">Across all active routes</p>
                                        </div>
                                    </div>
                                    <div className="flex -space-x-3 mb-4">
                                        <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=1" alt="Avatar" />
                                        <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=2" alt="Avatar" />
                                        <img className="w-10 h-10 rounded-full border-2 border-white" src="https://i.pravatar.cc/100?img=3" alt="Avatar" />
                                        <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">+8k</div>
                                    </div>
                                    <p className="text-sm font-medium text-gray-600">Happy customers traveled with us this month.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wavy Divider transitioning to Footer (Footer background is white usually) */}
            <div className="w-full overflow-hidden leading-none bg-gray-50 border-gray-50">
                <svg className="relative block w-[calc(110%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#FFF" className="fill-white"></path>
                </svg>
            </div>

        </div>
    );
};

export default Home;
