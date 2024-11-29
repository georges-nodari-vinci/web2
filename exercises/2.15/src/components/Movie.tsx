import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ITopMovie } from "../types";

const Movie = ({
  title,
  director,
  duration,
  link,
  budget,
  description,
}: ITopMovie) => {
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
        <Typography>Description: {description || "N/A"}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default Movie;
