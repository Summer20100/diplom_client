import { FC, useEffect } from "react";
import Header from "../Header";
import Accordeon from "./Accordeon";
import { useSessions } from "../../../store/sessions";

const SessionsManage: FC = () => {
  const {
    getSessionsHalls,
    deleteSessionById,
    sessionsHalls,
    addSession,
    newSession,
  } = useSessions();

  function formattedDate(date: string) {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("ru-RU");
  }

  function duration(start: string, finish: string) {
    const startHour = parseInt(start.split(":")[0]);
    const startMinute = parseInt(start.split(":")[1]);
    const currentDuration = startHour * 60 + startMinute;

    const finishHour = parseInt(finish.split(":")[0]);
    const finishMinute = parseInt(finish.split(":")[1]);
    const finishDuration = finishHour * 60 + finishMinute;
    return finishDuration - currentDuration;
  }

  useEffect(() => {
    getSessionsHalls();
  }, [sessionsHalls]);

  return (
    <section className="conf-step">
      <Header title={true} h2="Сетка сеансов" />
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph" style={{ fontSize: "2.0rem" }}>
          Управление сеансами:
        </p>
        <Accordeon />

        <fieldset
          className="conf-step__buttons"
          style={{ marginBottom: "20px" }}
        >
          <input
            type="submit"
            value="Сохранить"
            className="conf-step__button conf-step__button-accent"
            onClick={() => addSession(newSession)}
          />
        </fieldset>

        <div className="full-width-line__dotted"></div>

        <p className="conf-step__paragraph">Список сеансов:</p>

        {sessionsHalls &&
          sessionsHalls.map((sessionsHall) => (
            <>
              <div className="sessions__list" key={sessionsHall.hall_id}>
                {sessionsHall.hall_title}
                <div className="full-width-line"></div>
                {sessionsHall.sessions.map((session, ind) => (
                  <div className="session__list" key={ind}>
                    {formattedDate(session.session_date)}
                    <div className="session-time__list">
                      {session.session &&
                        session.session.map((itm) => (
                          <div className="session-time__itm" key={itm.id}>
                            {itm.session_start.slice(0, 5)},
                            {duration(itm.session_start, itm.session_finish)}{" "}
                            мин.
                            <button
                              onClick={() => deleteSessionById(itm.id ?? 0)}
                              className="conf-step__button conf-step__button-trash"
                            ></button>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ))}
      </div>
    </section>
  );
};
export default SessionsManage;
