import React, { useState } from 'react';
import MovieCard from '../components/MovieCard';

const MovieList = ({ movies }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search by title"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            {filteredMovies.map((movie, index) => (
                <MovieCard
                    key={index}
                    poster={movie.poster}
                    title={movie.title}
                    description={movie.description}
                    genre={movie.genre}
                    showtime={movie.showtime}
                />
            ))}
        </div>
    );
};

export default MovieList;
