import IMovie from "../types";

const Movie = ({
  title,
  director,
  duration,
  link,
  budget,
  description,
}: IMovie) => {
  return (
    <details>
      <summary>
        <strong>{title}</strong>
      </summary>
      <p>
        <strong>Director:</strong> {director}
      </p>
      <p>
        <strong>Duration:</strong> {duration} minutes
      </p>
      <p>
        <strong>Link:</strong> {link ? <a href={link}>{link}</a> : "N/A"}
      </p>
      <p>
        <strong>Budget:</strong> {budget !== undefined ? `$${budget}` : "N/A"}
      </p>
      <p>
        <strong>Description:</strong> {description || "N/A"}
      </p>
    </details>
  );
};

export default Movie;
