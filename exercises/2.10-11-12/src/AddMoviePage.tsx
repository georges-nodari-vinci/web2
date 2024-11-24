import { Button, Grid2, Stack, TextField, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { IMovieContext } from "./types";

const AddMoviePage = () => {
  const {
    title,
    director,
    link,
    duration,
    budget,
    description,
    handleSubmit,
    handleTitleChange,
    handleDirectorChange,
    handleLinkChange,
    handleDurationChange,
    handleBudgetChange,
    handleDescriptionChange,
  }: IMovieContext = useOutletContext();
  return (
    <>
      {" "}
      <Grid2 size={5}>
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
      </Grid2>
    </>
  );
};

export default AddMoviePage;
