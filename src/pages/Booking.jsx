import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import movies from '../data/movies';

const Booking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [popcornQuantity, setPopcornQuantity] = useState(0);
  const [cokeQuantity, setCokeQuantity] = useState(0);

  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.id == movieId);

  const TicketIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
      />
    </svg>
  );

  const CalendarIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  const calculateTotal = () => {
    return selectedSeats.length * 120;
  };

  const ConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl">
        <div className="text-center">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>

          <div className="mt-4 text-blue-600">
            {selectedSeats.length > 0 && <p>Обрано місць: {selectedSeats.length}</p>}
            {popcornQuantity > 0 && <p>Попкорн: {popcornQuantity} × 85 UAH</p>}
            {cokeQuantity > 0 && <p>Coca-Cola: {cokeQuantity} × 65 UAH</p>}
            <p className="mt-2 font-semibold">
              Загальна сума: {calculateTotal() + 20 + popcornQuantity * 85 + cokeQuantity * 65} UAH
            </p>
            <p className="mt-2 text-sm">Квитки будуть надіслані на вашу електронну адресу</p>
          </div>
          <button
            onClick={() => setShowConfirmation(false)}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  );

  const handleBooking = () => {
    setShowConfirmation(true);
  };



  const CokeIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14.5h-9v-2h9v2zm0-4h-9v-2h9v2z" />
    </svg>
  );

  const QuantitySelector = ({ quantity, onIncrement, onDecrement }) => (
    <div className="flex items-center space-x-2">
      <button
        onClick={onDecrement}
        className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200"
      >
        -
      </button>
      <span className="w-6 text-center">{quantity}</span>
      <button
        onClick={onIncrement}
        className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200"
      >
        +
      </button>
    </div>
  );

  return (
    <div className="bg-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 p-6">
            <div className="flex items-start mb-6">
              <img
                src={`/${movie.poster}`}
                alt={movie.title}
                className="w-40 h-50 rounded-lg object-cover mr-4"
              />
              <div className="flex flex-col gap-0">
                <h2 className="text-3xl font-bold text-blue-800">{movie.title}</h2>
                <div className="flex space-x-4 mt-1 text-blue-600">
                  <span className="text-xl">{movie.duration}</span>
                  <span className="text-xl">{movie.genre}</span>
                  <span className="font-semibold">{movie.rating}</span>
                </div>
                <div className="flex items-center mt-2 space-x-4 text-blue-600">
                  <div className="flex items-center">
                    <CalendarIcon />
                    <span className="text-xl">{movie.showtime}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex border-b border-blue-200 mt-6 mb-6"></div>
            <div className="mb-8">
              <CinemaHall takenSeats={movie.takenseats} selectedSeats={selectedSeats} onSeatSelect={setSelectedSeats} />
            </div>
          </div>
          <div className="md:w-1/3 p-6 border-l border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <img src="/popcorn.svg" alt="Popcorn" className="w-8 h-8" />
                  <div className="ml-3">
                    <div className="text-blue-800 font-medium">Popcorn</div>
                    <div className="text-blue-500 text-sm">85 UAH</div>
                  </div>
                </div>
                <QuantitySelector
                  quantity={popcornQuantity}
                  onIncrement={() => setPopcornQuantity((p) => Math.min(10, p + 1))}
                  onDecrement={() => setPopcornQuantity((p) => Math.max(0, p - 1))}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                <img src="/popcorn.svg" alt="Popcorn" className="w-8 h-8" />
                  <div className="ml-3">
                    <div className="text-blue-800 font-medium">Coca-Cola</div>
                    <div className="text-blue-500 text-sm">65 UAH</div>
                  </div>
                </div>
                <QuantitySelector
                  quantity={cokeQuantity}
                  onIncrement={() => setCokeQuantity((c) => Math.min(10, c + 1))}
                  onDecrement={() => setCokeQuantity((c) => Math.max(0, c - 1))}
                />
              </div>

              <div className="flex justify-between">
                <span className="text-blue-600">Tickets ({selectedSeats.length})</span>
                <span className="font-medium">{selectedSeats.length * 120} UAH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Service</span>
                <span className="font-medium">20 UAH</span>
              </div>

              <div className="flex justify-between border-t border-blue-200 pt-4">
                <span className="text-blue-600">Total</span>
                <span className="font-bold text-lg">
                  {calculateTotal() + 20 + popcornQuantity * 85 + cokeQuantity * 65} UAH
                </span>
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={selectedSeats.length === 0}
              className={`w-full py-3 rounded-lg font-bold text-white ${
                selectedSeats.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } transition flex items-center justify-center`}
            >
              <TicketIcon />
              Buy Tickets
            </button>
            {showConfirmation && <ConfirmationModal />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;