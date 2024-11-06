import { useState } from "react";
import "./App.css";
import Movie from "./components/Movie";
import myTopMovies from "./data/topMovie";

function App() {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [duration, setDuration] = useState(0);
  const [link, setLink] = useState("");
  const [budget, setBudget] = useState(0);
  const [description, setDescription] = useState("");
  const [movies, setMovies] = useState(myTopMovies);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(
      "submit: ",
      title,
      director,
      duration,
      link,
      budget,
      description
    );

    const newMovie = {
      title,
      director,
      duration,
      link,
      budget,
      description,
    };

    console.log("newMovie: ", newMovie);

    setMovies([...movies, newMovie]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDirectorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDirector(event.target.value);
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(parseInt(event.target.value));
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(parseInt(event.target.value));
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  return (
    <>
      <div>
        <h2>Mon top 5 des films préférés</h2>
        {movies.map((movie, index) => (
          <>
            <Movie key={index} {...movie} />
            <hr />
          </>
        ))}
      </div>
      <h2>Ajouter un film à la liste</h2>
      <form onSubmit={handleSubmit}>
        <fieldset role="group">
          <label htmlFor="title">title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            placeholder="title"
            onChange={handleTitleChange}
          />

          <label htmlFor="director">director: </label>
          <input
            type="text"
            name="director"
            id="director"
            value={director}
            placeholder="director"
            onChange={handleDirectorChange}
          />

          <label htmlFor="link">link: </label>
          <input
            type="text"
            name="link"
            id="link"
            value={link}
            placeholder="link"
            onChange={handleLinkChange}
          />
        </fieldset>
        <hr />
        <fieldset>
          <label htmlFor="duration">duration: </label>
          <input
            type="number"
            name="duration"
            id="duration"
            value={duration}
            placeholder="duration"
            onChange={handleDurationChange}
          />

          <label htmlFor="budget">budget: </label>
          <input
            type="number"
            name="budget"
            id="budget"
            value={budget}
            placeholder="budget"
            onChange={handleBudgetChange}
          />

          <label htmlFor="description">description: </label>
          <textarea
            name="description"
            id="description"
            value={description}
            placeholder="description"
            onChange={handleDescriptionChange}
          ></textarea>
        </fieldset>
        <button type="submit">Ajouter</button>
      </form>
    </>
  );
}

export default App;
