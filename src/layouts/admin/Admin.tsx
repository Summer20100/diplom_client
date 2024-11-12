import conf from "../configurations/conf";
import HallManage from "./components/HallManage/HallManage";
import HallConfig from "./components/HallConfig/HallConfig";
import PriceConfig from "./components/PriceConfig/PriceConfig";
import SessionsManage from "./components/SessionsManage/SessionsManage";
import SessionsGrid from "./components/SessionsGrid/SessionsGrid";
import OpenSales from "./components/OpenSales";
import HallSeatType from "./components/HallConfig/HallSeatType";
import Header from "./components/Header";
import { usePopup } from "../store/popup";
import { useHallStore } from "../store/halls";
import { useSeatType } from "../store/seats";
import { useFilmsStore } from "../store/films";
import { useHallSeats } from "../store/hallsSeats";
import { useSessions } from "../store/sessions";
import { useState, useEffect, FC } from "react";
import { IMovieInfo } from "../models/IMovieDate";
import { useUser } from "../store/users";
import Popup from "./components/Popup";

import "./CSS/normalize.css";
import "./CSS/styles.css";

interface ISeatInfo {
  id_seat: number;
  hall_id: number;
  chair_type: string;
};

export function Admin() {
  const { documentTitle, accordeon } = conf;
  const { getHallChairsById } = useHallSeats();
  const { seats: seatType } = useSeatType();
  const { createHall } = useHallStore();
  const { updateHallSeat, hallsSeat, message, popupConfigClose, namePopup } =
    usePopup();
  const { createFilm, filmInfo: filmById, deleteFilm, updateFilm } = useFilmsStore();
  const {
    getSessions,
    getSessionById,
    getSessionByIdHall,
    sessions,
    sessionById,
    sessionByIdHall,
  } = useSessions();



  const [input, setInput] = useState<string>("");
  const [seatInfo, setSeatInfo] = useState<ISeatInfo | undefined>(undefined);

  const [filmInfo, setFilmInfo] = useState<IMovieInfo>({
    title: "",
    origin: "",
    release_date: null,
    poster_title: "",
    synopsis: "",
    image_url: "",
    duration: null,
    for_registration: false,
  });

  useEffect(() => {
    if (namePopup === "popupSessionsCorrectFilm" && filmById) {
      setFilmInfo({
        id: filmById.id,
        title: filmById.title,
        origin: filmById.origin,
        release_date: filmById.release_date,
        poster_title: filmById.poster_title,
        synopsis: filmById.synopsis,
        image_url: filmById.image_url,
        duration: filmById.duration,
        for_registration: filmById.for_registration,
      });
    }
    if (namePopup === "popupSessionsAddFilm") {
      setFilmInfo({
        title: "",
        origin: "",
        release_date: null,
        poster_title: "",
        synopsis: "",
        image_url: "",
        duration: null,
        for_registration: false,
      });
    }
  }, [filmById, namePopup]);

  const [selectedType, setSelectedType] = useState<string>("standart");

  useEffect(() => {
    documentTitle("ИдёмВКино");
    accordeon("conf-step__header");
  }, []);

  useEffect(() => {
    getHallChairsById(seatInfo?.hall_id ?? 0);
  }, [message, seatInfo]);

  const addHall = (hall_title: any, ev: any) => {
    createHall(hall_title);
    ev.preventDefault();
    popupConfigClose();
    setInput("");
  };
  

  const addFilm = (film: IMovieInfo, ev: any) => {
    createFilm(film);
    ev.preventDefault();
    popupConfigClose();
    setFilmInfo({
      title: "",
      origin: "",
      release_date: null,
      poster_title: "",
      synopsis: "",
      image_url: "",
      duration: null,
      for_registration: false,
    });
  };

  const correctFilm = (film: IMovieInfo, ev: any) => {
    console.log(film);
  };

  const inf = (chair_type: string) => {
    if (hallsSeat) {
      setSeatInfo({
        id_seat: hallsSeat.id_seat,
        hall_id: hallsSeat.hall_id,
        chair_type,
      });
    }
  };

  const handleChairType = (type: string) => {
    setSelectedType(type);
  };

  return (
    <body className="admin">
      {namePopup === "popupHallManage" && (
        <Popup title="СОЗДАТЬ НОВЫЙ ЗАЛ" posterImage="poster-image.jpg">
          <p className="conf-step__paragraph">Введите название нового зала:</p>
          <div className="popup__input-block">
            <input
              placeholder="Название зала..."
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              className="conf-step__input popup__input"
            />
            <button
              onClick={(ev: any) => {
                addHall({ hall_title: input }, ev);
              }}
              className="conf-step__button conf-step__button-accent popup__btn"
            >
              Создать зал
            </button>
          </div>
        </Popup>
      )}

      {namePopup === "popupHallConfig" && (
        <Popup title="ТИПЫ КРЕСЕЛ" posterImage="poster-image.jpg">
          <p className="conf-step__paragraph">Выберите тип кресла:</p>

          <div className="conf-step__legend conf-step__legend-popup">
            {seatType &&
              seatType.map((seat) => (
                <HallSeatType
                  key={seat.id}
                  type={seat.type}
                  chairType={() => (inf(seat.type), handleChairType)}
                  checkIsActive={true}
                />
              ))}
          </div>

          <button
            onClick={(ev) => {
              ev.preventDefault();
              if (seatInfo !== undefined) {
                updateHallSeat(seatInfo);
                getHallChairsById(seatInfo.hall_id);
                popupConfigClose();
              }
            }}
            className="conf-step__button conf-step__button-accent popup__btn"
          >
            Выбрать
          </button>
        </Popup>
      )}

      {namePopup === "popupSessionsAddFilm" && (
        <Popup title="СОЗДАТЬ НОВЫЙ ФИЛЬМ" posterImage="poster-image.jpg">
          <div className="label-margin">
            <label>
              <p className="conf-step__paragraph">Введите название фильма:</p>
              <div className="popup__input-block">
                <input
                  placeholder="Название фильма..."
                  onChange={(e) =>
                    setFilmInfo((prev: IMovieInfo) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  value={filmInfo.title}
                  type="text"
                  className="conf-step__input popup__input"
                />
              </div>
            </label>
          </div>
          <div className="label-margin">
            <label>
              <p className="conf-step__paragraph">
                Введите название постера к фильму:
              </p>
              <div className="popup__input-block">
                <input
                  placeholder="Постер к фильму..."
                  onChange={(e) =>
                    setFilmInfo((prev: IMovieInfo) => ({
                      ...prev,
                      poster_title: e.target.value,
                    }))
                  }
                  value={filmInfo.poster_title}
                  type="text"
                  className="conf-step__input popup__input"
                />
              </div>
            </label>
          </div>
          <div className="label-margin">
            <label>
              <p className="conf-step__paragraph">Введите URL постера:</p>
              <div className="popup__input-block">
                <input
                  placeholder="URL постера..."
                  onChange={(e) =>
                    setFilmInfo((prev: IMovieInfo) => ({
                      ...prev,
                      image_url: e.target.value,
                    }))
                  }
                  value={filmInfo.image_url}
                  type="text"
                  className="conf-step__input popup__input"
                />
              </div>
            </label>
          </div>
          <div className="label-margin">
            <label>
              <p className="conf-step__paragraph">Введите описание фильма:</p>
              <div className="popup__input-block">
                <input
                  placeholder="Описание фильма..."
                  onChange={(e) =>
                    setFilmInfo((prev: IMovieInfo) => ({
                      ...prev,
                      synopsis: e.target.value,
                    }))
                  }
                  value={filmInfo.synopsis}
                  type="text"
                  className="conf-step__input popup__input"
                />
              </div>
            </label>
          </div>

          <div className="label-margin">
            <label>
              <p className="conf-step__paragraph">Введите страну создания:</p>
              <div className="popup__input-block">
                <input
                  placeholder="Страна создания..."
                  onChange={(e) =>
                    setFilmInfo((prev: IMovieInfo) => ({
                      ...prev,
                      origin: e.target.value,
                    }))
                  }
                  value={filmInfo.origin}
                  type="text"
                  className="conf-step__input popup__input"
                />
              </div>
            </label>
          </div>
          <div className="label-margin">
            <label>
              <p className="conf-step__paragraph">Введите год создания:</p>
              <div className="popup__input-block">
                <input
                  placeholder="Год выхода (гггг)..."
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setFilmInfo((prev: IMovieInfo) => ({
                        ...prev,
                        release_date: null,
                      }));
                    } else if (value.length <= 4) {
                      const numberValue = Number(value);
                      setFilmInfo((prev: IMovieInfo) => ({
                        ...prev,
                        release_date: numberValue,
                      }));
                    }
                  }}
                  value={
                    filmInfo.release_date !== null ? filmInfo.release_date : ""
                  }
                  type="number"
                  className="conf-step__input popup__input"
                />
              </div>
            </label>
          </div>

          <div className="label-margin">
            <label>
              <p className="conf-step__paragraph">
                Введите длительность фильма:
              </p>
              <div className="popup__input-block">
                <input
                  placeholder="Длительность фильма, минут..."
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setFilmInfo((prev: IMovieInfo) => ({
                        ...prev,
                        duration: null,
                      }));
                    } else if (value.length <= 3) {
                      setFilmInfo((prev: IMovieInfo) => ({
                        ...prev,
                        duration: Number(e.target.value),
                      }));
                    }
                  }}
                  value={filmInfo.duration !== null ? filmInfo.duration : ""}
                  type="number"
                  className="conf-step__input popup__input"
                />
              </div>
            </label>
          </div>
          <button
            onClick={(ev: any) => {
              addFilm(filmInfo, ev);
            }}
            className="conf-step__button conf-step__button-accent popup__btn"
          >
            Добавить фильм
          </button>
        </Popup>
      )}

      {namePopup === "popupSessionsCorrectFilm" && (
        <Popup title="ОТКОРРЕКТИРОВАТЬ ФИЛЬМ" posterImage="poster-image.jpg">
          <div className="label-margin">
            <label>
              <p className="conf-step__paragraph">Введите название фильма:</p>
              <div className="popup__input-block">
                <input
                  placeholder="Страна создания..."
                  onChange={(e) =>
                    setFilmInfo((prev: IMovieInfo) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  value={filmInfo.title}
                  type="text"
                  className="conf-step__input popup__input"
                />
              </div>
            </label>
          </div>
          <div className="label-margin">
            <label>
              <p className="conf-step__paragraph">
                Введите название постера к фильму:
              </p>
              <div className="popup__input-block">
                <input
                  placeholder="Страна создания..."
                  onChange={(e) =>
                    setFilmInfo((prev: IMovieInfo) => ({
                      ...prev,
                      poster_title: e.target.value,
                    }))
                  }
                  value={filmInfo.poster_title}
                  type="text"
                  className="conf-step__input popup__input"
                />
              </div>
            </label>
          </div>
          <div className="label-margin">
            <label>
              <p className="conf-step__paragraph">Введите URL постера:</p>
              <div className="popup__input-block">
                <input
                  placeholder="URL постера..."
                  onChange={(e) =>
                    setFilmInfo((prev: IMovieInfo) => ({
                      ...prev,
                      image_url: e.target.value,
                    }))
                  }
                  value={filmInfo.image_url}
                  type="text"
                  className="conf-step__input popup__input"
                />
              </div>
            </label>
          </div>
          <div className="label-margin">
            <label>
              <p className="conf-step__paragraph">Введите описание фильма:</p>
              <div className="popup__input-block">
                <input
                  placeholder="Описание фильма..."
                  onChange={(e) =>
                    setFilmInfo((prev: IMovieInfo) => ({
                      ...prev,
                      synopsis: e.target.value,
                    }))
                  }
                  value={filmInfo.synopsis}
                  type="text"
                  className="conf-step__input popup__input"
                />
              </div>
            </label>
          </div>

          <div className="label-margin">
            <label>
              <p className="conf-step__paragraph">Введите страну создания:</p>
              <div className="popup__input-block">
                <input
                  placeholder="Страна создания..."
                  onChange={(e) =>
                    setFilmInfo((prev: IMovieInfo) => ({
                      ...prev,
                      origin: e.target.value,
                    }))
                  }
                  value={filmInfo.origin}
                  type="text"
                  className="conf-step__input popup__input"
                />
              </div>
            </label>
          </div>
          <div className="label-margin">
            <label>
              <p className="conf-step__paragraph">Введите год создания:</p>
              <div className="popup__input-block">
                <input
                  placeholder="Год выхода (гггг)..."
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setFilmInfo((prev: IMovieInfo) => ({
                        ...prev,
                        release_date: null,
                      }));
                    } else if (value.length <= 4) {
                      const numberValue = Number(value);
                      setFilmInfo((prev: IMovieInfo) => ({
                        ...prev,
                        release_date: numberValue,
                      }));
                    }
                  }}
                  value={
                    filmInfo.release_date !== null ? filmInfo.release_date : ""
                  }
                  type="number"
                  min="1900"
                  max="2024"
                  className="conf-step__input popup__input"
                />
              </div>
            </label>
          </div>

          <div className="label-margin">
            <label>
              <p className="conf-step__paragraph">
                Введите длительность фильма:
              </p>
              <div className="popup__input-block">
                <input
                  placeholder="Длительность, минут..."
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                      setFilmInfo((prev: IMovieInfo) => ({
                        ...prev,
                        duration: null,
                      }));
                    } else if (value.length <= 3) {
                      setFilmInfo((prev: IMovieInfo) => ({
                        ...prev,
                        duration: Number(e.target.value),
                      }));
                    }
                  }}
                  value={filmInfo.duration !== null ? filmInfo.duration : ""}
                  type="number"
                  min="1"
                  max="999"
                  className="conf-step__input popup__input"
                />
              </div>
            </label>
          </div>
          <button
            onClick={(ev: any) => {
              updateFilm(filmInfo);
              ev.preventDefault();
              popupConfigClose()
            }}
            className="conf-step__button conf-step__button-accent popup__btn"
          >
            сохранить
          </button>
          <button
            onClick={(ev: any) => { 
              if (filmById && filmById.id !== undefined) {
                deleteFilm(filmById.id);
              } else {
                console.error('filmById is null or undefined');
              }
              ev.preventDefault();
              popupConfigClose();
            }}
            className="conf-step__button conf-step__button-delete popup__btn"
          >
            удалить фильм
          </button>

        </Popup>
      )}

      <Header title={true} subtitle={true} />
      <main className="conf-steps">
        <HallManage />
        <HallConfig />
        <PriceConfig />
        <SessionsManage />
        <SessionsGrid />
        <OpenSales />
      </main>
    </body>
  );
}

export default Admin;
