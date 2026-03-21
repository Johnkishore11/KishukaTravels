const asyncHandler = require('express-async-handler');
const Trip = require('../models/Trip');

// @desc    Get all trips (with filters for search)
// @route   GET /api/trips
// @access  Public
const getTrips = asyncHandler(async (req, res) => {
    const { from, to, date } = req.query;
    let query = {};

    if (date) {
        const searchDate = new Date(date);
        const nextDay = new Date(searchDate);
        nextDay.setDate(searchDate.getDate() + 1);
        query.date = { $gte: searchDate, $lt: nextDay };
    }

    const trips = await Trip.find(query)
        .populate('busId')
        .populate('routeId');

    if (from && to) {
        const filteredTrips = trips.filter(trip =>
            trip.routeId &&
            trip.routeId.from.trim().toLowerCase() === from.trim().toLowerCase() &&
            trip.routeId.to.trim().toLowerCase() === to.trim().toLowerCase()
        );
        res.json(filteredTrips);
    } else {
        res.json(trips);
    }
});

// @desc    Get trip by ID
// @route   GET /api/trips/:id
// @access  Public
const getTripById = asyncHandler(async (req, res) => {
    const trip = await Trip.findById(req.params.id)
        .populate('busId')
        .populate('routeId');

    if (trip) {
        res.json(trip);
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
});

// @desc    Create a trip
// @route   POST /api/trips
// @access  Private/Admin
const createTrip = asyncHandler(async (req, res) => {
    const { busId, routeId, date, departureTime, arrivalTime, price } = req.body;

    const trip = new Trip({
        busId, routeId, date, departureTime, arrivalTime, price, bookedSeats: []
    });

    const createdTrip = await trip.save();
    res.status(201).json(createdTrip);
});

// @desc    Update a trip
// @route   PUT /api/trips/:id
// @access  Private/Admin
const updateTrip = asyncHandler(async (req, res) => {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
        res.status(404);
        throw new Error('Trip not found');
    }

    const { busId, routeId, date, departureTime, arrivalTime, price } = req.body;
    trip.busId = busId || trip.busId;
    trip.routeId = routeId || trip.routeId;
    trip.date = date || trip.date;
    trip.departureTime = departureTime || trip.departureTime;
    trip.arrivalTime = arrivalTime || trip.arrivalTime;
    trip.price = price ?? trip.price;

    const updatedTrip = await trip.save();
    res.json(updatedTrip);
});

// @desc    Delete a trip
// @route   DELETE /api/trips/:id
// @access  Private/Admin
const deleteTrip = asyncHandler(async (req, res) => {
    const trip = await Trip.findById(req.params.id);
    if (trip) {
        await trip.deleteOne();
        res.json({ message: 'Trip removed' });
    } else {
        res.status(404);
        throw new Error('Trip not found');
    }
});

// @desc    Block a seat manually (admin)
// @route   PUT /api/trips/:id/block-seat
// @access  Private/Admin
const blockSeat = asyncHandler(async (req, res) => {
    const { seat } = req.body;
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
        res.status(404);
        throw new Error('Trip not found');
    }

    if (!trip.bookedSeats.includes(seat)) {
        trip.bookedSeats.push(seat);
        await trip.save();
    }

    res.json({ message: `Seat ${seat} blocked`, bookedSeats: trip.bookedSeats });
});

// @desc    Unblock a seat manually (admin)
// @route   PUT /api/trips/:id/unblock-seat
// @access  Private/Admin
const unblockSeat = asyncHandler(async (req, res) => {
    const { seat } = req.body;
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
        res.status(404);
        throw new Error('Trip not found');
    }

    trip.bookedSeats = trip.bookedSeats.filter(s => s !== seat);
    await trip.save();

    res.json({ message: `Seat ${seat} unblocked`, bookedSeats: trip.bookedSeats });
});

module.exports = {
    getTrips,
    getTripById,
    createTrip,
    updateTrip,
    deleteTrip,
    blockSeat,
    unblockSeat
};
