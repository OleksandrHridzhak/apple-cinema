const API_BASE_URL = 'http://localhost:3022/api';

export const getMovies = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/movies`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    } catch (error) {
        console.error('Помилка отримання списку фільмів:', error);
        return [];
    }
};

export const getMovie = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    } catch (error) {
        console.error('Помилка отримання списку фільмів:', error);
        return [];
    }
};
export const saveBooking = async (bookingData) => {
    try {
        const seatsToBook = bookingData.seats;

        const response = await fetch(`${API_BASE_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...bookingData,
                seats: seatsToBook,
            }),
        });
        const responseData = await response.json();

        return { 
            success: true, 
            bookingId: responseData.id,
        };
    } catch (error) {
        console.error('Помилка збереження бронювання:', error);
        return { 
            success: false, 
            message: error.message || 'Помилка сервера',
        };
    }
};

export const getTakenSeatsForSeance = async (movieId, seance) => {
    try {
        const response = await fetch(`${API_BASE_URL}/bookings/${movieId}/${seance}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const reservations = await response.json();
        console.log('Зайняті місця для сеансу:', reservations);
        return reservations.flatMap(r => r.seats);
    } catch (error) {
        console.error('Помилка отримання зайнятих місць:', error);
        return [];
    }
};
