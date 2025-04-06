import React from 'react';
import CinemaHall from '../components/CinemaHall';

const Booking = () => {
  return (
    <div className="min-h-screen flex items-center p-8">
      <div className="max-w-5x1 mx-auto bg-white rounded-2xl p-6 flex">
        
        <div className="mb-8">

          <CinemaHall />
        </div>

        
      </div>
    </div>
  );
};

export default Booking;