import { FC, useEffect, useState } from "react";
import Card from "./components/Card";
import Nav from "./components/Nav";
import { IMovieDate, IMovie } from '../../../models/IMovieDate'
import { useSessions } from "../../../store/sessions";


import { useFilmsStore } from '../../../store/films';
import Login from "../../../admin/Login";

interface ISession {
  id?: number | null;
  hall_id: number | null;
  hall_title: string;
  session_date: string;
  session_start: string;
  session_finish: string;
  film_id: number | null;
};

export const Films = () => {
  const { getFilms, films, getFilmById } = useFilmsStore();
  const { getSessions, sessions, getSessionsByDate, sessionsByDate } = useSessions();
  const [newDate, setNewDate] = useState<string | null>(null);

  useEffect(() => {
    getSessions();
    getFilms();
    getSessionsByDate();
  }, [getFilms, getSessionsByDate, getSessions]);

/*   if (data.length === 0) {
    return <div>Loading...</div>;
  } */
   
  const getDate = (date: string | null) => {
    setNewDate(date);
  }

  const filmSessions = newDate ? sessionsByDate?.filter(itm => itm.session_date === newDate)[0].films : [];

  const filmInfo = (id: Number) => {
    const film = films.filter(itm => itm.id === id)
    if (film[0].for_registration) {
      return true
    } else {
      return false
    }
  }

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <nav className="page-nav">
        {sessionsByDate && 
          sessionsByDate.map((itm, ind) => (
            <Nav 
              key={ind} 
              date={itm.session_date} 
              getDate={getDate} 
              ind={ind}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          ))
        }
        <a className="page-nav__day page-nav__day_next" ></a>
      </nav>

      <main>
        { filmSessions && 
          filmSessions.map((itm, ind) =>
            itm.film_id !== null  && filmInfo(itm.film_id) &&
            <Card key={itm.film_id} film_id={itm.film_id} halls={itm.halls}/>
        )}
      </main>
    </>
  );
}

export default Films