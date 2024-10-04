import { Router } from "express";
import { Movie, NewMovie } from "../types";

const router = Router();

const movies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    budget: 160,
    description: "A mind-bending thriller about dreams within dreams.",
    imageUrl: "https://example.com/inception.jpg",
  },
  {
    id: 2,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duration: 136,
    budget: 63,
    description: "A hacker discovers the true nature of reality.",
    imageUrl: "https://example.com/matrix.jpg",
  },
  {
    id: 3,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    duration: 175,
    budget: 6,
    description: "The story of a powerful mafia family in New York.",
    imageUrl: "https://example.com/godfather.jpg",
  },
  {
    id: 4,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    duration: 152,
    budget: 185,
    description: "Batman faces off against the Joker in Gotham City.",
    imageUrl: "https://example.com/darkknight.jpg",
  },
  {
    id: 5,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    duration: 154,
    budget: 8,
    description: "An intertwined narrative of crime in Los Angeles.",
    imageUrl: "https://example.com/pulpfiction.jpg",
  },
];

router.get("/", (req, res) => {
  let filteredMovies = movies;

  // Validation du paramètre "minimum-duration"
  if (
    req.query["minimum-duration"] &&
    isNaN(Number(req.query["minimum-duration"]))
  ) {
    return res.sendStatus(400);
  }

  // Filtrage par durée minimale
  if (req.query["minimum-duration"]) {
    const minimumDuration = Number(req.query["minimum-duration"]);
    filteredMovies = filteredMovies.filter(
      (movie) => movie.duration >= minimumDuration // Utiliser >= pour "minimum"
    );
  }

  // Filtrage par titre uniquement si le paramètre est présent
  if (req.query["title-starts-with"]) {
    const titleStartsWith = req.query["title-starts-with"];

    if (typeof titleStartsWith !== "string" || titleStartsWith.trim() === "") {
      return res.sendStatus(400);
    }

    filteredMovies = filteredMovies.filter((movie) =>
      movie.title.toLowerCase().startsWith(titleStartsWith.toLowerCase())
    );
  }

  // Tri des films
  if (req.query["sortBy"]) {
    const sortBy = req.query["sortBy"];
    const sortOrder = req.query["sortOrder"] === "desc" ? -1 : 1;

    if (typeof sortBy !== "string") {
      return res.sendStatus(400);
    }

    if (sortBy === "title") {
      filteredMovies.sort((a, b) => a.title.localeCompare(b.title) * sortOrder);
    } else if (sortBy === "duration") {
      if (
        !filteredMovies.every((movie) => typeof movie.duration === "number")
      ) {
        return res.sendStatus(400);
      }
      filteredMovies.sort((a, b) => (a.duration - b.duration) * sortOrder);
    } else {
      return res.sendStatus(400);
    }
  }

  // Pagination
  const page = Number(req.query["page"]) || 1; // Page par défaut 1
  const limit = Number(req.query["limit"]) || 10; // Limite par défaut 10
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedMovies = filteredMovies.slice(startIndex, endIndex);

  // Ajouter des informations de pagination à la réponse
  const totalPages = Math.ceil(filteredMovies.length / limit);

  return res.json({
    totalMovies: filteredMovies.length,
    totalPages: totalPages,
    currentPage: page,
    movies: paginatedMovies,
  });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (!movie) {
    return res.sendStatus(404);
  }
  return res.json(movie);
});

