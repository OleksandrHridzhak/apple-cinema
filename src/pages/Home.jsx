import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import { getMovies } from '../services/BookingService';
import Header from '../components/Header';

const Home = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getMovies();
            setMovies(data);
        };
        fetchData();
    }, []);

    return (
        <>
            <Header />
            <div className="bg-blue-50">
                <MovieList movies={movies} />
            </div>
        </>
    );
};

export default Home;
