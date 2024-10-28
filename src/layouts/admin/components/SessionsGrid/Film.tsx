import { useFilmsStore } from "../../../store/films";
import { FC, useEffect, useState } from "react";
import { IMovieInfo } from "../../../models/IMovieDate";
import { usePopup } from "../../../store/popup";

const Film: FC<IMovieInfo> = ({
  duration,
  id,
  image_url,
  origin,
  poster_title,
  release_date,
  for_registration,
  synopsis,
  title,
}) => {
  const { getFilmById, getFilms, films, filmInfo } = useFilmsStore();
  const { popupConfigOpen } = usePopup();

  const openPopup = () => {
    popupConfigOpen('popupSessionsCorrectFilm');
  };

  return (
    <>
      <div
        className="conf-step__movie"
        onClick={() => {
          if (id !== undefined) {
            getFilmById(id);
            openPopup();
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
