const asyncHandler = require('express-async-handler');
const Bus = require('../models/Bus');
const Route = require('../models/Route');
const Trip = require('../models/Trip');
const Booking = require('../models/Booking');
const User = require('../models/User');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
    const [
        totalBuses,
        totalRoutes,
        totalTrips,
        totalBookings,
        revenueData,
        recentBookings
    ] = await Promise.all([
        Bus.countDocuments(),
        Route.countDocuments(),
        Trip.countDocuments(),
        Booking.countDocuments({ bookingStatus: 'Confirmed' }),
        Booking.aggregate([
            { $match: { bookingStatus: 'Confirmed', paymentStatus: 'Completed' } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]),
        Booking.find({ bookingStatus: 'Confirmed' })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('userId', 'name email')
            .populate({
                path: 'tripId',
                populate: { path: 'busId routeId' }
            })
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

    res.json({
        totalBuses,
        totalRoutes,
        totalTrips,
        totalBookings,
        totalRevenue,
        recentBookings
    });
});

module.exports = { getDashboardStats };
