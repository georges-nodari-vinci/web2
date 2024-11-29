interface ITopMovie {
  id: number;
  title: string;
  director: string;
  duration: number;
  link?: string;
  description?: string;
  budget?: number;
}

interface IMovie {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface IMovieContext {
  movies: ITopMovie[];
  title: string;
  director: string;
  duration: number;
  link: string;
  budget: number;
  description: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDirectorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDurationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLinkChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBudgetChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

interface INewMovie {
  title: string;
  director: string;
  duration: number;
  link?: string;
  description?: string;
  budget?: number;
}

export type { ITopMovie, IMovie, IMovieContext, INewMovie };
