const asyncHandler = require('express-async-handler');
const Bus = require('../models/Bus');

// @desc    Get all buses
// @route   GET /api/buses
// @access  Public
const getBuses = asyncHandler(async (req, res) => {
    const buses = await Bus.find({});
    res.json(buses);
});

// @desc    Get bus by ID
// @route   GET /api/buses/:id
// @access  Public
const getBusById = asyncHandler(async (req, res) => {
    const bus = await Bus.findById(req.params.id);

    if (bus) {
        res.json(bus);
    } else {
        res.status(404);
        throw new Error('Bus not found');
    }
});

// @desc    Create a bus
// @route   POST /api/buses
// @access  Private/Admin
const createBus = asyncHandler(async (req, res) => {
    const { busName, busNumber, busType, totalSeats, seatLayout, amenities } = req.body;

    const busExists = await Bus.findOne({ busNumber });

    if (busExists) {
        res.status(400);
        throw new Error('Bus already exists');
    }

    const bus = new Bus({
        busName,
        busNumber,
        busType,
        totalSeats,
        seatLayout,
        amenities
    });

    const createdBus = await bus.save();
    res.status(201).json(createdBus);
});

// @desc    Update a bus
// @route   PUT /api/buses/:id
// @access  Private/Admin
const updateBus = asyncHandler(async (req, res) => {
    const { busName, busNumber, busType, totalSeats, seatLayout, amenities } = req.body;

    const bus = await Bus.findById(req.params.id);

    if (bus) {
        bus.busName = busName;
        bus.busNumber = busNumber;
        bus.busType = busType;
        bus.totalSeats = totalSeats;
        bus.seatLayout = seatLayout;
        bus.amenities = amenities;

        const updatedBus = await bus.save();
        res.json(updatedBus);
    } else {
        res.status(404);
        throw new Error('Bus not found');
    }
});

// @desc    Delete a bus
// @route   DELETE /api/buses/:id
// @access  Private/Admin
const deleteBus = asyncHandler(async (req, res) => {
    const bus = await Bus.findById(req.params.id);

    if (bus) {
        await bus.deleteOne();
        res.json({ message: 'Bus removed' });
    } else {
        res.status(404);
        throw new Error('Bus not found');
    }
});

module.exports = {
    getBuses,
    getBusById,
    createBus,
    updateBus,
    deleteBus,
};
