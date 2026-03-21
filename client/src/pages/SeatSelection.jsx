import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Disc } from 'lucide-react';

const SeatSelection = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [trip, setTrip] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/trips/${id}`);
                setTrip(data);
            } catch (error) {
                setError('Failed to load trip details');
            } finally {
                setLoading(false);
            }
        };

        fetchTrip();
    }, [id]);

    const handleSeatClick = (seatNumber) => {
        if (trip.bookedSeats.includes(seatNumber)) return;

        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
        } else {
            if (selectedSeats.length >= 6) {
                alert('You can only select up to 6 seats');
                return;
            }
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    const handleProceed = () => {
        if (!user) {
            navigate('/login?redirect=/book/' + id);
            return;
        }
        if (selectedSeats.length === 0) return;

        navigate('/checkout', { state: { trip, selectedSeats } });
    };

    // Helper to generate seat layout
    const renderSeats = () => {
        const totalSeats = trip.busId.totalSeats;
        const layout = trip.busId.seatLayout; // '2+1' or '2+2'
        const seats = [];

        // Simplified Logic: 
        // 2+2 means: [Seat] [Seat]  [Aisle]  [Seat] [Seat]
        // 2+1 means: [Seat] [Seat]  [Aisle]  [Seat]

        // We'll just generate rows. Assuming ~4 seats per row for 2+2 or 3 for 2+1
        const seatsPerRow = layout === '2+2' ? 4 : 3;
        const totalRows = Math.ceil(totalSeats / seatsPerRow);
        const aisleIndex = 2; // After 2nd seat

        for (let i = 0; i < totalRows; i++) {
            let rowSeats = [];
            for (let j = 0; j < seatsPerRow; j++) {
                const seatNum = `${i + 1}${String.fromCharCode(65 + j)}`; // 1A, 1B...
                const isBooked = trip.bookedSeats.includes(seatNum);
                const isSelected = selectedSeats.includes(seatNum);

                let seatClass = "w-10 h-10 m-1 rounded flex items-center justify-center cursor-pointer text-sm font-bold border transition duration-200 ";

                if (isBooked) {
                    seatClass += "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300";
                } else if (isSelected) {
                    seatClass += "bg-green-500 text-white border-green-500 hover:bg-green-600";
                } else {
                    seatClass += "bg-white text-gray-700 border-gray-400 hover:border-primary hover:text-primary";
                }

                rowSeats.push(
                    <div
                        key={seatNum}
                        className={seatClass}
                        onClick={() => handleSeatClick(seatNum)}
                    >
                        {/* {seatNum} */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 18V11C4 8.79086 5.79086 7 8 7H16C18.2091 7 20 8.79086 20 11V18C20 19.6569 18.6569 21 17 21H7C5.34315 21 4 19.6569 4 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 18V15H20V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                );

                // Add aisle
                if (j === 1) {
                    rowSeats.push(<div key={`aisle-${i}`} className="w-8"></div>);
                }
            }
            seats.push(<div key={i} className="flex justify-center">{rowSeats}</div>);
        }
        return seats;
    };

    if (loading) return <div className="text-center py-20">Loading seat layout...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Seats - {trip.busId.busName}</h2>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Seat Layout */}
                    <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
                        <div className="flex justify-end mb-4">
                            <Disc size={32} className="text-gray-400 rotate-90" /> {/* Driver icon */}
                        </div>
                        <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                            <div className="space-y-2 mb-4 bg-gray-50/50 p-4 rounded border border-gray-100 min-w-[300px] sm:min-w-fit w-fit mx-auto">
                                {renderSeats()}
                            </div>
                        </div>

                        <div className="flex justify-center gap-6 text-sm">
                            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded border border-gray-400 bg-white"></div> Available</div>
                            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded border border-green-500 bg-green-500"></div> Selected</div>
                            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded border border-gray-300 bg-gray-300"></div> Booked</div>
                        </div>
                    </div>

                    {/* Booking Summary */}
                    <div className="w-full md:w-80 bg-white p-6 rounded-lg shadow-lg h-fit">
                        <h3 className="text-lg font-bold mb-4 border-b pb-2">Booking Summary</h3>
                        <div className="mb-4">
                            <p className="text-sm text-gray-500">Route</p>
                            <p className="font-semibold">{trip.routeId.from} ➔ {trip.routeId.to}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-semibold">{new Date(trip.date).toLocaleDateString()}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-sm text-gray-500">Selected Seats</p>
                            <p className="font-semibold text-primary">{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</p>
                        </div>
                        <div className="mb-6">
                            <p className="text-sm text-gray-500">Total Price</p>
                            <p className="text-2xl font-bold text-green-600">₹{selectedSeats.length * trip.price}</p>
                        </div>

                        <button
                            onClick={handleProceed}
                            disabled={selectedSeats.length === 0}
                            className={`w-full py-3 rounded font-bold text-white transition shadow-lg ${selectedSeats.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary hover:bg-green-600'}`}
                        >
                            Proceed to Book
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
