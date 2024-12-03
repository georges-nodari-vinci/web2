import path from "node:path";
import { parse, serialize } from "../utils/json";
import { Movie, NewMovie } from "../types";
const jsonDbPath = path.join(__dirname, "/../data/movies.json");

interface MovieSearchParams {
  minimumDuration?: number;
  titleStartsWith?: string;
  sortBy?: "title" | "duration";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

const movies: Movie[] = parse(jsonDbPath, []);

function validateMovieProperties(body: unknown) {
  const allowedProperties = new Set([
    "title",
    "director",
    "duration",
    "budget",
    "description",
    "imageUrl",
  ]);

  for (const key of Object.keys(body as object)) {
    if (!allowedProperties.has(key)) {
      return false; // Une propriété inattendue a été trouvée
    }
  }
  return true; // Toutes les propriétés sont valides
}

function isValidMovieData(body: Partial<NewMovie>): body is NewMovie {
  return (
    typeof body.title === "string" &&
    typeof body.director === "string" &&
    typeof body.duration === "number" &&
    body.duration > 0 &&
    typeof body.budget === "number" &&
    body.budget >= 0 &&
    typeof body.description === "string" &&
    typeof body.imageUrl === "string" &&
    body.title.trim() !== "" &&
    body.director.trim() !== "" &&
    body.imageUrl.trim() !== ""
  );
}

function existingMovie(title: string, director: string): boolean {
  return movies.some(
    (movie) =>
      movie.title.toLowerCase() === title.toLowerCase() &&
      movie.director.toLowerCase() === director.toLowerCase()
  );
}

function readAllMovies({
  minimumDuration,
  titleStartsWith,
  sortBy,
  sortOrder = "asc",
}: MovieSearchParams): {
  // totalPages: number;
  // currentPage: number;
  movies: Movie[];
} {
  let movies: Movie[] = parse(jsonDbPath, []);

  // Filtrage par durée minimale
  if (minimumDuration) {
    movies = movies.filter((movie) => movie.duration >= minimumDuration);
  }

  if (titleStartsWith) {
    movies = movies.filter((movie) =>
      movie.title.toLowerCase().startsWith(titleStartsWith.toLowerCase())
    );
  }

  if (sortBy) {
    const order = sortOrder === "desc" ? -1 : 1;

    if (sortBy === "title") {
      movies.sort((a, b) => a.title.localeCompare(b.title) * order);
    } else if (sortBy === "duration") {
      movies.sort((a, b) => (a.duration - b.duration) * order);
    }
  }

  // Pagination
  // const startIndex = (page - 1) * limit;
  // const endIndex = startIndex + limit;

  // const paginatedMovies = movies.slice(startIndex, endIndex);
  // const totalPages = Math.ceil(movies.length / limit);

  return {
    // totalPages,
    // currentPage: page,
    movies,
  };
}

function readMovieById(id: number): Movie | undefined {
  return movies.find((movie) => movie.id === id);
}

function createMovie(newMovie: NewMovie): Movie {
  const nextId =
    movies.reduce((maxId, movie) => Math.max(maxId, movie.id), 0) + 1;
  const movie = { ...newMovie, id: nextId };
  movies.push(movie);
  serialize(jsonDbPath, movies);
  return movie;
}

function deleteMovie(id: number): Movie | undefined {
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex === -1) {
    return undefined;
  }
  const deletedElements = movies.splice(movieIndex, 1);
  serialize(jsonDbPath, movies);
  return deletedElements[0];
}

function updateMovie(
  id: number,
  updatedMovie: Partial<NewMovie>
): Movie | undefined {
  // Recherche du film correspondant à l'ID
  const movie = movies.find((movie) => movie.id === id);
  if (!movie) {
    return undefined; // Retourne null si le film n'existe pas
  }

  // Mise à jour des champs fournis
  if (updatedMovie.title) {
    movie.title = updatedMovie.title;
  }
  if (updatedMovie.director) {
    movie.director = updatedMovie.director;
  }
  if (updatedMovie.duration) {
    movie.duration = updatedMovie.duration;
  }
  if (updatedMovie.budget) {
    movie.budget = updatedMovie.budget;
  }
  if (updatedMovie.description) {
    movie.description = updatedMovie.description;
  }
  if (updatedMovie.imageUrl) {
    movie.imageUrl = updatedMovie.imageUrl;
  }

  // Mettre à jour la base de données (sérialisation)
  const updatedMovies = movies.map((m) => (m.id === id ? movie : m));
  serialize(jsonDbPath, updatedMovies);

  return movie;
}

function replaceOrCreateMovie(
  id: number,
  newMovieData: NewMovie
): Movie | null | "conflict" {
  // Vérifie si le film avec cet ID existe déjà
  const existingMovieIndex = movies.findIndex((movie) => movie.id === id);

  // Vérifie si un film avec le même titre et réalisateur existe déjà (hors celui à mettre à jour)
  const existingMovie = movies.find(
    (movie) =>
      movie.id !== id &&
      movie.title.toLowerCase() === newMovieData.title.toLowerCase() &&
      movie.director.toLowerCase() === newMovieData.director.toLowerCase()
  );

  if (existingMovie) {
    return "conflict"; // Un film similaire existe déjà
  }

  if (existingMovieIndex !== -1) {
    // Si le film existe, le remplacer
    const updatedMovie: Movie = { id, ...newMovieData };
    movies[existingMovieIndex] = updatedMovie; // Mise à jour du film
    serialize(jsonDbPath, movies); // Mise à jour du fichier JSON
    return updatedMovie;
  }

  // Si le film n'existe pas et que l'ID est unique, le créer
  const idExists = movies.some((movie) => movie.id === id);
  if (idExists) {
    return "conflict"; // Conflit si l'ID existe déjà
  }

  const nextId =
    movies.reduce((maxId, movie) => (movie.id > maxId ? movie.id : maxId), 0) +
    1;

  const newMovie: Movie = { id: nextId, ...newMovieData };
  movies.push(newMovie);
  serialize(jsonDbPath, movies); // Mise à jour du fichier JSON
  return newMovie; // Retourne le nouveau film créé
}

export {
  validateMovieProperties,
  isValidMovieData,
  existingMovie,
  readAllMovies,
  readMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
  replaceOrCreateMovie,
};
