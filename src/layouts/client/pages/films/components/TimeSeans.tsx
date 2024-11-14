import React, { FC } from 'react';
import { Link } from 'react-router-dom';

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


const TimeSeans: FC<IHall> = ({ sessions, hall_id, hall_title, film_id }) => {

  const times = sessions.map((time, index) => (
    <li className="movie-seances__time-block" key={index}>
      <Link
        to={{ pathname: `/client/hall/${hall_id}` }}
        state={ {hall_id, hall_title, time, film_id }}
        className="movie-seances__time"
        preventScrollReset={true}
      >
        { time.session_start.slice(0, 5) }
      </Link>
    </li>
  ));

  console.log(`/client/hall/${hall_id}`)

  return (
    <>
      <ul className="movie-seances__list">
        {times}
      </ul>
    </>
  );
};

export default TimeSeans;
