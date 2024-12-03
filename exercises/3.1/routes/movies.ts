import { Router } from "express";
import { NewMovie } from "../types";
import {
  createMovie,
  deleteMovie,
  existingMovie,
  isValidMovieData,
  readAllMovies,
  readMovieById,
  replaceOrCreateMovie,
  updateMovie,
  validateMovieProperties,
} from "../services/movies";
import { authorize } from "../utils/auths";

const router = Router();

router.get("/", (req, res) => {
  const {
    "minimum-duration": minimumDuration,
    "title-starts-with": titleStartsWith,
    sortBy,
    sortOrder,
    page,
    limit,
  } = req.query;

  // Convertir les paramètres en types appropriés avant d'appeler le service
  const result = readAllMovies({
    minimumDuration: minimumDuration ? Number(minimumDuration) : undefined,
    titleStartsWith: titleStartsWith as string,
    sortBy: sortBy as "title" | "duration",
    sortOrder: sortOrder as "asc" | "desc",
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 10,
  });

  res.json(result);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = readMovieById(id);
  if (!movie) {
    return res.sendStatus(404);
  }
  return res.json(movie);
});

router.post("/", authorize, (req, res) => {
  const body: unknown = req.body;
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof body.title !== "string" ||
    typeof body.director !== "string" ||
    typeof body.duration !== "number"
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

  const existingMovieCheck = existingMovie(title, director);

  if (existingMovieCheck) {
    return res.sendStatus(409);
  }

  const newMovieData = createMovie({
    title,
    director,
    duration,
    budget,
    description,
    imageUrl,
  });
  return res.status(201).json(newMovieData);
});

router.patch("/:id", authorize,(req, res) => {
  const id = Number(req.params.id);

  const body: unknown = req.body;

  // Validation des données du corps de la requête
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

  const updatedData: Partial<NewMovie> = body as Partial<NewMovie>;

  const updatedMovie = updateMovie(id, updatedData);

  if (!updatedMovie) {
    return res.sendStatus(404); // Film non trouvé
  }

  return res.json(updatedMovie);
});

router.put("/:id", authorize, (req, res) => {
  const id = Number(req.params.id);
  const body: unknown = req.body;

  // Valide les propriétés du film
  if (
    !validateMovieProperties(body as Partial<NewMovie>) ||
    !isValidMovieData(body as Partial<NewMovie>)
  ) {
    return res.sendStatus(400); // Bad Request
  }

  const newMovieData: NewMovie = body as NewMovie;

  // Appel du service pour remplacer ou créer le film
  const result = replaceOrCreateMovie(id, newMovieData);

  if (result === "conflict") {
    return res.sendStatus(409); // Conflit si un film ou un ID similaire existe déjà
  } else if (result) {
    return res.status(201).json(result); // Retourne le film mis à jour ou créé
  } else {
    return res.sendStatus(500); // Erreur serveur si quelque chose se passe mal
  }
});

router.delete("/:id", authorize, (req, res) => {
  const id = Number(req.params.id);
  const deletedElements = deleteMovie(id);
  if (!deletedElements) {
    return res.sendStatus(404);
  }
  return res.json(deletedElements);
});

export default router;
