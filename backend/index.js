const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const MOVIES_FILE = path.join(__dirname, 'data', 'movies.json');
const movies = require(MOVIES_FILE);

const app = express();
const PORT = 3022;
const DATA_FILE = path.join(__dirname, 'data', 'data.json');

app.use(cors());
app.use(express.json());

const readData = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data) || [];
    } catch (error) {
        if (error.code === 'ENOENT') {
            writeData([]);
            return [];
        }
        console.error('Помилка читання файлу:', error);
        return [];
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Помилка запису у файл:', error);
    }
};

app.get('/api/bookings', (req, res) => {
    try {
        const bookings = readData();
        res.json(bookings);
    } catch (error) {
        console.error('Помилка читання бронювань:', error);
        res.status(500).json({ error: 'Помилка сервера' });
    }
});

app.post('/api/bookings', (req, res) => {
    try {
        const bookings = readData();
        const bookingData = req.body;
        const existingSeats = getTakenSeatsForSeance(bookings, bookingData.movieId, bookingData.seance);
        const conflictedSeats = bookingData.seats.filter(seat => existingSeats.includes(seat));
        
        if (conflictedSeats.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Наступні місця вже зайняті: ${conflictedSeats.join(', ')}`,
                conflictedSeats
            });
        }

        const newBooking = {
            ...bookingData,
            id: Date.now().toString()
        };

        writeData([...bookings, newBooking]);
        res.json({ success: true, bookingId: newBooking.id });
    } catch (error) {
        console.error('Помилка збереження бронювання:', error);
        res.status(500).json({ success: false, message: 'Помилка сервера' });
    }
});

app.get('/api/bookings/:movieId/:seance', (req, res) => {
    try {
        const bookings = readData();
        const { movieId, seance } = req.params;
        const reservations = bookings.filter(b => b.movieId === movieId && b.seance === seance);
        res.json(reservations);
    } catch (error) {
        console.error('Помилка отримання бронювань:', error);
        res.status(500).json({ error: 'Помилка сервера' });
    }
});

app.get('/api/movies', (req, res) => {
    try {
        if (fs.existsSync(MOVIES_FILE)) {
            res.json(movies);
        } else {
            res.status(404).json({ error: 'Файл з фільмами не знайдено' });
        }
    } catch (error) {
        console.error('Помилка отримання фільмів:', error);
        res.status(500).json({ error: 'Помилка сервера' });
    }
});

app.post('/api/bookings/check-availability', (req, res) => {
    try {
        const bookings = readData();
        const { movieId, seance, seats } = req.body;
        const takenSeats = getTakenSeatsForSeance(bookings, movieId, seance);
        const unavailable = seats.filter(seat => takenSeats.includes(seat));
        
        res.json({
            available: unavailable.length === 0,
            unavailableSeats: unavailable
        });
    } catch (error) {
        console.error('Помилка перевірки доступності:', error);
        res.status(500).json({ error: 'Помилка сервера' });
    }
});

app.delete('/api/bookings/:bookingId', (req, res) => {
    try {
        const bookings = readData();
        const { bookingId } = req.params;
        const updatedBookings = bookings.filter(b => b.id !== bookingId);
        writeData(updatedBookings);
        res.json({ success: true });
    } catch (error) {
        console.error('Помилка скасування:', error);
        res.status(500).json({ success: false, message: 'Помилка скасування бронювання' });
    }
});

function getTakenSeatsForSeance(bookings, movieId, seance) {
    const reservations = bookings.filter(b => b.movieId === movieId && b.seance === seance);
    return reservations.flatMap(r => r.seats);
}

app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
    readData();
});
