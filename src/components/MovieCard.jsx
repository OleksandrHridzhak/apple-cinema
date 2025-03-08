import React from 'react';


const MovieCard = ({ poster, title, description, genre, showtime }) => {
    return (
        <div className="movie-card">
            <img src={poster} alt={`Poster`} className="movie-poster" />
            <h2 className="movie-title">{title}</h2>
            <p className="movie-description">{description}</p>
            <p className="movie-genre">Genre: {genre}</p>
            <p className="movie-showtime">Showtime: {showtime}</p>
        </div>
    );
};

export default MovieCard;