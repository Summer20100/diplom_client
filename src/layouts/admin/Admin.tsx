import conf from '../configurations/conf';
import HallManage from './components/HallManage/HallManage';
import HallConfig from './components/HallConfig/HallConfig';
import PriceConfig from './components/PriceConfig/PriceConfig';
import SessionsGrid from './components/SessionsGrid';
import OpenSales from './components/OpenSales';
import HallSeatType from './components/HallConfig/HallSeatType';
import Header from './components/Header';
import { usePopup } from '../store/popup';
import { useHallStore } from '../store/halls';
import { useSeatType } from '../store/seats';
import { useHallSeats } from '../store/hallsSeats'; 
import { useState, useEffect, FC } from 'react';
import Popup from './components/Popup';

import './CSS/normalize.css';
import './CSS/styles.css';

interface ISeatInfo {
  id_seat: number,
  hall_id: number,
  chair_type: string
}

export function Admin() {
  const { documentTitle, accordeon } = conf;
  const { getHallChairsById, hallsSeatsById } = useHallSeats();
  const { seats: seatType } = useSeatType();
  const { halls, fetchDataHallSeats, deleteHall, delHall, createHall } = useHallStore()
  const { getHallSeat, updateHallSeat, hallsSeat, message, popupConfigOpen, popupConfigClose, namePopup, popupIsOpen, popupIsClose } = usePopup();
  const [input, setInput] = useState<string>('');
  const [seatInfo, setSeatInfo] = useState<ISeatInfo | undefined>(undefined);

  useEffect(() => {
    documentTitle('ИдёмВКино');
    accordeon('conf-step__header');
  }, [])

  useEffect(() => {
    getHallChairsById(seatInfo?.hall_id ?? 0);
  }, [message, seatInfo]);

  const addHall = (hall_title: Object, ev: any) => {
    createHall(hall_title);
    ev.preventDefault();
    popupConfigClose()
  }

  const inf = (chair_type: string ) => {
    if (hallsSeat) {
      setSeatInfo({
        id_seat: hallsSeat.id_seat,
        hall_id: hallsSeat.hall_id,
        chair_type
      });
    }
  };

  return (
    <body>
      { namePopup === 'popupHallManage' && 
        <Popup
          title="СОЗДАТЬ НОВЫЙ ЗАЛ"
          posterImage="poster-image.jpg"
        >
          <p className="conf-step__paragraph">Введите название нового зала:</p>
          <div className="popup__input-block">
            <input
              placeholder='Название зала...'
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              className="conf-step__input popup__input"
            />
            <button onClick={(ev: any) => { addHall({hall_title: input}, ev) }} className="conf-step__button conf-step__button-accent popup__btn">Создать зал</button>
          </div>
        </Popup>
      }

      { namePopup === 'popupHallConfig' && 
        <Popup
          title="ТИПЫ КРЕСЕЛ"
          posterImage="poster-image.jpg"
        >
          <p className="conf-step__paragraph">Выберите тип кресла:</p>
          
          <div className="conf-step__legend conf-step__legend-popup">
          {
            seatType && seatType.map(seat => (
              <HallSeatType key={seat.id} type={seat.type} chairType={() => inf(seat.type)} />
            ))
          }
          </div>

          <button onClick={(ev) => {
            ev.preventDefault(); 
            if(seatInfo !== undefined) {
              updateHallSeat(seatInfo);
              getHallChairsById(seatInfo.hall_id)
              popupConfigClose();
            } 
          }} className="conf-step__button conf-step__button-accent popup__btn">Выбрать</button>
        </Popup>
      }


      
      { namePopup === 'popupSessionsGrid' && 
        <Popup
          title="СОЗДАТЬ НОВЫЙ ФИЛЬМ"
          posterImage="poster-image.jpg"
        >
          <label>
            <p className="conf-step__paragraph">Введите страну создания:</p>
            <div className="popup__input-block">
              <input
                placeholder='Страна создания...'
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                className="conf-step__input popup__input"
              />
            </div>
          </label>
          <label>
            <p className="conf-step__paragraph">Введите год создания:</p>
            <div className="popup__input-block">
              <input
                placeholder='Год создания...'
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                className="conf-step__input popup__input"
              />
            </div>
          </label>
          <label>
            <p className="conf-step__paragraph">Введите название фильма:</p>
            <div className="popup__input-block">
              <input
                placeholder='Название фильма...'
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                className="conf-step__input popup__input"
              />
            </div>
          </label>
          <label>
            <p className="conf-step__paragraph">Введите описание фильма:</p>
            <div className="popup__input-block">
              <input
                placeholder='Описание фильма...'
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                className="conf-step__input popup__input"
              />
            </div>
          </label>
          <label>
            <p className="conf-step__paragraph">Введите URL постера:</p>
            <div className="popup__input-block">
              <input
                placeholder='URL постера...'
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                className="conf-step__input popup__input"
              />
            </div>
          </label>
          <label>
            <p className="conf-step__paragraph">Введите длительность фильма:</p>
            <div className="popup__input-block">
              <input
                placeholder='Длительность фильма...'
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                className="conf-step__input popup__input"
              />
            </div>
          </label>

          <button onClick={(ev: any) => { addHall({hall_title: input}, ev) }} className="conf-step__button conf-step__button-accent popup__btn">Создать зал</button>

        </Popup>
      }


      
      <Header title={true} subtitle={true} />
      <main className="conf-steps">
        {/* <HallManage /> */}
        {/* <HallConfig /> */}
        {/* <PriceConfig /> */}
        <SessionsGrid />
        {/* <OpenSales /> */}
      </main>
    </body>
  );
}

export default Admin;