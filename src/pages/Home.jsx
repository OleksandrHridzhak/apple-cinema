import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import { getMovies } from '../services/BookingService';

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
            <div className="">
                <MovieList movies={movies} />
            </div>
        </>
    );
};

export default Home;