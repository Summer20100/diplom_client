import { FC, useEffect } from 'react'
import { IMovieDate, IMovie } from '../../../../models/IMovieDate'
import { useFilmsStore } from '../../../../store/films';
import Hall from '../components/Hall';

interface ISessions {
  id?: number;
  session_start: string;
  session_finish: string;
  film_id?: number | null;
};

interface IHall {
  hall_id: number;
  hall_title: string;
  sessions: ISessions[];
};

interface ICard {
  film_id: number;
  halls: IHall[];
};


export const Card: FC<ICard> = ({ film_id, halls }) => {
  const { films } = useFilmsStore();

  const film = films.filter(itm => itm.id === film_id)[0];

  return (
    <section className="movie">
      <div className="movie__info">
        <div className="movie__poster">
          <img className="movie__poster-image" alt={film.poster_title} src={film.image_url} />
        </div>
        <div className="movie__description">
        <h2 className="movie__title">{film.title}</h2>
          <p className="movie__synopsis">{film.synopsis}</p>
          <p className="movie__data">
            <span className="movie__data-duration">{film.duration} минут</span>
            <span className="movie__data-origin">{film.origin}</span>
          </p>
        </div>
      </div>

      { halls && 
          halls.map((itm, ind) =>
            <Hall key={itm.hall_id} hall_id={itm.hall_id} film_id={film_id} hall_title={itm.hall_title} sessions={itm.sessions}/>
        )}
    </section>
  )
}

export default Card