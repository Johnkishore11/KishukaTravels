const express = require('express');
const router = express.Router();
const {
    getTrips,
    getTripById,
    createTrip,
    updateTrip,
    deleteTrip,
    blockSeat,
    unblockSeat
} = require('../controllers/tripController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getTrips).post(protect, admin, createTrip);
router.route('/:id')
    .get(getTripById)
    .put(protect, admin, updateTrip)
    .delete(protect, admin, deleteTrip);
router.route('/:id/block-seat').put(protect, admin, blockSeat);
router.route('/:id/unblock-seat').put(protect, admin, unblockSeat);

module.exports = router;
