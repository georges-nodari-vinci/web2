// import { useState } from "react";
import "./App.css";
import Movie from "./components/Movie";
import { Box, Button, Typography } from "@mui/material";
import { IMovieContext } from "./types";
import { useOutletContext } from "react-router-dom";

const MovieListPage = () => {
  // const [title, setTitle] = useState("");
  // const [director, setDirector] = useState("");
  // const [duration, setDuration] = useState(0);
  // const [link, setLink] = useState("");
  // const [budget, setBudget] = useState(0);
  // const [description, setDescription] = useState("");

  // const [movies, setMovies] = useState(myTopMovies);

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log(
  //     "submit: ",
  //     title,
  //     director,
  //     duration,
  //     link,
  //     budget,
  //     description
  //   );

  //   const newMovie = {
  //     title,
  //     director,
  //     duration,
  //     link,
  //     budget,
  //     description,
  //   };

  //   console.log("newMovie: ", newMovie);

  //   setMovies([...movies, newMovie]);
  // };

  // const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitle(event.target.value);
  // };

  // const handleDirectorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDirector(event.target.value);
  // };

  // const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDuration(parseInt(event.target.value));
  // };

  // const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setLink(event.target.value);
  // };

  // const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setBudget(parseInt(event.target.value));
  // };

  // const handleDescriptionChange = (
  //   event: React.ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   setDescription(event.target.value);
  // };

  // const fullMovieContext: IMovieContext = {
  //   movies,
  //   title,
  //   director,
  //   duration,
  //   link,
  //   budget,
  //   description,
  //   handleSubmit,
  //   handleTitleChange,
  //   handleDirectorChange,
  //   handleDurationChange,
  //   handleLinkChange,
  //   handleBudgetChange,
  //   handleDescriptionChange,
  // };

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
        {movies.map((movie, index) => (
          <>
            <Movie key={index} {...movie} />
          </>
        ))}
      </Box>

      {/* <Grid2 size={5}>
      <Typography variant="h4" component="h4">
        Ajouter un film à la liste
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" spacing={2}>
          <TextField
            label="Title"
            variant="outlined"
            name="title"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />

          <TextField
            label="Director"
            variant="outlined"
            name="director"
            id="director"
            value={director}
            onChange={handleDirectorChange}
          />

          <TextField
            label="Link"
            variant="outlined"
            name="link"
            id="link"
            value={link}
            onChange={handleLinkChange}
          />

          <TextField
            label="Duration"
            variant="outlined"
            type="number"
            name="duration"
            id="duration"
            value={duration}
            onChange={handleDurationChange}
          />

          <TextField
            label="Budget"
            variant="outlined"
            type="number"
            name="budget"
            id="budget"
            value={budget}
            onChange={handleBudgetChange}
          />

          <TextField
            label="Description"
            variant="outlined"
            name="description"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
          <Button type="submit" variant="contained">
            Ajouter
          </Button>
        </Stack>
      </form>
    </Grid2> */}
    </>
  );
};

export default MovieListPage;
