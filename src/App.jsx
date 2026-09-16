import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingModal from './components/BookingModal';
import RoomsSection from './pages/RoomsSection';
import DiningSection from './pages/DiningSection';
import AmenitiesSection from './pages/AmenitiesSection';
import ReviewsSection from './pages/ReviewsSection';
import LocationSection from './pages/LocationSection';
import Footer from './components/Footer';

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedRoom, setPreselectedRoom] = useState(null);

  const openBooking = (room = null) => {
    setPreselectedRoom(room);
    setBookingOpen(true);
  };

  const closeBooking = () => setBookingOpen(false);

  return (
    <>
      <Navbar onBookNow={() => openBooking()} />

      <main>
        <Hero onBookNow={() => openBooking()} />
        <RoomsSection onBook={openBooking} />
        <DiningSection />
        <AmenitiesSection />
        <ReviewsSection />
        <LocationSection />
      </main>

      <Footer onBookNow={() => openBooking()} />

      <BookingModal
        open={bookingOpen}
        onClose={closeBooking}
        preselectedRoom={preselectedRoom}
      />
    </>
  );
}
