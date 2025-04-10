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

app.post('/api/bookings', (req, res) => {
    try {
        const bookings = readData();
        const bookingData = req.body;

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

app.get('/api/movies/:id', (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = movies.find(m => m.id == movieId);
        if (!movie) {
            return res.status(404).json({ error: 'Фільм не знайдено' });
        }

        res.json(movie);
    } catch (error) {
        console.error('Помилка отримання фільму:', error);
        res.status(500).json({ error: 'Помилка сервера' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
    readData();
});
