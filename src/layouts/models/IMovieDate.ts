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
  id: number;
  poster_title: string;
  title: string;
  image: string;
  synopsis: string;
  duration: number;
  origin: string;
}


