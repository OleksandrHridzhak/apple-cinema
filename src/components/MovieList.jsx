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
        <div className="p-8 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto mb-8">
                <input
                    type="text"
                    placeholder="Пошук фільмів..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
            </div>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredMovies.map((movie, index) => (
                    <MovieCard
                        key={index}
                        id={movie.id}
                        poster={movie.poster}
                        title={movie.title}
                        description={`${movie.description.slice(0, 100)}${movie.description.length > 100 ? '...' : ''}`}
                        genre={movie.genre}
                        showtime={movie.seanceTimes[0]}
                    />
                    ))}
                </div>
            </div>


            {filteredMovies.length === 0 && (
                <div className="text-center mt-12">
                    <p className="text-2xl font-bold text-blue-500">
                        Нічого не знайдено
                    </p>
                </div>
            )}
        </div>
    );
};

export default MovieList;