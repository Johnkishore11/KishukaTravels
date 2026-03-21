const asyncHandler = require('express-async-handler');
const Feedback = require('../models/Feedback');

// @desc    Submit new feedback
// @route   POST /api/feedback
// @access  Public
const submitFeedback = asyncHandler(async (req, res) => {
    const { name, phone, email, message } = req.body;

    if (!name || !phone || !email || !message) {
        res.status(400);
        throw new Error('Please fill all fields');
    }

    const feedback = await Feedback.create({
        name,
        phone,
        email,
        message
    });

    if (feedback) {
        res.status(201).json({ message: 'Feedback submitted successfully' });
    } else {
        res.status(400);
        throw new Error('Invalid feedback data');
    }
});

// @desc    Get all feedback (admin)
// @route   GET /api/feedback
// @access  Private/Admin
const getFeedbacks = asyncHandler(async (req, res) => {
    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
    res.json(feedbacks);
});

module.exports = { submitFeedback, getFeedbacks };
