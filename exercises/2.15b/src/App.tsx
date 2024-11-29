import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box } from "@mui/material";
import { IMovieContext, INewMovie, ITopMovie } from "./types";
import { useEffect, useState } from "react";

async function getAllMovies() {
  try {
    const response = await fetch("/api/movies");
    if (!response.ok)
      throw new Error(
        `fetch error : ${response.status} : ${response.statusText}`
      );

    const { movies } = await response.json();
    return movies;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function App() {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [duration, setDuration] = useState(0);
  const [link, setLink] = useState("");
  const [budget, setBudget] = useState(0);
  const [description, setDescription] = useState("");
  const [movies, setMovies] = useState<ITopMovie[]>([]);

  useEffect(() => {
    getAllMovies()
      .then((movies) => {
        setMovies(movies);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const navigate = useNavigate();
  const addMovie = async (movie: INewMovie) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("/api/movies", options);

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const createdMovie = await response.json();
      setMovies((prevMovies) => [...prevMovies, createdMovie]);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextId = movies.reduce((acc, movie) => {
      return movie.id > acc ? movie.id : acc;
    }, 0);

    const newMovie = {
      id: nextId + 1,
      title,
      director,
      duration,
      link,
      budget,
      description,
    };

    console.log("newMovie: ", newMovie);

    addMovie(newMovie);

    navigate("/movies");
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

  const fullMovieContext: IMovieContext = {
    movies,
    title,
    director,
    duration,
    link,
    budget,
    description,
    handleSubmit,
    handleTitleChange,
    handleDirectorChange,
    handleDurationChange,
    handleLinkChange,
    handleBudgetChange,
    handleDescriptionChange,
  };
  return (
    <div>
      <Header />
      <Box marginY={"50px"}>
        <Outlet context={fullMovieContext} />
      </Box>
      <Footer />
    </div>
  );
}

export default App;
