import {
  Container,
  Typography,
  Button,
  Grid,
  CardContent,
  Card,
} from "@mui/material";
import myTopMovies from "./data/topMovies";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Bienvenue au Cinéma
      </Typography>
      <Typography variant="h5" paragraph>
        Découvrez les derniers films à l'affiche et profitez de nos offres
        spéciales.
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" color="primary" href="/cinema">
            Voir les films à l'affiche
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" href="/movies">
            Explorer tous nos films favoris
          </Button>
        </Grid>
        <Grid container spacing={4}>
          {myTopMovies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4} mt={10}>
              <Card>
                <CardContent>
                  <Typography>
                    <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
