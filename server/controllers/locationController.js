const asyncHandler = require('express-async-handler');
const Route = require('../models/Route');

// @desc    Get unique locations
// @route   GET /api/locations
// @access  Public
const getLocations = asyncHandler(async (req, res) => {
    const routes = await Route.find({});
    
    const locations = new Set();
    routes.forEach(route => {
        if (route.from) locations.add(route.from);
        if (route.to) locations.add(route.to);
    });

    res.json(Array.from(locations).sort());
});

module.exports = { getLocations };
