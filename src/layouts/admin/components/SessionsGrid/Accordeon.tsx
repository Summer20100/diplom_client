import { FC, useEffect, useState } from "react";
import { useHallStore } from "../../../store/halls";
import { useSessions } from "../../../store/sessions";

interface IAccordeon {
  title: string;
}

interface ISession {
  id: number;
  hall_id: number;
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

const Accordeon: FC<IAccordeon> = ({ title }) => {
  const { halls, fetchDataHallSeats } = useHallStore();
  const {
    getSessionByIdHall,
    getSessions,
    getSessionsHalls,
    sessions,
    sessionByIdHall,
    sessionsHalls,
  } = useSessions();

  const [hallTitle, setHallTitle] = useState<string>("");
  const [sessionHall, setSessionHall] = useState<ISession[]>([]);

  useEffect(() => {
    fetchDataHallSeats();
  }, [fetchDataHallSeats]);

  useEffect(() => {
    getSessionsHalls();
  }, [getSessionsHalls]);

  function formatSessionDateToDDMMYYYY(dateString: string) {
    const date = new Date(dateString);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  function filteredSessions(sessions: ISessionsHalls[], hall_id: number) {
    const filteredSessions = sessions.filter(
      (session) => session.hall_id === hall_id,
    );
    return filteredSessions[0].sessions;
  }

  function filteredSession(sessions: ISessionsData[], selectedDate: string) {
    const filteredSessions = sessions.filter(
      (session) => session.session_date === selectedDate,
    );
    return filteredSessions[0].session;
  }

  const [filterSessions, setFilterSessions] = useState<ISessionsData[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [filterSession, setFilterSession] = useState<ISessions[]>([]);

  useEffect(() => {
    hallTitle &&
      setFilterSessions(filteredSessions(sessionsHalls, Number(hallTitle)));
  }, [hallTitle, filteredSessions]);

  useEffect(() => {
    selectedDate &&
      setFilterSession(filteredSession(filterSessions, selectedDate));
  }, [selectedDate]);

  // console.log(filterSession)
  // console.log(filteredSession(filterSessions, selectedDate))

  return (
    <>
      <select
        id="options"
        name="options"
        value={hallTitle}
        onChange={(e) => setHallTitle(e.target.value)}
      >
        <option value="">Выберите зал...</option>
        {sessionsHalls.map((sessionsHall) => (
          <option value={sessionsHall.hall_id} key={sessionsHall.hall_id}>
            {sessionsHall.hall_title}
          </option>
        ))}
      </select>

      <select
        id="options"
        name="options"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      >
        <option value="">Выберите дату...</option>
        {filterSessions.map((session, ind) => (
          <option value={session.session_date} key={ind}>
            {formatSessionDateToDDMMYYYY(session.session_date)}
          </option>
        ))}
      </select>

      <select
        id="options"
        name="options"
        value={hallTitle}
        onChange={(e) => setHallTitle(e.target.value)}
      >
        <option value="">Выберите свободный период...</option>
        {filterSession.map((session) => (
          <option value={session.session_start} key={session.id}>
            {session.session_start} ...... {session.session_finish}
          </option>
        ))}
      </select>

      
    </>
  );
};

export default Accordeon;
