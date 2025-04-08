import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CinemaHall from '../components/CinemaHall';
import UserFormModal from '../components/UserFormModal';
import SnackItem from '../components/SnackItem';
import { saveBooking, getTakenSeatsForSeance } from '../services/BookingService';

const Booking = () => {
  const [movies, setMovies] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [popcornQuantity, setPopcornQuantity] = useState(0);
  const [cokeQuantity, setCokeQuantity] = useState(0);
  const [takenSeats, setTakenSeats] = useState([]);
  const [selectedSeance, setSelectedSeance] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.id == movieId);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const API_BASE_URL = 'http://localhost:3022/';
        const response = await fetch(`${API_BASE_URL}api/movies`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log('Fetched movies:', data);
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (movie && movie.seanceTimes && movie.seanceTimes.length > 0) {
      setSelectedSeance(movie.seanceTimes[0]);
    }
  }, [movie]);

  useEffect(() => {
    const fetchTakenSeats = async () => {
      if (selectedSeance) {
        try {
          const seats = await getTakenSeatsForSeance(movieId, selectedSeance);
          setTakenSeats([...seats]); 
        } catch (error) {
          console.error('Error fetching taken seats:', error);
          setTakenSeats([]); 
        }
      }
    };

    fetchTakenSeats();
  }, [movieId, selectedSeance]); 

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
    if (!selectedSeance) newErrors.seance = 'Оберіть час сеансу';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSeanceChange = (seance) => {
    setSelectedSeance(seance);
    setSelectedSeats([]);
  };

  const handleBookingSubmit = async () => {
    if (!validateForm()) return;

    const bookingData = {
      movieId,
      seance: selectedSeance,
      seats: selectedSeats,
      userData,
      snacks: {
        popcorn: popcornQuantity,
        coke: cokeQuantity
      },
      total: selectedSeats.length * 120 + 20 + popcornQuantity * 85 + cokeQuantity * 65,
      timestamp: new Date().toISOString()
    };

    const success = await saveBooking(bookingData);
    if (success) {
      toast.success('Бронювання успішне!');
      setTakenSeats((prev) => [...prev, ...selectedSeats]);
      setShowUserForm(false);
      setSelectedSeats([]);
      setPopcornQuantity(0);
      setCokeQuantity(0);
    } else {
      toast.error('Помилка бронювання');
    }
  };

  const formatSeanceTime = (seance) => {
    const [date, time] = seance.split(' ');
    return `📅${date} |⌚${time}`;
  };

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
              {movie && (
                <>
                  <div className="w-full sm:w-60 sm:h-80 flex-shrink-0 rounded-lg overflow-hidden mb-4 sm:mb-0 sm:mr-4">
                    <img
                      src={`/${movie.poster}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1 sm:gap-0 flex-1 min-w-0">
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mr-auto">{movie.title}</h2>

                    <div className="cflex flex-wrap gap-2 mt-1 text-blue-600">
                      <p className=" text-left sm:text-xl">{movie.duration}</p>
                      <p className="text-left sm:text-xl">{movie.genre}</p>
                      <span className="font-semibold text-base sm:text-xl">{movie.rating}</span>
                    </div>

                    <div className="mt-3 text-blue-600 text-left">
                      <p className="text-base sm:text-lg line-clamp-4 hover:line-clamp-none transition-all">
                        {movie.description}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
            {movie && (
              <>
                <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="flex items-center">
                    <span className="text-base sm:text-lg text-blue-700 font-small">Оберіть сеанс:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {movie.seanceTimes.map((seance) => (
                      <button
                        key={seance}
                        onClick={() => handleSeanceChange(seance)}
                        className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base transition ${
                          selectedSeance === seance
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        }`}
                      >
                        {formatSeanceTime(seance)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="border-b border-blue-200 my-4 sm:my-6"></div>
                {selectedSeance && (
                  <div className="mb-6 sm:mb-8">
                    <CinemaHall 
                      takenSeats={takenSeats} 
                      selectedSeats={selectedSeats} 
                      onSeatSelect={setSelectedSeats} 
                    />
                  </div>
                )}
              </>
            )}
          </div>
          <div className="md:w-1/3 p-4 sm:p-6 bg-blue-50 md:bg-white md:border-l border-blue-200">
            <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-4 sm:mb-6">Деталі замовлення</h3>
            {selectedSeance && (
              <div className="mb-3 p-3 bg-blue-100 rounded-lg">
                <div className="font-medium text-blue-800">Обраний сеанс:</div>
                <div className="text-blue-600">{formatSeanceTime(selectedSeance)}</div>
              </div>
            )}
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <SnackItem
                icon="/popcorn.svg"
                name="Попкорн"
                price={85}
                quantity={popcornQuantity}
                onIncrement={() => setPopcornQuantity((p) => Math.min(10, p + 1))}
                onDecrement={() => setPopcornQuantity((p) => Math.max(0, p - 1))}
              />

              <SnackItem
                icon="/cola.svg"
                name="Coca-Cola"
                price={65}
                quantity={cokeQuantity}
                onIncrement={() => setCokeQuantity((c) => Math.min(10, c + 1))}
                onDecrement={() => setCokeQuantity((c) => Math.max(0, c - 1))}
              />
              
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-blue-600">Квитки ({selectedSeats.length})</span>
                <span className="font-medium">{selectedSeats.length * 120} UAH</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-blue-600">Сервісний збір</span>
                <span className="font-medium">20 UAH</span>
              </div>

              <div className="flex justify-between border-t border-blue-200 pt-3 text-sm sm:text-base">
                <span className="text-blue-600">Всього</span>
                <span className="font-bold">
                  {selectedSeats.length * 120 + 20 + popcornQuantity * 85 + cokeQuantity * 65} UAH
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowUserForm(true)}
              disabled={selectedSeats.length === 0 || !selectedSeance}
              className={`w-full py-2 sm:py-3 rounded-lg font-bold text-white ${
                selectedSeats.length === 0 || !selectedSeance
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } transition flex items-center justify-center text-sm sm:text-base`}
            >
              <img src="/tickets.svg" alt="Ticket" className="w-5 h-5 mr-2" />
              Забронювати
            </button>

            {showUserForm && (
              <UserFormModal
                userData={userData}
                handleInputChange={handleInputChange}
                errors={errors}
                setShowUserForm={setShowUserForm}
                handleBookingSubmit={handleBookingSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;