import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ITopMovie } from "../types";
import { IconButton } from "@mui/material";
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

const Movie = ({
  id,
  title,
  director,
  duration,
  link,
  budget,
  description,
}: ITopMovie) => {
  const handleDelete = async () => {
    await deleteMovie(id);
    window.location.reload();
  };
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Director: {director}</Typography>
        <Typography>Duration: {duration} minutes</Typography>
        <Typography>
          Link: {link ? <a href={link}>{link}</a> : "N/A"}
        </Typography>
        <Typography>
          Budget: {budget !== undefined ? `$${budget}` : "N/A"}
        </Typography>
        <Typography>Description: {description ?? "N/A"}</Typography>
        <IconButton
          aria-label="delete"
          size="large"
          color="error"
          onClick={handleDelete}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </AccordionDetails>
    </Accordion>
  );
};

export default Movie;
