import { useMatch } from "react-router-dom";
import myTopMovies from "./data/topMovies";
import { ITopMovie } from "./types";
import { Button } from "@mui/material";

const MoviePage = () => {
  const match = useMatch("/movie/:movieId");
  const movieId = match?.params.movieId;
  if (!movieId) return <p>Movie not found</p>;

  const movie = myTopMovies.find((movie) => movie.id.toString() === movieId) as
    | ITopMovie
    | undefined;
  if (!movie) return <p>User not found</p>;

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.history.back()}
      >
        Back
      </Button>
      <h1>{movie.title}</h1>
      <p>{movie.director}</p>
      <p>{movie.duration}</p>
      <p>{movie.link}</p>
      <p>{movie.budget}</p>
      <p>{movie.description}</p>
    </div>
  );
};

export default MoviePage;
