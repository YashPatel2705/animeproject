// src/components/AnimeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AnimeCard = ({ anime }) => {
  return (
    <Link to={`/anime/${anime.id}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <img src={anime.image} alt={anime.title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{anime.title}</h3>
          <p className="text-sm text-gray-400">{anime.genres.join(', ')}</p>
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
