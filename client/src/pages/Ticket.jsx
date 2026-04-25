import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Download, CheckCircle } from 'lucide-react';

const Ticket = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/bookings/${id}`, { withCredentials: true });
                setBooking(data);
            } catch (error) {
                console.error("Error fetching booking:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooking();
    }, [id]);

    const handleDownload = () => {
        window.open(`http://localhost:5000/api/bookings/${id}/ticket`, '_blank');
    };

    if (loading) return <div className="text-center py-20">Loading ticket...</div>;
    if (!booking) return <div className="text-center py-20">Ticket not found.</div>;

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="container mx-auto max-w-2xl text-center mb-8">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-800">Booking Confirmed!</h1>
                <p className="text-gray-600">Your ticket has been successfully booked.</p>
            </div>

            <div className="container mx-auto max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden print:shadow-none">
                <div className="bg-primary text-white p-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold">Kishuka Travels</h2>
                        <p className="text-sm opacity-80">E-Ticket</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold">PNR: {booking.PNR}</p>
                    </div>
                </div>

                <div className="p-8">
                    <div className="flex flex-col md:flex-row justify-between mb-8 border-b pb-6">
                        <div>
                            <p className="text-gray-500 text-sm">Bus Details</p>
                            <p className="font-bold text-lg">{booking.tripId.busId.busName}</p>
                            <p className="text-gray-600">{booking.tripId.busId.busNumber} • {booking.tripId.busId.busType}</p>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                            <p className="text-gray-500 text-sm">Date</p>
                            <p className="font-bold text-lg">{new Date(booking.tripId.date).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{booking.tripId.departureTime}</p>
                            <p className="text-sm text-gray-500">{booking.tripId.routeId.from}</p>
                        </div>
                        <div className="border-b-2 border-dotted border-gray-300 w-1/3 relative text-center">
                            <span className="text-xs text-gray-400 absolute -top-4 left-1/2 transform -translate-x-1/2">{booking.tripId.routeId.duration}</span>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-gray-800">{booking.tripId.arrivalTime}</p>
                            <p className="text-sm text-gray-500">{booking.tripId.routeId.to}</p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="font-bold text-gray-800 mb-4">Passenger Details</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-gray-500 text-sm border-b">
                                        <th className="pb-2">Name</th>
                                        <th className="pb-2">Age</th>
                                        <th className="pb-2">Seat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {booking.passengerDetails.map((passenger, index) => (
                                        <tr key={index} className="border-b last:border-0 hover:bg-gray-100">
                                            <td className="py-2">{passenger.name}</td>
                                            <td className="py-2">{passenger.age}</td>
                                            <td className="py-2 font-bold text-primary">{booking.seats[index]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex justify-between items-center border-t pt-6">
                        <div>
                            <p className="text-gray-500 text-sm">Total Amount Paid</p>
                            <p className="text-2xl font-bold text-green-600">₹{booking.totalAmount}</p>
                        </div>
                        <div className="flex gap-4">
                            <Link to="/" className="text-primary hover:underline px-4 py-2">Back to Home</Link>
                            <button
                                onClick={handleDownload}
                                className="bg-gray-800 text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-gray-900 transition shadow"
                            >
                                <Download size={18} /> Download Ticket
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ticket;
