// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ onSearchChange }) => {
  const handleChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search for anime"
      onChange={handleChange}
      className="bg-gray-800 text-gray-300 rounded-full px-4 py-2 w-full md:w-1/3 lg:w-1/4 focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  );
};

export default SearchBar;
