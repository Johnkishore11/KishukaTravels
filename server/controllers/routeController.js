const asyncHandler = require('express-async-handler');
const Route = require('../models/Route');

// @desc    Get all routes
// @route   GET /api/routes
// @access  Public
const getRoutes = asyncHandler(async (req, res) => {
    const routes = await Route.find({});
    res.json(routes);
});

// @desc    Get route by ID
// @route   GET /api/routes/:id
// @access  Public
const getRouteById = asyncHandler(async (req, res) => {
    const route = await Route.findById(req.params.id);

    if (route) {
        res.json(route);
    } else {
        res.status(404);
        throw new Error('Route not found');
    }
});

// @desc    Create a route
// @route   POST /api/routes
// @access  Private/Admin
const createRoute = asyncHandler(async (req, res) => {
    const { from, to, boardingPoints, droppingPoints, duration, distance } = req.body;

    const route = new Route({
        from,
        to,
        boardingPoints,
        droppingPoints,
        duration,
        distance
    });

    const createdRoute = await route.save();
    res.status(201).json(createdRoute);
});

// @desc    Update a route
// @route   PUT /api/routes/:id
// @access  Private/Admin
const updateRoute = asyncHandler(async (req, res) => {
    const { from, to, boardingPoints, droppingPoints, duration, distance } = req.body;

    const route = await Route.findById(req.params.id);

    if (route) {
        route.from = from;
        route.to = to;
        route.boardingPoints = boardingPoints;
        route.droppingPoints = droppingPoints;
        route.duration = duration;
        route.distance = distance;

        const updatedRoute = await route.save();
        res.json(updatedRoute);
    } else {
        res.status(404);
        throw new Error('Route not found');
    }
});

// @desc    Delete a route
// @route   DELETE /api/routes/:id
// @access  Private/Admin
const deleteRoute = asyncHandler(async (req, res) => {
    const route = await Route.findById(req.params.id);

    if (route) {
        await route.deleteOne();
        res.json({ message: 'Route removed' });
    } else {
        res.status(404);
        throw new Error('Route not found');
    }
});

module.exports = {
    getRoutes,
    getRouteById,
    createRoute,
    updateRoute,
    deleteRoute,
};
