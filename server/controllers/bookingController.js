const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');
const Trip = require('../models/Trip');
const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
    const { tripId, seats, passengerDetails, contactDetails, residentialAddress, totalAmount, paymentId, orderId } = req.body;

    if (!seats || seats.length === 0) {
        res.status(400);
        throw new Error('No seats selected');
    }

    const trip = await Trip.findById(tripId);
    if (!trip) {
        res.status(404);
        throw new Error('Trip not found');
    }

    const isBooked = trip.bookedSeats.some(seat => seats.includes(seat));
    if (isBooked) {
        res.status(400);
        throw new Error('One or more seats are already booked');
    }

    const PNR = 'CT' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);

    const booking = new Booking({
        userId: req.user._id,
        tripId, seats, passengerDetails, contactDetails, residentialAddress, totalAmount,
        paymentId, orderId,
        paymentStatus: 'Completed',
        PNR
    });

    const createdBooking = await booking.save();
    trip.bookedSeats = [...trip.bookedSeats, ...seats];
    await trip.save();
    res.status(201).json(createdBooking);
});

// @desc    Get ALL bookings (admin)
// @route   GET /api/bookings
// @access  Private/Admin
const getAllBookings = asyncHandler(async (req, res) => {
    const { date, routeId } = req.query;
    let match = {};

    if (date) {
        const searchDate = new Date(date);
        const nextDay = new Date(searchDate);
        nextDay.setDate(searchDate.getDate() + 1);
        // We'll filter after population
    }

    let bookings = await Booking.find(match)
        .sort({ createdAt: -1 })
        .populate('userId', 'name email phone')
        .populate({
            path: 'tripId',
            populate: { path: 'busId routeId' }
        });

    // Post-filter by date
    if (date) {
        const searchDate = new Date(date);
        const nextDay = new Date(searchDate);
        nextDay.setDate(searchDate.getDate() + 1);
        bookings = bookings.filter(b => {
            const tripDate = b.tripId?.date;
            return tripDate && new Date(tripDate) >= searchDate && new Date(tripDate) < nextDay;
        });
    }

    // Post-filter by routeId
    if (routeId) {
        bookings = bookings.filter(b => b.tripId?.routeId?._id?.toString() === routeId);
    }

    res.json(bookings);
});

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id)
        .populate('userId', 'name email')
        .populate({
            path: 'tripId',
            populate: { path: 'busId routeId' }
        });

    if (booking) {
        res.json(booking);
    } else {
        res.status(404);
        throw new Error('Booking not found');
    }
});

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({ userId: req.user._id })
        .populate({
            path: 'tripId',
            populate: { path: 'busId routeId' }
        });
    res.json(bookings);
});

// @desc    Cancel booking (admin)
// @route   PUT /api/bookings/:id/cancel
// @access  Private/Admin
const cancelBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
        res.status(404);
        throw new Error('Booking not found');
    }

    booking.bookingStatus = 'Cancelled';
    await booking.save();

    // Free seats in the trip
    const trip = await Trip.findById(booking.tripId);
    if (trip) {
        trip.bookedSeats = trip.bookedSeats.filter(s => !booking.seats.includes(s));
        await trip.save();
    }

    res.json({ message: 'Booking cancelled successfully', booking });
});

// @desc    Refund booking (admin - mock)
// @route   PUT /api/bookings/:id/refund
// @access  Private/Admin
const refundBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
        res.status(404);
        throw new Error('Booking not found');
    }

    booking.paymentStatus = 'Refunded';
    await booking.save();

    res.json({ message: 'Refund initiated successfully', booking });
});

// @desc    Export bookings as CSV (admin)
// @route   GET /api/bookings/export/csv
// @access  Private/Admin
const exportBookingsCSV = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({})
        .populate('userId', 'name email phone')
        .populate({
            path: 'tripId',
            populate: { path: 'busId routeId' }
        });

    const rows = [
        ['PNR', 'Passenger', 'Email', 'Phone', 'Route', 'Trip Date', 'Seats', 'Amount', 'Payment Status', 'Booking Status', 'Booked At']
    ];

    bookings.forEach(b => {
        const route = b.tripId?.routeId ? `${b.tripId.routeId.from} -> ${b.tripId.routeId.to}` : 'N/A';
        rows.push([
            b.PNR,
            b.userId?.name || 'N/A',
            b.userId?.email || 'N/A',
            b.userId?.phone || 'N/A',
            route,
            b.tripId?.date ? new Date(b.tripId.date).toLocaleDateString() : 'N/A',
            b.seats.join(' | '),
            b.totalAmount,
            b.paymentStatus,
            b.bookingStatus,
            new Date(b.createdAt).toLocaleString()
        ]);
    });

    const csv = rows.map(row => row.map(v => `"${v}"`).join(',')).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=bookings.csv');
    res.send(csv);
});

