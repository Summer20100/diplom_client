import { FC } from 'react'
import { IMovieDate, IHall, IMovie } from '../../../../models/IMovieDate'

type CardProps = {
  movie: IMovie;
};

import Hall from './Hall';

export const Card: FC<CardProps> = ({ movie }) => {

  if (!movie) {
    return <div>Loading...</div>;
  }

  const { id, poster_title, title, image, synopsis, duration, origin, hall } = movie
  console.log(id)
  const hallList = hall.map((el: IHall) =>
    <Hall key={new Date().getTime()} hall={el} id={id}/>
  )

  return (
    <section className="movie">
      <div className="movie__info">
        <div className="movie__poster">
          <img className="movie__poster-image" alt={poster_title} src={image} />
        </div>
        <div className="movie__description">
          <h2 className="movie__title">{title}</h2>
          <p className="movie__synopsis">{synopsis}</p>
          <p className="movie__data">
            <span className="movie__data-duration">{duration} минут</span>
            <span className="movie__data-origin"> {origin} </span>
          </p>
        </div>
      </div>
      {hallList}
    </section>
  )
}

export default Card