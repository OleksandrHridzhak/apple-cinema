import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ id, poster, title, description, genre, showtime }) => {
  return (
    <div className="relative group w-full max-w-[330px] h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 hover:shadow-blue-500/20">
      <div className="relative h-full w-full">
        <img
          src={poster}
          alt={`Poster ${title}`}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-gray-900/80 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border border-gray-700/30 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-2 sm:mb-3 line-clamp-2">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-200 text-center font-light leading-relaxed mb-3 sm:mb-4 line-clamp-3">
            {description}
          </p>
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <span className="px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-xs sm:text-sm font-semibold">
              {genre}
            </span>
            <span className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-800/90 text-gray-100 rounded-full text-xs sm:text-sm font-medium border border-gray-700/30">
              🕒 {showtime}
            </span>
            <Link 
              to={`/booking/${id}`}
              className="mt-1 px-3 py-1 sm:px-4 sm:py-1.5 bg-blue-500 text-white text-xs sm:text-sm rounded-full hover:bg-blue-600 transition duration-200"
            >
              Купити квиток
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;