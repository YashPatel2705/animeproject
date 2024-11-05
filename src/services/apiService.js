// src/services/apiService.js

const JIKAN_API_URL = 'https://api.jikan.moe/v4';

export const fetchAnimeList = async () => {
  try {
    const response = await fetch(`${JIKAN_API_URL}/top/anime`);
    const data = await response.json();
    console.log("Fetched anime list:", data); // Debug log

    return data.data.map(anime => ({
      id: anime.mal_id,
      title: anime.title,
      image: anime.images.jpg.large_image_url,
      genres: anime.genres.map(genre => genre.name),
      score: anime.score,
    }));
  } catch (error) {
    console.error("Failed to fetch anime list:", error);
    return [];
  }
};

export const fetchAnimeDetails = async (id) => {
  try {
    const animeResponse = await fetch(`${JIKAN_API_URL}/anime/${id}`);
    const animeData = await animeResponse.json();
    console.log("Fetched anime details:", animeData); // Debug log

    const staffResponse = await fetch(`${JIKAN_API_URL}/anime/${id}/characters`);
    const staffData = await staffResponse.json();
    console.log("Fetched staff and cast data:", staffData); // Debug log

    const anime = animeData.data;
    return {
      id: anime.mal_id,
      title: anime.title,
      image: anime.images.jpg.large_image_url,
      genres: anime.genres.map(genre => genre.name),
      score: anime.score,
      popularity: anime.popularity,
      synopsis: anime.synopsis,
      episodes: anime.episodes,
      year: anime.aired.prop.from.year,
      staff: staffData.data
        .filter(person => person.role === "Staff")
        .map(person => ({
          name: person.name,
          role: person.position,
          image: person.images ? person.images.jpg.image_url : null,
        })),
      cast: staffData.data
        .filter(person => person.role === "Main" || person.role === "Supporting")
        .map(person => ({
          name: person.character.name,
          role: person.role,
          image: person.character.images ? person.character.images.jpg.image_url : null,
        })),
    };
  } catch (error) {
    console.error("Failed to fetch anime details:", error);
    return null;
  }
};