router.post("/", (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    !("budget" in body) ||
    !("description" in body) ||
    !("imageUrl" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    typeof body.budget !== "number" ||
    typeof body.description !== "string" ||
    typeof body.imageUrl !== "string" ||
    !body.title.trim() ||
    !body.director.trim() ||
    !body.imageUrl.trim()
  ) {
    return res.sendStatus(400);
  }

  const {
    title,
    director,
    duration,
    budget = 0,
    description = "",
    imageUrl = "",
  } = body as NewMovie;

  const nextId =
    movies.reduce((maxId, movie) => (movie.id > maxId ? movie.id : maxId), 0) +
    1;

  const existingMovie = movies.find(
    (movie) =>
      movie.title.toLowerCase() === title.toLowerCase() &&
      movie.director.toLowerCase() === director.toLowerCase()
  );

  if (existingMovie) {
    return res.sendStatus(409);
  }

  // autre methode plus explicite pour attribuer le nextId
  // const nextId = movies.length
  //   ? Math.max(...movies.map((movie) => movie.id)) + 1
  //   : 1;

  const newMovie: Movie = {
    id: nextId,
    title,
    director,
    duration,
    budget,
    description,
    imageUrl,
  };
  movies.push(newMovie);
  return res.status(201).json(newMovie);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = movies.findIndex((movie) => movie.id === id);
  if (index === -1) {
    return res.sendStatus(404);
  }
  const deletedElements = movies.splice(index, 1);
  return res.json(deletedElements[0]);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((movie) => movie.id === id);
  if (!movie) {
    return res.sendStatus(404);
  }

  const body: unknown = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    ("title" in body &&
      (typeof body.title !== "string" || !body.title.trim())) ||
    ("director" in body &&
      (typeof body.director !== "string" || !body.director.trim())) ||
    ("duration" in body &&
      (typeof body.duration !== "number" || body.duration <= 0)) ||
    ("budget" in body &&
      (typeof body.budget !== "number" || body.budget < 0)) ||
    ("description" in body && typeof body.description !== "string") ||
    ("imageUrl" in body && typeof body.imageUrl !== "string")
  ) {
    return res.sendStatus(400);
  }

  const {
    title,
    director,
    duration,
    budget,
    description,
    imageUrl,
  }: Partial<NewMovie> = body;

  if (title) {
    movie.title = title;
  }
  if (director) {
    movie.director = director;
  }
  if (duration) {
    movie.duration = duration;
  }
  if (budget) {
    movie.budget = budget;
  }
  if (description) {
    movie.description = description;
  }
  if (imageUrl) {
    movie.imageUrl = imageUrl;
  }

  return res.json(movie);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const body: unknown = req.body;

  // Validation des paramètres reçus
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    !("budget" in body) ||
    !("description" in body) ||
    !("imageUrl" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number" ||
    body.duration <= 0 ||
    typeof body.budget !== "number" ||
    body.budget < 0 ||
    typeof body.description !== "string" ||
    typeof body.imageUrl !== "string" ||
    !body.title.trim() ||
    !body.director.trim() ||
    !body.imageUrl.trim()
  ) {
    return res.sendStatus(400); // Bad Request
  }

  const { title, director, duration, budget, description, imageUrl }: NewMovie =
    body as NewMovie;

  // Vérifiez si le film existe déjà
  const existingMovieIndex = movies.findIndex((movie) => movie.id === id);
  const existingMovie = movies.find(
    (movie) =>
      movie.id !== id &&
      movie.title.toLowerCase() === title.toLowerCase() &&
      movie.director.toLowerCase() === director.toLowerCase()
  );

  if (existingMovie) {
    return res.sendStatus(409); // Conflict si un film similaire existe déjà
  }

  if (existingMovieIndex !== -1) {
    // Si le film existe, remplacez-le
    const updatedMovie: Movie = {
      id,
      title,
      director,
      duration,
      budget,
      description,
      imageUrl,
    };
    movies[existingMovieIndex] = updatedMovie; // Remplacement du film
    return res.json(updatedMovie);
  } else {
    const nextId =
      movies.reduce(
        (maxId, movie) => (movie.id > maxId ? movie.id : maxId),
        0
      ) + 1;
    // Si le film n'existe pas, créez-le si l'ID n'existe pas déjà
    const idExists = movies.some((movie) => movie.id === id);
    if (idExists) {
      return res.sendStatus(409); // Conflict si l'ID existe déjà
    }

    // Créez le nouveau film
    const newMovie: Movie = {
      id: nextId,
      title,
      director,
      duration,
      budget,
      description,
      imageUrl,
    };
    movies.push(newMovie);
    return res.status(201).json(newMovie); // Created
  }
});

export default router;
