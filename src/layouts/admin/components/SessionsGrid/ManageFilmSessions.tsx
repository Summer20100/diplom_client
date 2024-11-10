import { FC, useEffect, useState } from "react";
import { useHallStore } from "../../../store/halls";
import { useSessions } from "../../../store/sessions";
import { useFilmsStore } from "../../../store/films";

interface IAccordeon {
  title: string;
}

interface ISession {
  id?: number | null;
  hall_id: number | null;
  hall_title: string;
  session_date: string;
  session_start: string;
  session_finish: string;
  film_id: number | null;
}

interface ISessions {
  id: number;
  session_start: string;
  session_finish: string;
  film_id: number | null;
}

interface ISessionsData {
  session_date: string;
  session: ISessions[];
}

interface ISessionsHalls {
  hall_id: number;
  hall_title: string;
  sessions: ISessionsData[];
}

const ManageFilmSessions: FC = () => {
  const { sessions, getSessionById, sessionById, getSessionForUpdate } = useSessions();
  const { films } = useFilmsStore();

  function formattedDate(date: string) {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("ru-RU");
  };

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedFilm, setSelectedFilm] = useState<number | null>();

  const uniqueSessions = Array.from(
    new Map(sessions
      .filter((session) => formattedDate(session.session_date) === selectedDate)
      .map((session) => [session.hall_id, session]))
    .values()
  );

  const [selectedHall, setSelectedHall] = useState<number | null>();

  const filteredSessions = sessions.filter(
    (session) =>
      session.hall_id === selectedHall &&
      formattedDate(session.session_date) === selectedDate,
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

  const [selectedSession, setSelectedSession] = useState<string>('');
  
  useEffect(() => {
    if (selectedSession) {
      getSessionById(Number(selectedSession));
    }
  }, [selectedSession]);

  const newDate = (date: string) => {
    const ttt = new Date(date);
    ttt.setUTCDate(ttt.getUTCDate() + 1);

    const day = String(ttt.getUTCDate()).padStart(2, '0');
    const month  = String(ttt.getUTCMonth() + 1).padStart(2, '0');
    const year = ttt.getUTCFullYear();

    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  };

  useEffect(() => {
    if (sessionById) {
      const { film_id, ...sessionWithoutFilmId } = sessionById;
      setSessionForUpdate((prev) => ({ 
        ...prev, 
        ...sessionWithoutFilmId,
        session_date: newDate(sessionById.session_date)
      }));
    }
  }, [sessionById]);


  const [sessionForUpdate, setSessionForUpdate] = useState<ISession>({
    id: null,
    hall_id: null,
    hall_title: '',
    session_date: '',
    session_start: '',
    session_finish: '',
    film_id: null,
  });

  // console.log(sessionForUpdate)

  useEffect(() => {
    if (sessionForUpdate) {
      getSessionForUpdate(sessionForUpdate)
    }
  }, [sessionForUpdate]);

  // console.log(sessionForUpdate)

  return (
    <div className="seansses-create-form">
      <select
        id="options"
        name="options"
        onChange={(e) => setSessionForUpdate((prev) => ({ ...prev, film_id: Number(e.target.value) }))}
      >
        <option value="null">Выберите фильм...</option>
        {films && 
        films.map((film, index) => (
          <option
            value={film.id ?? index}
            key={film.id || null}
          >
            {film.poster_title}
          </option>
        ))}
      </select>

      <select
          id="options"
          name="options"
          onChange={(e) => setSelectedDate(e.target.value)}
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

      <select
        id="options"
        name="options"
        onChange={(e) => setSelectedHall(Number(e.target.value))}
      >
        <option value="0">Выберите зал...</option>
        {sessions &&
          uniqueSessions.map((session, index) => (
            <option
              value={session.hall_id || index}
              key={session.id || index}
            >
              {session.hall_title}
            </option>
          ))}
      </select>

      <select
        id="options"
        name="options"
        onChange={(e) => setSelectedSession(e.target.value)}
      >
        <option value="0">Выберите сеанс...</option>
        {filteredSessions &&
          filteredSessions.map((session, index) => (
              <option
                value={session.id || index}
                key={session.id || index}
              >
                {session.session_start.slice(0, 5)}, {duration(session.session_start, session.session_finish)} мин.
              </option>
            )
          )
        }
      </select>

    </div>
  );
};

export default ManageFilmSessions;
