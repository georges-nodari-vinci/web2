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
  if (!req.query["minimum-duration"]) {
    res.json(movies);
  }

  const minimunDuration = Number(req.query["minimum-duration"]);
  const filteredMovies = movies.filter((movie) => {
    return movie.duration <= minimunDuration;
  });

  return res.json(filteredMovies);
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

export default router;
