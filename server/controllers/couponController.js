const asyncHandler = require('express-async-handler');
const Coupon = require('../models/Coupon');

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Private/Admin
const getCoupons = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    res.json(coupons);
});

// @desc    Create a coupon
// @route   POST /api/coupons
// @access  Private/Admin
const createCoupon = asyncHandler(async (req, res) => {
    const { code, discountType, discountValue, minAmount, maxUses, expiresAt, isActive } = req.body;

    const exists = await Coupon.findOne({ code: code.toUpperCase() });
    if (exists) {
        res.status(400);
        throw new Error('Coupon code already exists');
    }

    const coupon = await Coupon.create({
        code, discountType, discountValue, minAmount, maxUses, expiresAt, isActive
    });
    res.status(201).json(coupon);
});

// @desc    Update a coupon
// @route   PUT /api/coupons/:id
// @access  Private/Admin
const updateCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
        res.status(404);
        throw new Error('Coupon not found');
    }

    const { code, discountType, discountValue, minAmount, maxUses, expiresAt, isActive } = req.body;
    coupon.code = code || coupon.code;
    coupon.discountType = discountType || coupon.discountType;
    coupon.discountValue = discountValue ?? coupon.discountValue;
    coupon.minAmount = minAmount ?? coupon.minAmount;
    coupon.maxUses = maxUses ?? coupon.maxUses;
    coupon.expiresAt = expiresAt || coupon.expiresAt;
    coupon.isActive = isActive ?? coupon.isActive;

    const updated = await coupon.save();
    res.json(updated);
});

// @desc    Delete a coupon
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
const deleteCoupon = asyncHandler(async (req, res) => {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
        res.status(404);
        throw new Error('Coupon not found');
    }
    await coupon.deleteOne();
    res.json({ message: 'Coupon removed' });
});

module.exports = { getCoupons, createCoupon, updateCoupon, deleteCoupon };
