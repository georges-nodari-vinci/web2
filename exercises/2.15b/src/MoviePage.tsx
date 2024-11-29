import { useNavigate, useParams } from "react-router-dom";
import myTopMovies from "./data/topMovies";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

async function deleteMovie(movieId: number) {
  try {
    const response = await fetch(`/api/movies/${movieId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error deleting movie: ${response.statusText}`);
    }
    console.log(`Movie with ID ${movieId} deleted successfully.`);
  } catch (error) {
    console.error(error);
  }
}

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const movie = myTopMovies.find((movie) => movie.id.toString() === id);
  if (!movie) return <p>Movie not found</p>;

  const handleDelete = async () => {
    await deleteMovie(movie.id);
    navigate("/");
  };
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
      <IconButton
        aria-label="delete"
        size="large"
        color="error"
        onClick={handleDelete}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
};

export default MoviePage;
