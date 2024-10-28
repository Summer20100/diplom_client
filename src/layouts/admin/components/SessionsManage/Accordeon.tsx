import { FC, useEffect, useState } from "react";
import { useHallStore } from "../../../store/halls";
import { useSessions } from "../../../store/sessions";

interface IAccordeon {
  title: string;
}

interface ISession {
  id?: number | null;
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
    hall_id: 0,
    hall_title: "",
    session_date: "",
    session_start: "",
    session_finish: "",
    film_id: null,
  });

  useEffect(() => {
    getNewSession(addSession);
  }, [addSession]);

  const [time, setTime] = useState<string>('');

  useEffect(() => {
    if (time) {
      setAddSession((prev) => ({
        ...prev,
        session_start: time,
      }));
    }
  }, [time]);

  const [duration, setDuration] = useState<number | null>();

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

    return `${formattedHour}:${formattedMinute}:00`;
  }

  console.log(addSession)

  useEffect(() => {
    if (duration && addSession.session_start !== "") {
      setAddSession((prev) => ({
        ...prev,
        session_finish: getDuration(prev.session_start, duration),
      }));
    }
  }, [duration]);

  return (
    <div className="seansses-create-form">
      <select
        id="options"
        name="options"
        onChange={(e) => {
          if (e.target.value === "0") {
            setHallTitle("");
          }
          const selectedHall = JSON.parse(e.target.value);
          setAddSession((prev) => ({ ...prev, ...selectedHall }));
          setHallTitle(selectedHall.hall_title);
        }}
      >
        <option value="0">Выберите зал...</option>
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
        onChange={(ev) => setTime(ev.target.value)}
        className="conf-step__input popup__input time-block"
      />
      <input
        placeholder="Длительнось, минут..."
        value={duration || ""}
        onChange={(e) => {
          const value = e.target.value;
          setDuration(value === "" ? 0 : Math.min(Number(value), 999));
        }}
        maxLength={3}
        className="conf-step__input popup__input time-block"
        type="number"
        min="1"
        max="999"
      />
    </div>
  );
};

export default Accordeon;
