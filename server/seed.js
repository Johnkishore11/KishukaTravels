const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Bus = require('./models/Bus');
const Route = require('./models/Route');
const Trip = require('./models/Trip');
const connectDB = require('./config/db');

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany();
        await Bus.deleteMany();
        await Route.deleteMany();
        await Trip.deleteMany();

        console.log('Data Cleared');

        // Create Users
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123',
            phone: '9999999999',
            role: 'admin'
        });

        const normalUser = await User.create({
            name: 'John Doe',
            email: 'user@example.com',
            password: 'password123',
            phone: '8888888888',
            role: 'user'
        });

        console.log('Users Created');

        // Create Bus
        const bus = await Bus.create({
            busName: 'Kishuka Lux',
            busNumber: 'MH 12 AB 1234',
            busType: 'AC Sleeper',
            totalSeats: 30,
            seatLayout: '2+1',
            amenities: ['WiFi', 'Water Bottle', 'Blanket', 'Charging Point']
        });

        console.log('Bus Created');

        // Create Route
        const route = await Route.create({
            from: 'Mumbai',
            to: 'Pune',
            boardingPoints: ['Dadar', 'Sion', 'Chembur'],
            droppingPoints: ['Wakad', 'Baner', 'Swargate'],
            duration: '3h 30m',
            distance: '150 km'
        });

        console.log('Route Created');

        // Create Trip
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        await Trip.create({
            busId: bus._id,
            routeId: route._id,
            date: today,
            departureTime: '08:00',
            arrivalTime: '11:30',
            price: 800,
            bookedSeats: []
        });

        console.log('Trip Created');

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedData();
