import { useState } from "react";

interface MovieProps {
  title: string;
  director: string;
  description: string;
}

const Movie = ({ title, director, description }: MovieProps) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      onClick={() => setShowDescription((prev) => !prev)}
      style={{ cursor: "pointer", margin: "10px 0" }}
    >
      <h3>{title}</h3>
      <p>
        <strong>Director:</strong> {director}
      </p>
      {showDescription && (
        <p>
          <em>{description}</em>
        </p>
      )}
    </div>
  );
};

export default Movie;
