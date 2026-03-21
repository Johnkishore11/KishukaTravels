const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
    seats: [{ type: String, required: true }],
    passengerDetails: [{
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true }
    }],
    contactDetails: {
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },
    residentialAddress: {
        state: { type: String, required: true },
        city: { type: String, required: true }
    },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    bookingStatus: { type: String, enum: ['Confirmed', 'Cancelled'], default: 'Confirmed' },
    PNR: { type: String, unique: true, required: true },
    paymentId: { type: String }, // Razorpay Payment ID
    orderId: { type: String } // Razorpay Order ID
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
