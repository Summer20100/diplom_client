import { useFilmsStore } from '../../../store/films';
import { FC } from 'react';

interface IMovieInfo {
  title: string;
  poster_title: string;
  image_url: string;
  duration: number;
}


const Film: FC<IMovieInfo> = ({ title, image_url, poster_title, duration }) => {
  return (
    <>
      <div className="conf-step__movie">
      <img className="conf-step__movie-poster" alt={ poster_title } src={ image_url } />
        <h3 className="conf-step__movie-title">{ title }</h3>
        <p className="conf-step__movie-duration">{ duration } минут</p>
      </div>
    </>
  );
};

export default Film;
