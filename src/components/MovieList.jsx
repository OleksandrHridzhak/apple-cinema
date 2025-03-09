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
        <div className="p-4">
            <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <div className="flex justify-center flex-wrap gap-4">
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
        </div>
    );
};

export default MovieList;
