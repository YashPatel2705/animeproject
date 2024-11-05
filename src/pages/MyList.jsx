// src/pages/MyList.jsx
import React, { useState, useEffect } from 'react';
import AnimeCard from '../components/AnimeCard';

const MyList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [filteredWatchlist, setFilteredWatchlist] = useState([]);
  const [sortOrder, setSortOrder] = useState('A-Z');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterGenre, setFilterGenre] = useState('All');

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(storedWatchlist);
    setFilteredWatchlist(storedWatchlist);
  }, []);

  useEffect(() => {
    let updatedList = [...watchlist];

    // Apply filtering by Watched/Unwatched
    if (filterStatus !== 'All') {
      updatedList = updatedList.filter(item =>
        filterStatus === 'Watched' ? item.watched : !item.watched
      );
    }

    // Apply filtering by Genre
    if (filterGenre !== 'All') {
      updatedList = updatedList.filter(item =>
        item.genres.includes(filterGenre)
      );
    }

    // Apply sorting
    if (sortOrder === 'A-Z') {
      updatedList.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'Z-A') {
      updatedList.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOrder === 'Date Added') {
      updatedList.reverse(); // Assuming list is initially stored by date added
    }

    setFilteredWatchlist(updatedList);
  }, [sortOrder, filterStatus, filterGenre, watchlist]);

  const handleSortChange = (order) => setSortOrder(order);
  const handleStatusFilter = (status) => setFilterStatus(status);
  const handleGenreFilter = (genre) => setFilterGenre(genre);

  return (
    <div className="text-white max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My List</h1>

      {/* Sort Options */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Sort</h2>
        <div className="flex gap-3">
          <button
            onClick={() => handleSortChange('A-Z')}
            className={`py-1 px-3 rounded-full ${sortOrder === 'A-Z' ? 'bg-purple-600' : 'bg-gray-800'} text-gray-200`}
          >
            A-Z
          </button>
          <button
            onClick={() => handleSortChange('Z-A')}
            className={`py-1 px-3 rounded-full ${sortOrder === 'Z-A' ? 'bg-purple-600' : 'bg-gray-800'} text-gray-200`}
          >
            Z-A
          </button>
          <button
            onClick={() => handleSortChange('Date Added')}
            className={`py-1 px-3 rounded-full ${sortOrder === 'Date Added' ? 'bg-purple-600' : 'bg-gray-800'} text-gray-200`}
          >
            Date Added
          </button>
        </div>
      </div>

      {/* Filter Options */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Filter by</h2>
        <div className="flex gap-3">
          <button
            onClick={() => handleStatusFilter('All')}
            className={`py-1 px-3 rounded-full ${filterStatus === 'All' ? 'bg-purple-600' : 'bg-gray-800'} text-gray-200`}
          >
            All
          </button>
          <button
            onClick={() => handleStatusFilter('Unwatched')}
            className={`py-1 px-3 rounded-full ${filterStatus === 'Unwatched' ? 'bg-purple-600' : 'bg-gray-800'} text-gray-200`}
          >
            Unwatched
          </button>
          <button
            onClick={() => handleStatusFilter('Watched')}
            className={`py-1 px-3 rounded-full ${filterStatus === 'Watched' ? 'bg-purple-600' : 'bg-gray-800'} text-gray-200`}
          >
            Watched
          </button>
          {/* Genre Filters */}
          {['Action', 'Comedy', 'Fantasy', 'Romance', 'Sci-Fi'].map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreFilter(genre)}
              className={`py-1 px-3 rounded-full ${filterGenre === genre ? 'bg-purple-600' : 'bg-gray-800'} text-gray-200`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Watchlist Display */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredWatchlist.length > 0 ? (
          filteredWatchlist.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No items in your watchlist.</p>
        )}
      </div>
    </div>
  );
};

export default MyList;
