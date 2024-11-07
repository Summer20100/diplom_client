import { FC, useEffect, useState } from "react";
import Header from "../Header";
import ManageFilmSessions from "./ManageFilmSessions";
import GridedSessions from "./GridedSessions";
import FilmRegistration from "./FilmRegistration";
import { usePopup } from "../../../store/popup";
import { useFilmsStore } from "../../../store/films";
import { useSessions } from "../../../store/sessions";
import Film from "./Film";

const SessionsGrid: FC = () => {
  const { getFilms, films, filmInfo } = useFilmsStore();
  const { popupConfigOpen } = usePopup();

  const {
    getSessionsHalls,
    deleteSessionById,
    sessionsHalls,
    addSession,
    newSession,
    sessions,
    getSessions,
    sessionForUpdate,
    updateSession,
  } = useSessions();

  const openPopup = () => {
    popupConfigOpen("popupSessionsAddFilm");
  };

  useEffect(() => {
    getFilms();
  }, [getFilms]);

  useEffect(() => {
    getSessions();
  }, []);

  function formattedDate(date: string) {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("ru-RU");
  };

  const [deteGrid, setDeteGrid] = useState<string>('');

  return (
    <section className="conf-step">
      <Header title={true} h2="Управление фильмами" />
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">
          <button
            className="conf-step__button conf-step__button-accent"
            onClick={openPopup}
          >
            Добавить фильм
          </button>
        </p>

        <p className="conf-step__paragraph">Список фильмов:</p>

        <div className="conf-step__movies">
          {films && films.map((film) => <Film key={film.id} {...film} />)}
        </div>

        <p className="conf-step__paragraph">Назначение фильма на сеанс:</p>
        <ManageFilmSessions />

        <p className="conf-step__paragraph">
          <button
            className="conf-step__button conf-step__button-accent"
            onClick={() => updateSession(sessionForUpdate)}
          >
            Назначить фильм на сеанс
          </button>
        </p>

        <p className="conf-step__paragraph">Сетка сеансов:</p>

        <select
          id="options"
          name="options"
          onChange={(e) => setDeteGrid(e.target.value)}
        >
          <option value="0">Выберите дату...</option>
          {sessions &&
            [
              ...new Map(
                sessions.map((session) => [session.session_date, session]),
              ).values(),
            ].map((session, index) => {
              return (
                <option
                  value={formattedDate(session.session_date)}
                  key={session.id || index}
                >
                  {formattedDate(session.session_date)}
                </option>
              )
          })}
        </select>

        <GridedSessions date={ deteGrid }/>
        {/* <FilmRegistration /> */}

{/*         <fieldset className="conf-step__buttons text-center">
          <FilmRegistration />
          <button className="conf-step__button conf-step__button-regular">Отмена</button>
          <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" />
        </fieldset> */}
      </div>
    </section>
  );
};
export default SessionsGrid;
