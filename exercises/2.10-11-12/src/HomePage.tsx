import { Container, Typography, Button, Grid } from "@mui/material";

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
      </Grid>
    </Container>
  );
};

export default HomePage;
