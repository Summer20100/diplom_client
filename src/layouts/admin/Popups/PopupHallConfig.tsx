import conf from "../../configurations/conf";
import HallManage from "../components/HallManage/HallManage";
import HallConfig from "../components/HallConfig/HallConfig";
import PriceConfig from "../components/PriceConfig/PriceConfig";
import SessionsManage from "../components/SessionsManage/SessionsManage";
import SessionsGrid from "../components/SessionsGrid/SessionsGrid";
import OpenSales from "../components/OpenSales";
import HallSeatType from "../components/HallConfig/HallSeatType";
import Header from "../components/Header";
import { usePopup } from "../../store/popup";
import { useHallStore } from "../../store/halls";
import { useSeatType } from "../../store/seats";
import { useFilmsStore } from "../../store/films";
import { useHallSeats } from "../../store/hallsSeats";
import { useSessions } from "../../store/sessions";
import { useState, useEffect, FC } from "react";
import { IMovieInfo } from "../../models/IMovieDate";
import { useUser } from "../../store/users";
import { useAuth } from "../../store/auth";
import { useNavigate } from 'react-router-dom';
import { PopupHallManage } from "../Popups/PopupHallManage";
import ButtonLogout from "../../ButtonLogout"
  

import Popup from "./Popup";

interface ISeatInfo {
  id_seat: number;
  hall_id: number;
  chair_type: string;
};

export function PopupHallConfig() {
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

  const { logout } = useAuth();
  const backToLogin = () => {
    logout();
    window.location.reload();
  };

  return (
    <body className="admin">
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
    </body>
  );
}

export default PopupHallConfig;
