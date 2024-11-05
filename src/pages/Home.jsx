// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { fetchAnimeList } from '../services/apiService';
import AnimeSection from '../components/AnimeSection';
import SearchBar from '../components/SearchBar';
import FilterTags from '../components/FilterTags';

const Home = () => {
  const [animes, setAnimes] = useState([]);
  const [displayedAnimes, setDisplayedAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchAnimeList();
      setAnimes(data);
      setDisplayedAnimes(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filteredAnimes = animes;

    if (selectedCategory !== "All") {
      filteredAnimes = filteredAnimes.filter(anime =>
        anime.genres.includes(selectedCategory)
      );
    }

    if (searchQuery) {
      filteredAnimes = filteredAnimes.filter(anime =>
        anime.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setDisplayedAnimes(filteredAnimes);
  }, [selectedCategory, searchQuery, animes]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="text-white max-w-6xl mx-auto px-4 py-8">
      <header className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mb-6">
        <h1 className="text-2xl font-bold">Trending Anime</h1>
        <SearchBar onSearchChange={handleSearchChange} />
      </header>

      <FilterTags selectedCategory={selectedCategory} onCategoryClick={handleCategoryClick} />

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <AnimeSection title="Results" animes={displayedAnimes} />
      )}
    </div>
  );
};

export default Home;
