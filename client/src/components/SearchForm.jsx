import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Calendar, BusFront, ArrowRightLeft } from 'lucide-react';

const SearchForm = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [dateType, setDateType] = useState('text');
    const [locations, setLocations] = useState([]);

    const [showFromDropdown, setShowFromDropdown] = useState(false);
    const [showToDropdown, setShowToDropdown] = useState(false);

    const fromRef = useRef(null);
    const toRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/locations');
                setLocations(data);
            } catch (error) {
                console.error("Error fetching locations", error);
            }
        };
        fetchLocations();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (fromRef.current && !fromRef.current.contains(event.target)) {
                setShowFromDropdown(false);
            }
            if (toRef.current && !toRef.current.contains(event.target)) {
                setShowToDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (from && to && date) {
            navigate(`/buses?from=${from}&to=${to}&date=${date}`);
        }
    };

    const swapLocations = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
    };

    const filteredFrom = locations.filter(loc => loc.toLowerCase().includes(from.toLowerCase()));
    const filteredTo = locations.filter(loc => loc.toLowerCase().includes(to.toLowerCase()));

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-[32px] shadow-[0_15px_40px_-10px_rgba(249,115,22,0.15)] flex flex-col md:flex-row items-center max-w-5xl mx-auto overflow-visible divide-y md:divide-y-0 md:divide-x divide-gray-100 border border-gray-100 transition-all duration-300 hover:shadow-[0_20px_50px_-10px_rgba(249,115,22,0.2)]">
            <div className="flex-1 w-full relative group transition-colors focus-within:bg-orange-50/30" ref={fromRef}>
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                    <BusFront size={24} />
                </div>
                <input
                    type="text"
                    className="w-full h-20 pl-16 pr-8 bg-transparent outline-none text-xl font-medium text-gray-800 placeholder-gray-400"
                    placeholder="From"
                    value={from}
                    onChange={(e) => {
                        setFrom(e.target.value);
                        setShowFromDropdown(true);
                    }}
                    onFocus={() => setShowFromDropdown(true)}
                    required
                />
                {showFromDropdown && filteredFrom.length > 0 && (
                    <ul className="absolute z-50 left-0 w-full bg-white mt-2 rounded-xl shadow-lg border border-gray-100 max-h-60 overflow-y-auto">
                        {filteredFrom.map((loc, idx) => (
                            <li
                                key={idx}
                                className="px-6 py-3 hover:bg-orange-50 cursor-pointer flex items-center gap-3 text-gray-700"
                                onClick={() => {
                                    setFrom(loc);
                                    setShowFromDropdown(false);
                                }}
                            >
                                <MapPin size={16} className="text-gray-400" />
                                <span className="font-medium text-lg">{loc}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="relative flex-initial z-10 hidden md:block">
                <button
                    type="button"
                    onClick={swapLocations}
                    className="w-12 h-12 bg-white hover:bg-orange-50 text-gray-400 hover:text-primary rounded-full flex items-center justify-center shadow-md absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all active:rotate-180 hover:scale-110 border border-gray-100"
                >
                    <ArrowRightLeft strokeWidth={2.5} size={20} />
                </button>
            </div>

            <div className="flex-1 w-full relative group transition-colors focus-within:bg-orange-50/30" ref={toRef}>
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                    <MapPin size={24} />
                </div>
                <input
                    type="text"
                    className="w-full h-20 pl-16 pr-8 bg-transparent outline-none text-xl font-medium text-gray-800 placeholder-gray-400"
                    placeholder="To"
                    value={to}
                    onChange={(e) => {
                        setTo(e.target.value);
                        setShowToDropdown(true);
                    }}
                    onFocus={() => setShowToDropdown(true)}
                    required
                />
                {showToDropdown && filteredTo.length > 0 && (
                    <ul className="absolute z-50 left-0 w-full bg-white mt-2 rounded-xl shadow-lg border border-gray-100 max-h-60 overflow-y-auto">
                        {filteredTo.map((loc, idx) => (
                            <li
                                key={idx}
                                className="px-6 py-3 hover:bg-orange-50 cursor-pointer flex items-center gap-3 text-gray-700"
                                onClick={() => {
                                    setTo(loc);
                                    setShowToDropdown(false);
                                }}
                            >
                                <MapPin size={16} className="text-gray-400" />
                                <span className="font-medium text-lg">{loc}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex-1 w-full relative group transition-colors focus-within:bg-orange-50/30">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors cursor-pointer" onClick={() => { if(toRef.current?.nextElementSibling?.querySelector('input')) toRef.current.nextElementSibling.querySelector('input').focus(); }}>
                    <Calendar size={24} />
                </div>
                <input
                    type={dateType}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full h-20 pl-16 pr-8 bg-transparent outline-none text-xl font-medium text-gray-800 placeholder-gray-400 cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:left-0"
                    placeholder="Journey Date"
                    value={date}
                    onFocus={() => setDateType('date')}
                    onBlur={(e) => { if (!e.target.value) setDateType('text'); }}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>

            <button
                type="submit"
                className="w-full md:w-auto h-20 px-12 bg-primary text-white font-bold text-xl hover:bg-orange-600 transition-colors md:rounded-r-[32px] md:rounded-l-none outline-none focus:ring-4 focus:ring-orange-500/30 flex items-center justify-center gap-2"
            >
                <span>SEARCH BUSES</span>
            </button>
        </form>
    );
};

export default SearchForm;
