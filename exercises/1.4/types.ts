interface Movie {
  id: number;
  title: string;
  director: string;
  duration: number;
  budget?: number;
  description?: string;
  imageUrl?: string;
}

type NewMovie = Omit<Movie, "id">;

export type { Movie, NewMovie };
