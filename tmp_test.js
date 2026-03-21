const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/captain_travels');
const Trip = require('./server/models/Trip');
const Route = require('./server/models/Route');

async function test() {
    const trips = await Trip.find().populate('routeId').lean();
    console.log(JSON.stringify(trips.map(t => ({ id: t._id, date: t.date, route: t.routeId ? {from: t.routeId.from, to: t.routeId.to} : null })), null, 2));
    process.exit(0);
}
test();
