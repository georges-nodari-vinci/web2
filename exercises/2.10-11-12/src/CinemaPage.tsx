import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
} from "@mui/material";

const movies = [
  {
    title: "Dune",
    description:
      "Feature adaptation of Frank Herbert's science fiction novel, about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
    image:
      "https://upload.wikimedia.org/wikipedia/en/5/51/Dune_%282021_film%29.jpg",
  },
  {
    title: "No Time to Die",
    description:
      "James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.",
    image:
      "https://upload.wikimedia.org/wikipedia/en/f/f9/No_Time_to_Die_poster.jpg",
  },
  {
    title: "The French Dispatch",
    description:
      'A love letter to journalists set in an outpost of an American newspaper in a fictional twentieth century French city that brings to life a collection of stories published in "The French Dispatch Magazine".',
    image:
      "https://upload.wikimedia.org/wikipedia/en/7/7f/The_French_Dispatch.jpg",
  },
  {
    title: "Black Widow",
    description:
      "A film about Natasha Romanoff in her quests between the films Civil War and Infinity War.",
    image:
      "https://upload.wikimedia.org/wikipedia/en/8/89/Black_Widow_%282021_film%29_poster.jpg",
  },
  {
    title: "Shang-Chi and the Legend of the Ten Rings",
    description:
      "Shang-Chi, the master of unarmed weaponry-based Kung Fu, is forced to confront his past after being drawn into the Ten Rings organization.",
    image:
      "https://upload.wikimedia.org/wikipedia/en/9/90/Shang-Chi_and_the_Legend_of_the_Ten_Rings_poster.jpg",
  },
];

const CinemaPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Films à l'affiche
      </Typography>
      <Grid container spacing={4}>
        {movies.map((movie, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={movie.image}
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CinemaPage;
