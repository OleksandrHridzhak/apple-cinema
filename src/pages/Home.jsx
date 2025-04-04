import React, { useState } from 'react';
import MovieList from '../components/MovieList';
import movies from '../data/movies.js';
const Home = ({ }) => {
    return (
        <div className="">
            <MovieList movies={movies} />
        </div>
    );
};

export default Home;