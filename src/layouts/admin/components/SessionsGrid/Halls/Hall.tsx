import { FC, useEffect, useState } from "react";
import { useSessions } from "../../../../store/sessions";
import { useFilmsStore } from "../../../../store/films";

interface IHall {
  date: string;
  title: string;
  hall_id: number;
}

const Hall: FC<IHall> = ({ date, title, hall_id }) => {
  const { sessions } = useSessions();
  const { films, getFilmById, filmInfo } = useFilmsStore();

  function formattedDate(date: string) {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("ru-RU");
  }

  const filteredSessions = sessions.filter(
    (session) =>
      session.hall_id === hall_id &&
      formattedDate(session.session_date) === date,
  );

  function duration(start: string, finish: string) {
    const startHour = parseInt(start.split(":")[0]);
    const startMinute = parseInt(start.split(":")[1]);
    const currentDuration = startHour * 60 + startMinute;

    const finishHour = parseInt(finish.split(":")[0]);
    const finishMinute = parseInt(finish.split(":")[1]);
    const finishDuration = finishHour * 60 + finishMinute;
    return finishDuration - currentDuration;
  }

  function durationWidthPx(start: string, finish: string) {
    return duration(start, finish) * ((1440 * 0.5) / 24 / 60);
  }

  function leftPx(start: string) {
    const startHour = parseInt(start.split(":")[0]);
    const startMinute = parseInt(start.split(":")[1]);
    const currentDuration = startHour * 60 + startMinute;
    return currentDuration * ((1440 * 0.5) / 24 / 60);
  }

  return (
    <div className="conf-step__seances-hall">
      <h3 className="conf-step__seances-title">{title}</h3>
      <div className="conf-step__seances-timeline">
        {filteredSessions.map((session) => (
          <div
            className="conf-step__seances-movie"
            style={{
              width: durationWidthPx(session.session_start, session.session_finish),
              backgroundColor: films.find(film => film.id === session.film_id)?.title 
                ? "rgb(133, 255, 137)" 
                : "red",
              left: leftPx(session.session_start)
            }}
            
            title={films.find(film => film.id === session.film_id)?.title ?? 'Фильм не назначен'}
            key={session.id}
          >
            <p className="conf-step__seances-movie-title">
            {
              films.find(film => film.id === session.film_id)?.title 
              ? films.find(film => film.id === session.film_id)?.title 
              : <div>Фильм не назначен</div>
            }
            </p>
            <p className="conf-step__seances-movie-start">
              {session.session_start.slice(0, 5)}
            </p>
          </div>
        ))}

        {/* <div
          className="conf-step__seances-movie"
          style={{
            width: 60,
            backgroundColor: "rgb(133, 255, 137)",
            left: 0,
          }}
        >
          <p className="conf-step__seances-movie-title">Миссия выполнима</p>
          <p className="conf-step__seances-movie-start">00:00</p>
        </div>
        <div
          className="conf-step__seances-movie"
          style={{
            width: 60,
            backgroundColor: "rgb(133, 255, 137)",
            left: 360,
          }}
        >
          <p className="conf-step__seances-movie-title">Миссия выполнима</p>
          <p className="conf-step__seances-movie-start">12:00</p>
        </div>
        <div
          className="conf-step__seances-movie"
          style={{
            width: 65,
            backgroundColor: "rgb(202, 255, 133)",
            left: 420,
          }}
        >
          <p className="conf-step__seances-movie-title">
            Звёздные войны XXIII: Атака клонированных клонов
          </p>
          <p className="conf-step__seances-movie-start">14:00</p>
        </div> */}
      </div>
    </div>
  );
};

export default Hall;
