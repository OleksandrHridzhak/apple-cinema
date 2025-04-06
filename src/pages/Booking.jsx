import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CinemaHall from '../components/CinemaHall';
import { saveBooking, getTakenSeatsForMovie } from '../services/BookingService';
import movies from '../data/movies';
import { Link } from 'react-router-dom';

const Booking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [popcornQuantity, setPopcornQuantity] = useState(0);
  const [cokeQuantity, setCokeQuantity] = useState(0);
  const [takenSeats, setTakenSeats] = useState([]);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.id == movieId);

  useEffect(() => {
    const seats = getTakenSeatsForMovie(movieId);
    setTakenSeats([...seats]);
  }, [movieId, movie.takenseats]);

  const TicketIcon = () => (
    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
      />
    </svg>
  );

  const CalendarIcon = () => (
    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userData.name.trim()) newErrors.name = "Ім'я обов'язкове";
    if (!userData.phone.trim()) newErrors.phone = 'Телефон обов\'язковий';
    if (!userData.email.trim()) {
      newErrors.email = 'Email обов\'язковий';
    } else if (!emailRegex.test(userData.email)) {
      newErrors.email = 'Невірний формат email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async () => {
    if (!validateForm()) return;

    const bookingData = {
      movieId,
      seats: selectedSeats,
      userData,
      snacks: {
        popcorn: popcornQuantity,
        coke: cokeQuantity
      },
      total: calculateTotal() + 20 + popcornQuantity * 85 + cokeQuantity * 65,
      timestamp: new Date().toISOString()
    };

    const success = await saveBooking(bookingData);
    if (success) {
      toast.success('Бронювання успішне!');
      setTakenSeats(prev => [...prev, ...selectedSeats]);
      setShowConfirmation(true);
      setShowUserForm(false);
    } else {
      toast.error('Помилка бронювання');
    }
  };

  const ConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-xl">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-green-500"
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

          <div className="mt-3 sm:mt-4 text-blue-600 text-sm sm:text-base">
            <p className="font-semibold">Дякуємо за бронювання, {userData.name}!</p>
            {selectedSeats.length > 0 && <p>Обрано місць: {selectedSeats.length}</p>}
            {popcornQuantity > 0 && <p>Попкорн: {popcornQuantity} × 85 UAH</p>}
            {cokeQuantity > 0 && <p>Coca-Cola: {cokeQuantity} × 65 UAH</p>}
            <p className="mt-2 font-semibold">
              Загальна сума: {calculateTotal() + 20 + popcornQuantity * 85 + cokeQuantity * 65} UAH
            </p>
            <p className="mt-2 text-xs sm:text-sm">Деталі бронювання надіслані на {userData.email}</p>
          </div>
          <button
            onClick={() => {
              setShowConfirmation(false);
              setSelectedSeats([]);
            }}
            className="mt-4 sm:mt-6 bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  );

  const UserFormModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-xl">
        <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-4">Введіть ваші дані</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm sm:text-base text-blue-600 mb-1">Ім'я*</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label className="block text-sm sm:text-base text-blue-600 mb-1">Email*</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm sm:text-base text-blue-600 mb-1">Телефон*</label>
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => setShowUserForm(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Скасувати
          </button>
          <button
            onClick={handleBookingSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Підтвердити
          </button>
        </div>
      </div>
    </div>
  );

  const QuantitySelector = ({ quantity, onIncrement, onDecrement }) => (
    <div className="flex items-center space-x-1 sm:space-x-2">
      <button
        onClick={onDecrement}
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 text-sm sm:text-base"
      >
        -
      </button>
      <span className="w-4 sm:w-6 text-center text-sm sm:text-base">{quantity}</span>
      <button
        onClick={onIncrement}
        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 text-sm sm:text-base"
      >
        +
      </button>
    </div>
  );

  return (
    <div className="bg-blue-50 py-4 px-2 sm:py-8 sm:px-4 min-h-screen">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="flex justify-start max-w-6xl mx-auto mb-4 sm:mb-6">
  <Link
    to="/"
    className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow hover:bg-blue-100 text-blue-700 font-medium transition"
  >
    <svg
      className="w-5 h-5 mr-2"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 10l9-7 9 7v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10z"
      />
    </svg>
    Головне меню
  </Link>
</div>

      <div className="max-w-6xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start mb-4 sm:mb-6">
              <img
                src={`/${movie.poster}`}
                alt={movie.title}
                className="w-full sm:w-40 h-48 sm:h-60 rounded-lg object-cover mb-4 sm:mb-0 sm:mr-4"
              />
              <div className="flex flex-col gap-1 sm:gap-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-800">{movie.title}</h2>
                <div className="flex flex-wrap gap-2 sm:space-x-4 mt-1 text-blue-600">
                  <span className="text-base sm:text-xl">{movie.duration}</span>
                  <span className="text-base sm:text-xl">{movie.genre}</span>
                  <span className="font-semibold text-base sm:text-xl">{movie.rating}</span>
                </div>
                <div className="flex items-center mt-2 space-x-2 sm:space-x-4 text-blue-600">
                  <div className="flex items-center">
                    <CalendarIcon />
                    <span className="text-base sm:text-xl">{movie.showtime}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-blue-200 my-4 sm:my-6"></div>
            <div className="mb-6 sm:mb-8">
              <CinemaHall takenSeats={takenSeats} selectedSeats={selectedSeats} onSeatSelect={setSelectedSeats} />
            </div>
          </div>
          
          <div className="md:w-1/3 p-4 sm:p-6 bg-blue-50 md:bg-white md:border-l border-blue-200">
            <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-4 sm:mb-6">Order Summary</h3>
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <img src="/popcorn.svg" alt="Popcorn" className="w-6 h-6 sm:w-8 sm:h-8" />
                  <div className="ml-2 sm:ml-3">
                    <div className="text-blue-800 font-medium text-sm sm:text-base">Popcorn</div>
                    <div className="text-blue-500 text-xs sm:text-sm">85 UAH</div>
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
                  <img src="/cola.svg" alt="Coke" className="w-6 h-6 sm:w-8 sm:h-8" />
                  <div className="ml-2 sm:ml-3">
                    <div className="text-blue-800 font-medium text-sm sm:text-base">Coca-Cola</div>
                    <div className="text-blue-500 text-xs sm:text-sm">65 UAH</div>
                  </div>
                </div>
                <QuantitySelector
                  quantity={cokeQuantity}
                  onIncrement={() => setCokeQuantity((c) => Math.min(10, c + 1))}
                  onDecrement={() => setCokeQuantity((c) => Math.max(0, c - 1))}
                />
              </div>

              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-blue-600">Tickets ({selectedSeats.length})</span>
                <span className="font-medium">{selectedSeats.length * 120} UAH</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-blue-600">Service</span>
                <span className="font-medium">20 UAH</span>
              </div>

              <div className="flex justify-between border-t border-blue-200 pt-3 text-sm sm:text-base">
                <span className="text-blue-600">Total</span>
                <span className="font-bold">
                  {calculateTotal() + 20 + popcornQuantity * 85 + cokeQuantity * 65} UAH
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowUserForm(true)}
              disabled={selectedSeats.length === 0}
              className={`w-full py-2 sm:py-3 rounded-lg font-bold text-white ${
                selectedSeats.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } transition flex items-center justify-center text-sm sm:text-base`}
            >
              <TicketIcon />
              Buy Tickets
            </button>
            {showConfirmation && <ConfirmationModal />}
            {showUserForm && <UserFormModal />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;