const STORAGE_KEY = 'movie_bookings';

export const getAllBookings = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (error) {
        console.error('Помилка читання бронювань:', error);
        return [];
    }
};

export const saveBooking = (bookingData) => {
    try {
        const bookings = getAllBookings();
        bookings.push(bookingData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
        return true;
    } catch (error) {
        console.error('Помилка збереження бронювання:', error);
        return false;
    }
};

export const getReservationsByMovieId = (movieId) => {
    const bookings = getAllBookings();
    return bookings.filter(booking => booking.movieId === movieId);
};

export const getTakenSeatsForMovie = (movieId) => {
    const reservations = getReservationsByMovieId(movieId);
    return reservations.flatMap(reservation => reservation.seats);
};

export const cancelBooking = (bookingId) => {
    try {
        const bookings = getAllBookings().filter(b => b.id !== bookingId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
        return true;
    } catch (error) {
        console.error('Помилка скасування бронювання:', error);
        return false;
    }
};
