import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { Wifi } from 'lucide-react';

const BusResults = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const location = useLocation();

    // Parse query params
    const searchParams = new URLSearchParams(location.search);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const date = searchParams.get('date');

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                // In a real app, we would pass params to the API
                const { data } = await axios.get(`http://localhost:5000/api/trips${location.search}`);
                setTrips(data);
            } catch (error) {
                console.error("Error fetching trips:", error);
            } finally {
                setLoading(false);
            }
        };

        if (from && to && date) {
            fetchTrips();
        }
    }, [location.search, from, to, date]);

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Search Header */}
            <div className="bg-white shadow">
                <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-center">
                        <div className="font-bold text-base sm:text-lg">{from} <span className="text-gray-400 mx-1 sm:mx-2">→</span> {to}</div>
                        <div className="bg-gray-200 w-full h-px sm:w-px sm:h-6 hidden sm:block"></div>
                        <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition w-full sm:w-auto justify-center mt-2 sm:mt-0">
                            <span className="font-medium text-gray-700 text-sm sm:text-base">{new Date(date).toDateString()}</span>
                            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-600">Next Day &gt;</span>
                        </div>
                    </div>
                    <Link to="/" className="text-sm font-bold text-primary uppercase border border-primary px-4 py-1.5 rounded hover:bg-primary hover:text-white transition">Modify</Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6 items-start">

                {/* Mobile Filter Toggle */}
                <button 
                    className="md:hidden w-full bg-white font-bold text-gray-700 py-3 rounded shadow-sm border border-gray-200 flex justify-center items-center gap-2"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>

                {/* Sidebar Filter */}
                <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 bg-white shadow rounded-sm p-4 sticky top-24`}>
                    <div className="border-b pb-3 mb-3 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800">FILTERS</h3>
                        <span className="text-sm text-gray-500 cursor-pointer hover:text-primary">CLEAR ALL</span>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-medium text-gray-700 mb-2 text-sm flex items-center gap-2"><Wifi size={14} /> AMENITIES</h4>
                            <div className="space-y-2">
                                {['WIFI', 'Water Bottle', 'Blankets', 'Charging Point'].map(amenity => (
                                    <label key={amenity} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                        <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                                        <span>{amenity}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700 mb-2 text-sm">BUS TYPES</h4>
                            <div className="space-y-2">
                                {['AC', 'Non AC', 'Sleeper', 'Seater'].map(type => (
                                    <label key={type} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                        <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                                        <span>{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Results */}
                <div className="flex-1 w-full">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                            <p className="text-gray-500">Searching for available buses...</p>
                        </div>
                    ) : trips.length === 0 ? (
                        <div className="bg-white p-10 text-center rounded shadow-sm">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">No buses found</h3>
                            <p className="text-gray-500 mb-6">No buses found for this route on this date.</p>
                            <Link to="/" className="text-primary font-bold hover:underline">Search for another route</Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Sorting Header */}
                            <div className="hidden md:flex justify-between items-center text-xs font-bold text-gray-500 bg-white p-3 rounded-t shadow-sm border-b">
                                <div className="w-1/4">BUS OPERATOR</div>
                                <div className="w-1/6 text-center">DEPARTURE</div>
                                <div className="w-1/6 text-center">DURATION</div>
                                <div className="w-1/6 text-center">ARRIVAL</div>
                                <div className="w-1/6 text-right">PRICE</div>
                                <div className="w-1/6 text-right"></div>
                            </div>

                            {trips.map((trip) => (
                                <div key={trip._id} className="bg-white shadow-sm border border-transparent hover:border-gray-300 hover:shadow-md transition-all duration-200">
                                    <div className="p-4 flex flex-col md:flex-row items-start md:items-center text-sm">

                                        {/* Operator Info */}
                                        <div className="w-full md:w-1/4 mb-4 md:mb-0">
                                            <h3 className="font-bold text-gray-800 text-base">{trip.busId.busName}</h3>
                                            <p className="text-gray-500 text-xs mt-1">{trip.busId.busType}</p>
                                            <div className="flex gap-2 mt-2">
                                                {trip.busId.amenities.slice(0, 3).map((amenity, i) => (
                                                    <span key={i} className="text-[10px] bg-gray-100 text-gray-500 px-1 rounded flex items-center gap-0.5">
                                                        {amenity.includes('WiFi') ? <Wifi size={8} /> : null}
                                                        {amenity}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Departure */}
                                        <div className="w-full md:w-1/6 mb-2 md:mb-0 text-center">
                                            <div className="font-bold text-lg text-gray-800">{trip.departureTime}</div>
                                            <div className="text-xs text-gray-500 font-medium">From Station</div>
                                        </div>

                                        {/* Duration */}
                                        <div className="w-full md:w-1/6 mb-2 md:mb-0 text-center text-gray-400 text-xs">
                                            <div className="mb-1">{trip.routeId.duration}</div>
                                            <div className="w-full bg-gray-200 h-px relative">
                                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Arrival */}
                                        <div className="w-full md:w-1/6 mb-2 md:mb-0 text-center">
                                            <div className="font-bold text-lg text-gray-700">{trip.arrivalTime}</div>
                                            <div className="text-xs text-red-500 font-medium">{new Date(date).getDate() + 1}-{new Date(date).toLocaleString('default', { month: 'short' })}</div>
                                        </div>

                                        {/* Price */}
                                        <div className="w-full md:w-1/6 mb-4 md:mb-0 text-right pr-6">
                                            <div className="font-bold text-xl text-gray-800">₹{trip.price}</div>
                                            <div className="text-xs text-green-600 bg-green-50 px-1 py-0.5 rounded inline-block mt-1">Digital Pay Safe</div>
                                        </div>

                                        {/* Action */}
                                        <div className="w-full md:w-1/6 flex md:block items-center justify-between md:text-right mt-4 md:mt-0">
                                            <div className="text-xs text-gray-400 md:mb-2">{trip.busId.totalSeats - trip.bookedSeats.length} Seats Left</div>
                                            <Link to={`/book/${trip._id}`} className="bg-primary text-white font-bold text-xs uppercase px-6 py-2 rounded shadow hover:bg-orange-700 transition block md:inline-block text-center whitespace-nowrap">
                                                Select Seats
                                            </Link>
                                        </div>

                                    </div>
                                    <div className="bg-gray-50 px-4 py-2 flex justify-end gap-6 text-xs text-gray-500 font-medium uppercase border-t border-dashed border-gray-200">
                                        <span className="cursor-pointer hover:text-primary">Boarding & Dropping Points</span>
                                        <span className="cursor-pointer hover:text-primary">Trip Details</span>
                                        <span className="cursor-pointer hover:text-primary">Cancellation Policy</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BusResults;
