import "./App.css";
import Movie from "./components/Movie";
import { Box, Button, Typography } from "@mui/material";
import { IMovieContext } from "./types";
import { useOutletContext } from "react-router-dom";

const MovieListPage = () => {
  const { movies }: IMovieContext = useOutletContext();
  return (
    <>
      <Box>
        <Typography variant="h3" component="h3">
          Mon top 5 des films préférés
        </Typography>
        <Button variant="contained" href="/add-movie">
          Ajouter un film
        </Button>
        {movies.map((movie) => (
          <>
            <Movie key={movie.id} {...movie} />
          </>
        ))}
      </Box>
    </>
  );
};

export default MovieListPage;
