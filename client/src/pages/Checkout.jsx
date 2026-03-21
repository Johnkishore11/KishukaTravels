import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Checkout = () => {
    const { state } = useLocation();
    const { trip, selectedSeats } = state || {};
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [passengerDetails, setPassengerDetails] = useState(
        selectedSeats.map(() => ({ name: '', age: '', gender: 'Male' }))
    );
    const [contactDetails, setContactDetails] = useState({
        email: user?.email || '',
        phone: user?.phone || ''
    });
    const [residentialAddress, setResidentialAddress] = useState({
        state: '',
        city: ''
    });

    const handleDetailChange = (index, field, value) => {
        const updatedDetails = [...passengerDetails];
        updatedDetails[index][field] = value;
        setPassengerDetails(updatedDetails);
    };

    const handlePayment = async () => {
        try {
            // Validate details
            if (passengerDetails.some(p => !p.name || !p.age)) {
                alert('Please fill in all passenger details');
                return;
            }
            if (!contactDetails.email || !contactDetails.phone) {
                alert('Please provide contact details');
                return;
            }
            if (!residentialAddress.city || !residentialAddress.state) {
                alert('Please provide residential location address');
                return;
            }

            const totalAmount = selectedSeats.length * trip.price;

            // Create Booking
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`, // Assuming token handling via cookie or interceptor (cookie default) but backend check req.cookies
                },
                withCredentials: true // Important for cookies
            };

            const { data } = await axios.post('http://localhost:5000/api/bookings', {
                tripId: trip._id,
                seats: selectedSeats,
                passengerDetails,
                contactDetails,
                residentialAddress,
                totalAmount,
                paymentId: 'PAY' + Date.now(), // Mock Payment ID
                orderId: 'ORD' + Date.now() // Mock Order ID
            }, config);

            navigate(`/ticket/${data._id}`);

        } catch (error) {
            console.error("Booking failed:", error);
            alert(error.response?.data?.message || 'Booking failed');
        }
    };

    if (!state) return <div className="text-center py-20">No booking details found.</div>;

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Review and Fill in Passenger Details to Proceed</h2>

                {/* Trip Detailed Summary */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                {trip.busId?.busName || 'Bus'} <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-bold">AC</span>
                            </h3>
                            <p className="text-2xl font-bold mt-2">{trip.routeId?.from} - {trip.routeId?.to}</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm mt-4 border-t pt-4">
                        <div className="flex-1 w-full md:w-auto">
                            <p className="font-semibold text-gray-600">{trip.routeId?.from}</p>
                            <p className="text-gray-800 font-bold mt-1">
                                {new Date(trip.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}, {trip.departureTime}
                            </p>
                        </div>
                        
                        <div className="flex-1 w-full md:w-auto my-4 md:my-0 text-center flex items-center justify-center gap-2 text-gray-400">
                            <span className="w-16 md:w-24 h-px bg-gray-300"></span>
                            <span className="text-xs font-semibold px-2">Duration</span>
                            <span className="w-16 md:w-24 h-px bg-gray-300"></span>
                        </div>

                        <div className="flex-1 w-full md:w-auto text-right md:text-right">
                            <p className="font-semibold text-gray-600">{trip.routeId?.to}</p>
                            <p className="text-gray-800 font-bold mt-1">
                                {trip.arrivalTime}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                        {/* Contact Details */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="font-bold mb-4 text-gray-800">Contact Details <span className="text-red-500">*</span></h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="tel"
                                        className="w-full border rounded px-3 py-2"
                                        value={contactDetails.phone}
                                        onChange={(e) => setContactDetails({...contactDetails, phone: e.target.value.replace(/\D/g, '')})}
                                        placeholder="Mobile Number"
                                        maxLength="10"
                                        pattern="\d{10}"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        className="w-full border rounded px-3 py-2"
                                        value={contactDetails.email}
                                        onChange={(e) => setContactDetails({...contactDetails, email: e.target.value})}
                                        placeholder="Email Address"
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">Your booking details will be sent to this email address and mobile.</p>
                        </div>

                        {/* Passenger Details */}
                        <h3 className="font-bold text-gray-800 mt-6">Passenger Details <span className="text-red-500">*</span></h3>
                        {selectedSeats.map((seat, index) => (
                            <div key={seat} className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <span className="bg-orange-100 text-orange-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">{index + 1}</span>
                                    Passenger for Seat {seat}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-gray-600 text-sm mb-1">Name</label>
                                        <input
                                            type="text"
                                            className="w-full border rounded px-3 py-2"
                                            value={passengerDetails[index].name}
                                            onChange={(e) => handleDetailChange(index, 'name', e.target.value)}
                                            placeholder="Full Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-600 text-sm mb-1">Age</label>
                                        <input
                                            type="number"
                                            className="w-full border rounded px-3 py-2"
                                            value={passengerDetails[index].age}
                                            onChange={(e) => handleDetailChange(index, 'age', e.target.value)}
                                            placeholder="Age"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-gray-600 text-sm mb-1">Gender</label>
                                    <div className="flex gap-4">
                                        {['Male', 'Female', 'Other'].map(gender => (
                                            <label key={gender} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name={`gender-${index}`}
                                                    value={gender}
                                                    checked={passengerDetails[index].gender === gender}
                                                    onChange={(e) => handleDetailChange(index, 'gender', e.target.value)}
                                                />
                                                {gender}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Residential Location */}
                        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                            <h3 className="font-bold mb-4 text-gray-800">Enter Your Residential Location address</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        value={residentialAddress.city}
                                        onChange={(e) => setResidentialAddress({...residentialAddress, city: e.target.value})}
                                        placeholder="City"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        className="w-full border rounded px-3 py-2"
                                        value={residentialAddress.state}
                                        onChange={(e) => setResidentialAddress({...residentialAddress, state: e.target.value})}
                                        placeholder="State"
                                    />
                                </div>
                            </div>
                        </div>


                    </div>

                    {/* Payment Summary */}
                    <div className="w-full md:w-80 space-y-6 h-fit">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">Fare Breakdown</h3>
                            <div className="flex justify-between mb-2 text-gray-600">
                                <span>Ticket Price</span>
                                <span>₹{trip.price} x {selectedSeats.length}</span>
                            </div>
                            <div className="flex justify-between mb-2 text-gray-600">
                                <span>Tax & Fees</span>
                                <span>₹0</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between font-bold text-lg mt-4">
                                <span>Total Amount</span>
                                <span className="text-green-600">₹{selectedSeats.length * trip.price}</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            className="w-full bg-secondary text-white font-bold py-3 rounded hover:bg-green-600 transition shadow-lg flex justify-center items-center gap-2"
                        >
                            <span>💳</span> Pay & Book
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
