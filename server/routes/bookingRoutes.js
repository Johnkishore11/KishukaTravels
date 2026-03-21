const express = require('express');
const router = express.Router();
const {
    createBooking,
    getAllBookings,
    getBookingById,
    getMyBookings,
    cancelBooking,
    refundBooking,
    exportBookingsCSV,
    generateTicket,
    getBookingByPNR,
    cancelBookingByPNR,
    downloadTicketByPNR
} = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, createBooking).get(protect, admin, getAllBookings);
router.post('/manage', getBookingByPNR);
router.post('/manage/cancel', cancelBookingByPNR);
router.post('/manage/download', downloadTicketByPNR);

router.get('/export/csv', protect, admin, exportBookingsCSV);
router.route('/mybookings').get(protect, getMyBookings);
router.route('/:id').get(protect, getBookingById);
router.route('/:id/ticket').get(protect, generateTicket);
router.route('/:id/cancel').put(protect, admin, cancelBooking);
router.route('/:id/refund').put(protect, admin, refundBooking);

module.exports = router;
