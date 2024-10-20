import { useFilmsStore } from "../../../store/films";
import { FC, useEffect, useState } from "react";
import { IMovieInfo } from "../../../models/IMovieDate";
import { usePopup } from "../../../store/popup";
import { useSessions } from "../../../store/sessions";
import Hall from "./Halls/Hall";

interface GridedSessionsProps {
  date: string;
}

const GridedSessions: FC<GridedSessionsProps> = ({ date }) => {
  const {
    getSessionsHalls,
    deleteSessionById,
    sessionsHalls,
    addSession,
    newSession,
    sessions,
    getSessions,
  } = useSessions();

  function formattedDate(date: string) {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("ru-RU");
  }

  const uniqueSessions = Array.from(
    new Map(sessions
      .filter((session) => formattedDate(session.session_date) === date)
      .map((session) => [session.hall_id, session]))
    .values()
  );

  return (
      <div className="conf-step__seances">
        {
          uniqueSessions.length > 0 ? (
            uniqueSessions.map((session) => 
              <Hall 
                key={session.hall_id} 
                title={session.hall_title} 
                hall_id={session.hall_id || 0 }
                date={date}
              />
            )
          ) : (
            <></>
          )
        }
      </div>
  );
};

export default GridedSessions;