// @desc    Generate Ticket PDF
// @route   GET /api/bookings/:id/ticket
// @access  Private
const generateTicket = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id)
        .populate('userId', 'name email')
        .populate({
            path: 'tripId',
            populate: { path: 'busId routeId' }
        });

    if (!booking) {
        res.status(404);
        throw new Error('Booking not found');
    }

    const qrCodeUrl = await QRCode.toDataURL(booking.PNR);
    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=ticket-${booking.PNR}.pdf`);
    doc.pipe(res);

    doc.fontSize(20).text('Kishuka Travels - E-Ticket', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`PNR: ${booking.PNR}`);
    doc.text(`Passenger: ${booking.passengerDetails[0].name}`);
    doc.text(`Bus: ${booking.tripId.busId.busName} (${booking.tripId.busId.busNumber})`);
    doc.text(`Route: ${booking.tripId.routeId.from} -> ${booking.tripId.routeId.to}`);
    doc.text(`Date: ${new Date(booking.tripId.date).toLocaleDateString()}`);
    doc.text(`Seats: ${booking.seats.join(', ')}`);
    doc.text(`Total Amount: ₹${booking.totalAmount}`);
    doc.image(qrCodeUrl, { fit: [100, 100], align: 'center' });
    doc.end();
});

// @desc    Get booking by PNR and Email/Phone (Public)
// @route   POST /api/bookings/manage
// @access  Public
const getBookingByPNR = asyncHandler(async (req, res) => {
    const { pnr, emailOrPhone } = req.body;
    
    if (!pnr || !emailOrPhone) {
        res.status(400);
        throw new Error('Please provide PNR and Email/Phone');
    }

    const booking = await Booking.findOne({ PNR: pnr })
        .populate('userId', 'name email')
        .populate({
            path: 'tripId',
            populate: { path: 'busId routeId' }
        });

    if (!booking) {
        res.status(404);
        throw new Error('Booking not found');
    }

    // Verify email or phone
    const isValid = booking.contactDetails.email === emailOrPhone || booking.contactDetails.phone === emailOrPhone;
    
    if (!isValid) {
        res.status(401);
        throw new Error('Invalid Contact Details for this PNR');
    }

    res.json(booking);
});

// @desc    Cancel booking by PNR and Email/Phone (Public)
// @route   POST /api/bookings/manage/cancel
// @access  Public
const cancelBookingByPNR = asyncHandler(async (req, res) => {
    const { pnr, emailOrPhone } = req.body;
    
    const booking = await Booking.findOne({ PNR: pnr });
    if (!booking) {
        res.status(404);
        throw new Error('Booking not found');
    }

    const isValid = booking.contactDetails.email === emailOrPhone || booking.contactDetails.phone === emailOrPhone;
    if (!isValid) {
        res.status(401);
        throw new Error('Invalid Contact Details for this PNR');
    }

    if (booking.bookingStatus === 'Cancelled') {
        res.status(400);
        throw new Error('Booking is already cancelled');
    }

    booking.bookingStatus = 'Cancelled';
    await booking.save();

    // Free seats in the trip
    const trip = await Trip.findById(booking.tripId);
    if (trip) {
        trip.bookedSeats = trip.bookedSeats.filter(s => !booking.seats.includes(s));
        await trip.save();
    }

    res.json({ message: 'Booking cancelled successfully', booking });
});

// @desc    Download Ticket by PNR and Email/Phone (Public)
// @route   POST /api/bookings/manage/download
// @access  Public
const downloadTicketByPNR = asyncHandler(async (req, res) => {
    const { pnr, emailOrPhone } = req.body;
    
    const booking = await Booking.findOne({ PNR: pnr })
        .populate('userId', 'name email')
        .populate({
            path: 'tripId',
            populate: { path: 'busId routeId' }
        });

    if (!booking) {
        res.status(404);
        throw new Error('Booking not found');
    }

    const isValid = booking.contactDetails.email === emailOrPhone || booking.contactDetails.phone === emailOrPhone;
    if (!isValid) {
        res.status(401);
        throw new Error('Invalid Contact Details for this PNR');
    }

    const qrCodeUrl = await QRCode.toDataURL(booking.PNR);
    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=ticket-${booking.PNR}.pdf`);
    doc.pipe(res);

    doc.fontSize(20).text('Kishuka Travels - E-Ticket', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`PNR: ${booking.PNR}`);
    doc.text(`Passenger: ${booking.passengerDetails[0].name}`);
    doc.text(`Bus: ${booking.tripId.busId.busName} (${booking.tripId.busId.busNumber})`);
    doc.text(`Route: ${booking.tripId.routeId.from} -> ${booking.tripId.routeId.to}`);
    doc.text(`Date: ${new Date(booking.tripId.date).toLocaleDateString()}`);
    doc.text(`Seats: ${booking.seats.join(', ')}`);
    doc.text(`Total Amount: ₹${booking.totalAmount}`);
    doc.image(qrCodeUrl, { fit: [100, 100], align: 'center' });
    doc.end();
});

module.exports = {
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
};
