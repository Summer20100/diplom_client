import { FC } from 'react'
/* import { IHall } from '../../../../models/IMovieDate' */
import TimeSeans from './TimeSeans';

interface ISessions {
  id?: number;
  session_start: string;
  session_finish: string;
  film_id?: number | null;
};

interface IHall {
  hall_id?: number; 
  film_id?: number;
  hall_title: string;
  sessions: ISessions[];
};

export const Hall: FC<IHall> = ({ hall_title, hall_id, sessions, film_id }) => {
  return (
    <div className="movie-seances__hall">
      <h3 className="movie-seances__hall-title">{ hall_title }</h3>
        <TimeSeans sessions={sessions} hall_id={hall_id} film_id={film_id} hall_title={hall_title}/>
    </div>
  )
}

export default Hall
