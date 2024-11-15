import { FC, useEffect, useState } from "react";
import Card from "./components/Card";
import Nav from "./components/Nav";
import { IMovieDate, IMovie } from '../../../models/IMovieDate';
import { useSessions } from "../../../store/sessions";
import { useFilmsStore } from '../../../store/films';

interface ISession {
  id?: number | null;
  hall_id: number | null;
  hall_title: string;
  session_date: string;
  session_start: string;
  session_finish: string;
  film_id: number | null;
};

export const Films: FC = () => {
  const { getFilms, films, getFilmById } = useFilmsStore();
  const { getSessions, sessions, getSessionsByDate, sessionsByDate } = useSessions();
  const [newDate, setNewDate] = useState<string | null>(null);
  const [filmSessions, setFilmSessions] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [isFirstRange, setIsFirstRange] = useState<boolean>(true);
  const [isLastRange, setIsLastRange] = useState<boolean>(false);
  
  const initialStartDay = new Date();
  initialStartDay.setDate(initialStartDay.getDate() - 1);
  
  const initialFinishDay = new Date(initialStartDay);
  initialFinishDay.setDate(initialStartDay.getDate() + 7);

  const [startDay, setStartDay] = useState<Date>(initialStartDay);
  const [finishDay, setFinishDay] = useState<Date>(initialFinishDay);

  useEffect(() => {
    getSessions();
    getFilms();
    getSessionsByDate();
  }, [getFilms, getSessionsByDate, getSessions]);

  useEffect(() => {
    if (newDate) {
      const filteredSessions = sessionsByDate?.filter(itm => itm.session_date === newDate)[0]?.films || [];
      setFilmSessions(filteredSessions);
    }
  }, [newDate, sessionsByDate]);

  const getDate = (date: string | null, index: number) => {
    setNewDate(date);
    setSelectedIndex(index);
  };

  const filmInfo = (id: number) => {
    const film = films.find(itm => itm.id === id);
    return film?.for_registration || false;
  };

  const filteredSessions = sessionsByDate
    ? sessionsByDate.filter((itm) => {
        const sessionDate = new Date(itm.session_date);
        return sessionDate >= startDay && sessionDate <= finishDay; 
      })
    : [];

    const nextPeriod = () => {
      const newStartDay = new Date(finishDay);
      newStartDay.setDate(newStartDay.getDate());
      const newFinishDay = new Date(newStartDay);
      newFinishDay.setDate(newStartDay.getDate() + 7);
      
      setStartDay(newStartDay);
      setFinishDay(newFinishDay);
      setIsFirstRange(false);
      setSelectedIndex(0);
    
      const lastSessionDate = sessionsByDate && sessionsByDate.length > 0 
        ? new Date(sessionsByDate[sessionsByDate.length - 1]?.session_date)
        : null;
    
      if (lastSessionDate) {
        setIsLastRange(newFinishDay >= lastSessionDate);
      }
    };
    
    const previousPeriod = () => {
      const newFinishDay = new Date(startDay);
      newFinishDay.setDate(newFinishDay.getDate());
      const newStartDay = new Date(newFinishDay);
      newStartDay.setDate(newFinishDay.getDate() - 7);
      setStartDay(newStartDay);
      setFinishDay(newFinishDay);
      setIsFirstRange(newStartDay <= initialStartDay);
      setIsLastRange(false);
      setSelectedIndex(0);
    };

  return (
    <>
      <nav className="page-nav">
        {!isFirstRange && (
          <a className="page-nav__day page-nav__day_previous" onClick={previousPeriod}></a>
        )}
        {filteredSessions.map((itm, ind) => (
        <Nav 
          key={ind} 
          date={itm.session_date} 
          getDate={(date: string | null) => getDate(date, ind)}
          ind={ind}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          className={selectedIndex === ind ? "page-nav__day_chosen" : ""}
        />
        ))}

        {!isLastRange && (
          <a className="page-nav__day page-nav__day_next" onClick={nextPeriod}></a>
        )}

      </nav>

      <main>
        { filmSessions &&
          filmSessions.map((itm, ind) =>
            itm.film_id !== null && filmInfo(itm.film_id) &&
            <Card key={itm.film_id} film_id={itm.film_id} halls={itm.halls} />
        )}
      </main>
    </>
  );
};

export default Films;
