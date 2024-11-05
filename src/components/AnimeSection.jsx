// src/components/AnimeSection.jsx
import React from 'react';
import AnimeCard from './AnimeCard';

const AnimeSection = ({ title, animes }) => {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </section>
  );
};

export default AnimeSection;
