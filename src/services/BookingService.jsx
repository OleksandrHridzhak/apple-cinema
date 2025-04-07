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
        const existingSeats = getTakenSeatsForSeance(bookingData.movieId, bookingData.seance);
        const conflictedSeats = bookingData.seats.filter(seat => existingSeats.includes(seat));
        
        if (conflictedSeats.length > 0) {
            return {
                success: false,
                message: `Наступні місця вже зайняті: ${conflictedSeats.join(', ')}`,
                conflictedSeats
            };
        }

        const newBooking = {
            ...bookingData,
            id: Date.now().toString()
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify([...bookings, newBooking]));
        return { success: true, bookingId: newBooking.id };
    } catch (error) {
        console.error('Помилка збереження бронювання:', error);
        return { success: false, message: 'Помилка сервера' };
    }
};

export const getReservationsForSeance = (movieId, seance) => {
    const bookings = getAllBookings();
    return bookings.filter(b => b.movieId === movieId && b.seance === seance);
};

export const getTakenSeatsForSeance = (movieId, seance) => {
    const reservations = getReservationsForSeance(movieId, seance);
    return reservations.flatMap(r => r.seats);
};

export const checkSeatsAvailability = (movieId, seance, seats) => {
    const takenSeats = getTakenSeatsForSeance(movieId, seance);
    const unavailable = seats.filter(seat => takenSeats.includes(seat));
    return {
        available: unavailable.length === 0,
        unavailableSeats: unavailable
    };
};

export const cancelBooking = (bookingId) => {
    try {
        const updatedBookings = getAllBookings().filter(b => b.id !== bookingId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
        return { success: true };
    } catch (error) {
        console.error('Помилка скасування:', error);
        return { success: false, message: 'Помилка скасування бронювання' };
    }
};
