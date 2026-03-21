const mongoose = require('mongoose');

const routeSchema = mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    boardingPoints: [{ type: String }],
    droppingPoints: [{ type: String }],
    duration: { type: String, required: true }, // e.g., "8h 30m"
    distance: { type: String } // e.g., "450 km"
}, { timestamps: true });

const Route = mongoose.model('Route', routeSchema);
module.exports = Route;
