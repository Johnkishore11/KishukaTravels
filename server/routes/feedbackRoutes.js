const express = require('express');
const router = express.Router();
const { submitFeedback, getFeedbacks } = require('../controllers/feedbackController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(submitFeedback)
    .get(protect, admin, getFeedbacks);

module.exports = router;
