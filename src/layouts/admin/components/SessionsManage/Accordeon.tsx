import { FC, useEffect, useState } from "react";
import { useHallStore } from "../../../store/halls";
import { useSessions } from "../../../store/sessions";

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
};

interface ISessions {
  id: number;
  session_start: string;
  session_finish: string;
  film_id: number | null;
};

interface ISessionsData {
  session_date: string;
  session: ISessions[];
};

interface ISessionsHalls {
  hall_id: number;
  hall_title: string;
  sessions: ISessionsData[];
};

const Accordeon: FC = () => {
  const { halls, fetchDataHallSeats } = useHallStore();
  const { getSessionsHalls, getNewSession } = useSessions();

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

  const [addSession, setAddSession] = useState<ISession>({
    hall_id: null,
    hall_title: "",
    session_date: new Date().toISOString().split("T")[0],
    session_start: "",
    session_finish: "",
    film_id: null,
  });

  useEffect(() => {
    getNewSession(addSession);
  }, [addSession]);

  const [time, setTime] = useState<string>('');
  const [duration, setDuration] = useState<number | null>();

  useEffect(() => {
    if (time) {
      setAddSession((prev) => ({
        ...prev,
        session_start: time,
      }));
    }
  }, [time, duration]);

  function getDuration(start: string, duration: number | 0) {
    const startHour = parseInt(start.split(":")[0]);
    const startMinute = parseInt(start.split(":")[1]);
    const currentDuration = startHour * 60 + startMinute;
    const finishDuration = currentDuration + duration;

    const finishHour = Math.floor(finishDuration / 60);
    const finishMinute = finishDuration % 60;

    const formattedHour = finishHour < 10 ? `0${finishHour}` : `${finishHour}`;
    const formattedMinute =
      finishMinute < 10 ? `0${finishMinute}` : `${finishMinute}`;

    return `${formattedHour}:${formattedMinute}`;
  };

  useEffect(() => {
    if (duration && addSession.session_start !== "") {
/*       const finish = duration === 0 ? "" : getDuration(addSession.session_start, duration); */
      setAddSession((prev) => ({
        ...prev,
        session_finish: getDuration(addSession.session_start, duration),
      }));
    }
  }, [duration]);

  return (
    <div className="seansses-create-form">
      <select
        id="options"
        name="options"
        onChange={(e) => {
          const selectedHall = JSON.parse(e.target.value);
          setAddSession((prev) => ({ ...prev, ...selectedHall }));
          setHallTitle(selectedHall.hall_title);
        }}
      >
        <option 
          value={JSON.stringify({
            hall_id: 999999999,
            hall_title: "",
            session_finish: ""
          })}
        >Выберите зал...</option>
        {halls.map((hall, index) => (
          <option
            value={JSON.stringify({
              hall_id: hall.id,
              hall_title: hall.hall_title,
            })}
            key={hall.id || index}
          >
            {hall.hall_title}
          </option>
        ))}
      </select>

      <input
        placeholder="Дата выхода (дд.мм.гггг)..."
        onChange={(e) =>
          setAddSession((prev) => ({ ...prev, session_date: e.target.value }))
        }
        value={addSession.session_date}
        type="date"
        className="conf-step__input popup__input time-block"
      />
      <input
        placeholder="ВРЕМЯ"
        type="time"
        onChange={(ev) => {
          setTime(ev.target.value);
          if (duration) {
            setAddSession((prev) => ({
              ...prev,
              session_finish: getDuration(ev.target.value, duration),
            }))
          }
        }}
        className="conf-step__input popup__input time-block"
      />
      <input
        placeholder="Длительность, минут..."
        value={duration || ""}
        onChange={(e) => {
          const value = e.target.value;
          const numericValue = Number(value);

          if (value === "" || numericValue < 0 || isNaN(numericValue)) {
            setDuration(null);
            setAddSession((prev) => ({ ...prev, session_finish: "" }));
          } else {
            setDuration(numericValue);
          }
        }}
        maxLength={3}
        className="conf-step__input popup__input time-block"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
      />
    </div>
  );
};

export default Accordeon;
