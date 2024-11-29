import {
  Container,
  Typography,
  Button,
  Grid2,
  CardContent,
  Card,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ITopMovie } from "./types";

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

const HomePage = () => {
  const [movies, setMovies] = useState<ITopMovie[]>([]);

  // Charger les films au montage
  useEffect(() => {
    getAllMovies()
      .then((movies) => setMovies(movies)) // Mettre à jour l'état avec les films récupérés
      .catch((error) => console.error(error));
  }, []); // [] assure que l'effet est exécuté une seule fois au montage
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Bienvenue au Cinéma
      </Typography>
      <Typography variant="h5">
        Découvrez les derniers films à l'affiche et profitez de nos offres
        spéciales.
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2>
          <Button variant="contained" color="primary" href="/cinema">
            Voir les films à l'affiche
          </Button>
        </Grid2>
        <Grid2>
          <Button variant="outlined" color="primary" href="/movies">
            Explorer tous nos films favoris
          </Button>
        </Grid2>
        <Grid2 container spacing={4}>
          {movies.map((movie) => (
            <Grid2 key={movie.id}>
              <Card>
                <CardContent>
                  <Typography>
                    <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default HomePage;
