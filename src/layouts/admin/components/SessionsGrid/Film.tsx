import { useFilmsStore } from "../../../store/films";
import { FC, useEffect, useState } from "react";
import { IMovieInfo } from "../../../models/IMovieDate";

// interface IMovieInfo {
//   id: number;
//   title: string;
//   poster_title: string;
//   image_url: string;
//   duration: number;
// }

const Film: FC<IMovieInfo> = ({
  duration,
  id,
  image_url,
  origin,
  poster_title,
  release_date,
  session_id,
  synopsis,
  title,
}) => {
  const { getFilmById, filmInfo, deleteFilm } = useFilmsStore();

  console.log(filmInfo);

  return (
    <>
      <div
        className="conf-step__movie"
        onClick={() => {
          if (id !== undefined) {
            getFilmById(id);
          }
        }}
      >
        <img
          className="conf-step__movie-poster"
          alt={poster_title}
          src={image_url}
        />
        <h3 className="conf-step__movie-title">{title}</h3>
        <p className="conf-step__movie-duration">{duration} минут</p>
      </div>
    </>
  );
};

export default Film;
