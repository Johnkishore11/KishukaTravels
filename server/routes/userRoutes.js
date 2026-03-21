const express = require('express');
const router = express.Router();
const {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    getAllUsers,
    blockUser,
    getUserBookingHistory
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/', protect, admin, getAllUsers);
router.route('/profile').get(protect, getUserProfile);
router.route('/:id/block').put(protect, admin, blockUser);
router.route('/:id/bookings').get(protect, admin, getUserBookingHistory);

module.exports = router;
