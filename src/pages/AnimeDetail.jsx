// src/pages/AnimeDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAnimeDetails } from '../services/apiService';

const AnimeDetail = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  // Retrieve watchlist from localStorage
  const getWatchlist = () => {
    return JSON.parse(localStorage.getItem('watchlist')) || [];
  };

  // Add anime to watchlist and update localStorage
  const addToWatchlist = () => {
    const watchlist = getWatchlist();
    watchlist.push(anime);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    setIsInWatchlist(true);
  };

  // Remove anime from watchlist and update localStorage
  const removeFromWatchlist = () => {
    const watchlist = getWatchlist().filter(item => item.id !== anime.id);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    setIsInWatchlist(false);
  };

  // Toggle watchlist status
  const toggleWatchlist = () => {
    if (isInWatchlist) {
      removeFromWatchlist();
    } else {
      addToWatchlist();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchAnimeDetails(parseInt(id, 10));
      setAnime(data);
      setLoading(false);

      // Check if the anime is in the watchlist
      const watchlist = getWatchlist();
      setIsInWatchlist(watchlist.some(item => item.id === data.id));
    };
    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!anime) return <div>Anime not found</div>;

  return (
    <div className="text-white max-w-4xl mx-auto px-4 md:px-10 py-8">
      {/* Header Section with Image and Title Overlay */}
      <div className="relative w-full h-72 md:h-96 lg:h-[30rem] overflow-hidden rounded-lg">
        <img
          src={anime.image}
          alt={anime.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">{anime.title}</h1>
        </div>
      </div>

      {/* Anime Info */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-semibold">{anime.title}</h2>
          <p className="text-sm text-gray-400 mt-1">
            {anime.year} • {anime.episodes} Episodes
          </p>
        </div>
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <div className="flex items-center space-x-1 text-gray-400">
            <span>⭐</span>
            <span>{anime.score}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <span>👁️</span>
            <span>{anime.popularity}M</span>
          </div>
        </div>
      </div>

      {/* Watchlist Button */}
      <button
        onClick={toggleWatchlist}
        className={`mt-6 ${isInWatchlist ? 'bg-red-600' : 'bg-purple-600'} hover:bg-purple-700 transition-colors text-white py-2 px-6 rounded-full`}
      >
        {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </button>

      {/* Synopsis */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Synopsis</h3>
        <p className="text-gray-300">{anime.synopsis}</p>
      </div>

      {/* Genres */}
      <div className="mt-6 flex flex-wrap gap-2">
        {anime.genres.map((genre, index) => (
          <span key={index} className="bg-gray-800 text-gray-300 py-1 px-3 rounded-full text-sm">
            {genre}
          </span>
        ))}
      </div>

      {/* Staff & Cast Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Staff & Cast</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {anime.staff.map((person, index) => (
            <div key={index} className="flex items-center space-x-3">
              <img
                src={person.image || '/default-profile.png'}
                alt={person.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold">{person.name}</p>
                <p className="text-xs text-gray-400">{person.role}</p>
              </div>
            </div>
          ))}
          {anime.cast.map((character, index) => (
            <div key={index} className="flex items-center space-x-3">
              <img
                src={character.image || '/default-profile.png'}
                alt={character.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold">{character.name}</p>
                <p className="text-xs text-gray-400">{character.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
