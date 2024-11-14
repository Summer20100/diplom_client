import conf from "../../configurations/conf";
import { usePopup } from "../../store/popup";
import { useHallStore } from "../../store/halls";
import { useHallSeats } from "../../store/hallsSeats";
import { useState, useEffect, FC } from "react";

import Popup from "./Popup";

interface ISeatInfo {
  id_seat: number;
  hall_id: number;
  chair_type: string;
};

export function PopupHallManage() {
  const { documentTitle, accordeon } = conf;
  const { createHall } = useHallStore();
  const { popupConfigClose } =  usePopup();

  const [input, setInput] = useState<string>("");

  useEffect(() => {
    documentTitle("ИдёмВКино");
    accordeon("conf-step__header");
  }, []);


  const addHall = (hall_title: any, ev: any) => {
    createHall(hall_title);
    ev.preventDefault();
    popupConfigClose();
    setInput("");
  };

  return (
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
  );
}

export default PopupHallManage;
