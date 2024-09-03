import { FC } from 'react'
import { IHall } from '../../../../models/IMovieDate'
import TimeSeans from './TimeSeans';

interface HallProps {
  hall: IHall;
  id: number;
}

export const Hall: FC<HallProps> = ({ hall, id }) => {
  const { title, time } = hall;

  return (
    <div className="movie-seances__hall">
      <h3 className="movie-seances__hall-title">{ title }</h3>
      <TimeSeans time={time} id={id} hallTitle={title}/>
    </div>
  )
}

export default Hall
