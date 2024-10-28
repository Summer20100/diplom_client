export interface IMovieDate {
  date: string;
  movie: IMovie[];
}

export interface IMovie {
  id: number;
  poster_title: string;
  title: string;
  image: string;
  synopsis: string;
  duration: number;
  origin: string;
  hall: IHall[];
}

export interface IHall {
  title: string;
  time: string[];
}

export interface IMovieInfo {
  id?: number;
  title: string;
  origin: string;
  release_date: number | null;
  poster_title: string;
  synopsis: string;
  image_url: string;
  duration: number | null;
  for_registration: boolean;
}
