import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface ITimeSeans {
  time: string[];
  id: number;
  hallTitle: string;
}

const TimeSeans: FC<ITimeSeans> = ({ time, id, hallTitle }) => {

  const times = time.map((time, index) => (
    <li className="movie-seances__time-block" key={index}>
      <Link
        to={{ pathname: `/client/hall/${id}` }}
        state={ {id, hallTitle, time }}
        className="movie-seances__time"
        preventScrollReset={true}
      >
        { time }
      </Link>
    </li>
  ));

  return (
    <>
      <ul className="movie-seances__list">
        {times}
      </ul>
    </>
  );
};

export default TimeSeans;
