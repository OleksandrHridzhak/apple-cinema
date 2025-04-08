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
        <div className=" bg-blue-50 p-4 sm:p-6 md:p-8 min-h-screen">
            <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
                <input
                    type="text"
                    placeholder="Пошук фільмів..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full p-2 sm:p-3 bg-white border-2 border-blue-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
            </div>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {filteredMovies.map((movie, index) => (
                        <div key={index} className="w-full flex justify-center">
                            <MovieCard
                                id={movie.id}
                                poster={movie.poster}
                                title={movie.title}
                                description={`${movie.description.slice(0, 100)}${movie.description.length > 100 ? '...' : ''}`}
                                genre={movie.genre}
                                showtime={movie.seanceTimes[0]}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {filteredMovies.length === 0 && (
                <div className="text-center mt-8 sm:mt-12">
                    <p className="text-xl sm:text-2xl font-bold text-blue-500">
                        Нічого не знайдено
                    </p>
                </div>
            )}
        </div>
    );
};

export default MovieList;