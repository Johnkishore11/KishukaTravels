import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BusResults from './pages/BusResults';
import SeatSelection from './pages/SeatSelection';
import Checkout from './pages/Checkout';
import Ticket from './pages/Ticket';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQ from './pages/FAQ';
import Feedback from './pages/Feedback';
import Contact from './pages/Contact';
import ManageTicket from './pages/ManageTicket';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBuses from './pages/admin/AdminBuses';
import AdminRoutes from './pages/admin/AdminRoutes';
import AdminTrips from './pages/admin/AdminTrips';
import AdminBookings from './pages/admin/AdminBookings';
import AdminSeats from './pages/admin/AdminSeats';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCoupons from './pages/admin/AdminCoupons';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes with Navbar/Footer */}
          <Route element={
            <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
              <Navbar />
              <main className="flex-grow">
                <Outlet />
              </main>
              <Footer />
            </div>
          }>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/buses" element={<BusResults />} />
            <Route path="/book/:id" element={<SeatSelection />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/manage-booking" element={<ManageTicket />} />
            <Route path="/ticket/:id" element={<Ticket />} />
          </Route>

          {/* Admin Routes – protected: must be logged in as admin */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="buses" element={<AdminBuses />} />
              <Route path="routes" element={<AdminRoutes />} />
              <Route path="trips" element={<AdminTrips />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="seats" element={<AdminSeats />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="coupons" element={<AdminCoupons />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
