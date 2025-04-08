import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';

const Home = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const API_BASE_URL = 'http://localhost:3022/';
                const response = await fetch(`http://localhost:3022/api/movies`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                const data = await response.json();
                console.log('Fetched movies:', data); // Debugging line
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
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