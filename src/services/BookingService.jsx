const API_BASE_URL = 'http://localhost:3022/api';

const fetchData = async (url, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Помилка при виконанні запиту:', error);
        throw error;
    }
};

const ensureSeatsArray = (seats) => seats;

export const getAllBookings = async () => {
    try {
        return await fetchData('/bookings');
    } catch (error) {
        console.error('Помилка читання бронювань:', error);
        return [];
    }
};

export const saveBooking = async (bookingData) => {
    try {
        const seatsToBook = bookingData.seats;
        
        const availability = await checkSeatsAvailability(
            bookingData.movieId, 
            bookingData.seanceTimes, 
            seatsToBook
        );

        if (!availability.available) {
            return {
                success: false,
                message: `Наступні місця вже зайняті: ${availability.unavailableSeats.join(', ')}`,
                conflictedSeats: availability.unavailableSeats
            };
        }

        const response = await fetchData('/bookings', {
            method: 'POST',
            body: JSON.stringify({
                ...bookingData,
                seats: seatsToBook
            })
        });

        return { 
            success: true, 
            bookingId: response.id || Date.now().toString() 
        };
    } catch (error) {
        console.error('Помилка збереження бронювання:', error);
        return { 
            success: false, 
            message: error.message || 'Помилка сервера' 
        };
    }
};

export const getReservationsForSeance = async (movieId, seance) => {
    try {
        return await fetchData(`/bookings/${movieId}/${seance}`);
    } catch (error) {
        console.error('Помилка отримання бронювань для сеансу:', error);
        return [];
    }
};

export const getTakenSeatsForSeance = async (movieId, seance) => {
    try {
        const reservations = await getReservationsForSeance(movieId, seance);
        console.log('Зайняті місця для сеансу:', reservations);
        return reservations.flatMap(r => r.seats);

    } catch (error) {
        console.error('Помилка отримання зайнятих місць:', error);
        return [];
    }
};

export const checkSeatsAvailability = async (movieId, seance, seats) => {
    try {
        const seatsToCheck = seats;
        
        const response = await fetchData('/bookings/check-availability', {
            method: 'POST',
            body: JSON.stringify({ 
                movieId, 
                seance, 
                seats: seatsToCheck 
            })
        });

        return {
            available: response.available,
            unavailableSeats: response.unavailableSeats
        };
    } catch (error) {
        console.error('Помилка перевірки доступності місць:', error);
        return {
            available: false,
            unavailableSeats:seats
        };
    }
};

export const cancelBooking = async (bookingId) => {
    try {
        await fetchData(`/bookings/${bookingId}`, {
            method: 'DELETE'
        });
        return { success: true };
    } catch (error) {
        console.error('Помилка скасування бронювання:', error);
        return { 
            success: false, 
            message: error.message || 'Помилка скасування бронювання' 
        };
    }
};
