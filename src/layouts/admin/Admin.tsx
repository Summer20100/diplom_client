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

interface IFilmInfo {
  title: string,
  origin: string,
  releaseDate: string,
  poster_title: string,
  synopsis: string,
  imageURL: string,
  duration: number
}

export function Admin() {
  const { documentTitle, accordeon } = conf;
  const { getHallChairsById, hallsSeatsById } = useHallSeats();
  const { seats: seatType } = useSeatType();
  const { halls, fetchDataHallSeats, deleteHall, delHall, createHall } = useHallStore()
  const { getHallSeat, updateHallSeat, hallsSeat, message, popupConfigOpen, popupConfigClose, namePopup, popupIsOpen, popupIsClose } = usePopup();
  const [input, setInput] = useState<string>('');
  const [seatInfo, setSeatInfo] = useState<ISeatInfo | undefined>(undefined);
  const [filmInfo, setFilmInfo] = useState<IFilmInfo>({ 
    title: '',
    poster_title: '',
    origin: '',
    releaseDate: '',
    synopsis: '',
    imageURL: '',
    duration: 0,
  });
  const [selectedType, setSelectedType] = useState<string>('standart');

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

  console.log(filmInfo)

  const handleChairType = (type: string) => {
    setSelectedType(type);
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
              <HallSeatType 
                key={seat.id} 
                type={seat.type} 
                chairType={() => (inf(seat.type), handleChairType)} 
                isActive={selectedType === seat.type}
              />
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
          <div className="label-margin">
            <label>
              <p className="conf-step__paragraph">Введите название фильма:</p>
              <div className="popup__input-block">
                <input
                  placeholder='Страна создания...'
                  onChange={(e) => setFilmInfo(prev => ({ ...prev, title: e.target.value }))}
                  value={ filmInfo.title }
                  type="text"
                  className="conf-step__input popup__input"
                />
              </div>
            </label>
          </div>
          <div className="label-margin">
            <label>
              <p className="conf-step__paragraph">Введите название постера к фильму:</p>
              <div className="popup__input-block">
                <input
                  placeholder='Страна создания...'
                  onChange={(e) => setFilmInfo(prev => ({ ...prev, poster_title: e.target.value }))}
                  value={ filmInfo.poster_title }
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
                  placeholder='URL постера...'
                  onChange={(e) => setFilmInfo(prev => ({ ...prev, imageURL: e.target.value }))}
                  value={ filmInfo.imageURL}
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
                  placeholder='Описание фильма...'
                  onChange={(e) => setFilmInfo(prev => ({ ...prev, synopsis: e.target.value }))}
                  value={ filmInfo.synopsis }
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
                  placeholder='Страна создания...'
                  onChange={(e) => setFilmInfo(prev => ({ ...prev, origin: e.target.value }))}
                  value={ filmInfo.origin }
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
                  placeholder='Дата выхода (дд.мм.гггг)...'
                  onChange={(e) => setFilmInfo(prev => ({ ...prev, releaseDate: e.target.value }))}
                  value={ filmInfo.releaseDate }
                  type="date"
                  className="conf-step__input popup__input"
                />
              </div>
            </label>
          </div>
          
          
          <div className="label-margin">
            <label>
              <p className="conf-step__paragraph">Введите длительность фильма:</p>
              <div className="popup__input-block">
                <input
                  placeholder='0'
                  onChange={(e) => setFilmInfo(prev => ({ ...prev, duration: Number(e.target.value)}))}
                  value={ filmInfo.duration }
                  type="text"
                  className="conf-step__input popup__input"
                />
              </div>
            </label>
          </div>
          <div className="label-margin">
            <label>
              <p className="conf-step__paragraph">Сеанс:</p>
              <div className="popup__input-block">
                <input
                  placeholder='Начало...'
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  type="text"
                  className="conf-step__input popup__input"
                />
                <input
                  placeholder='Окончание...'
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  type="text"
                  className="conf-step__input popup__input"
                />
              </div>
            </label>
          </div>
          <button 
            onClick={(ev: any) => { addHall({hall_title: input}, ev) }} 
            className="conf-step__button conf-step__button-accent popup__btn"
            >Добавить фильм</button>
        </Popup>
      }

      <Header title={true} subtitle={true} />
      <main className="conf-steps">
        <HallManage />
        <HallConfig />
        <PriceConfig />
        <SessionsGrid />
        {/* <OpenSales /> */}
      </main>
    </body>
  );
}

export default Admin;