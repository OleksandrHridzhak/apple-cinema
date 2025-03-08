import React from 'react';
import MovieCard from '../components/MovieCard';

const MovieList = () => {
    return (
        <div className="movie-list">
            <MovieCard
                poster='poster.jpg'
                title='Dune'
                description='description'
                genre='Action, Adventure, Drama'
                showtime='8:00 AM'
            />
        </div>
    );
};

export default MovieList;