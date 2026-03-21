const mongoose = require('mongoose');

const busSchema = mongoose.Schema({
    busName: { type: String, required: true },
    busNumber: { type: String, required: true, unique: true },
    busType: { type: String, enum: ['AC', 'Non-AC', 'Sleeper', 'Seater', 'AC Sleeper', 'AC Seater'], required: true },
    totalSeats: { type: Number, required: true },
    seatLayout: {
        type: String,
        enum: ['2+1', '2+2'],
        required: true
    },
    amenities: [{ type: String }],
    images: [{ type: String }],
}, { timestamps: true });

const Bus = mongoose.model('Bus', busSchema);
module.exports = Bus;
