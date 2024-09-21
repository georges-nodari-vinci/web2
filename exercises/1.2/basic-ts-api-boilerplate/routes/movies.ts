import { Router } from "express";

const router = Router();

const films = [
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

router.get("/", (_req, res) => {
  res.json(films);
});


export default router;