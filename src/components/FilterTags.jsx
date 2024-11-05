// src/components/FilterTags.jsx
import React from 'react';

const tags = [
  'All', 'Action', 'Adventure', 'Horror', 'Comedy', 'Fantasy', 'Romance', 'Sci-fi', 'Thriller', 'Mystery'
];

const FilterTags = ({ selectedCategory, onCategoryClick }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onCategoryClick(tag)}
          className={`py-1 px-3 rounded-full text-sm ${
            selectedCategory === tag ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default FilterTags;
