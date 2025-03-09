import React from 'react';

const MovieCard = ({ poster, title, description, genre, showtime }) => {
    return (
        <div className="relative group w-full max-w-xs h-[550px] rounded-[16px] overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_0_30px_5px_rgba(220,38,38,0.6)]">
            <div className="relative h-full w-full">
                <img
                    src={poster}
                    alt={`Poster`}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="bg-black/60 rounded-[24px] p-6 border border-white/10 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h2 className="font-serif text-3xl font-bold text-red-500 drop-shadow-xl text-center mb-3">
                        {title}
                    </h2>
                    <p className="text-sm text-gray-300 text-center font-light leading-relaxed mb-4">
                        {description}
                    </p>
                    <div className="flex flex-col items-center gap-2">
                        <span className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full text-sm font-semibold">
                            {genre}
                        </span>
                        <span className="px-4 py-2 bg-gray-800/90 text-gray-100 rounded-full text-sm font-medium border border-white/10">
                            🕒 {showtime}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MovieCard;