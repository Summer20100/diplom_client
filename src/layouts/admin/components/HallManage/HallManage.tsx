import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header';
import Popup from '../Popup';
import Hall from './Hall';
import { useHallStore } from "../../../store/halls"
import { useHallSeats } from "../../../store/hallsSeats"
import { IHallSeats } from "../../../models/IHallSeats";

const HallManage: FC = () => {
  const { halls, fetchDataHallSeats, deleteHall, delHall, createHall } = useHallStore()
  const [name, setName] = useState<string>('');
  const { hallsSeats, deleteHallSeats } = useHallSeats();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(()=> {
    fetchDataHallSeats()
  }, [delHall])

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const addHall = (hall_title: Object) => {
    createHall(hall_title);
    closePopup();
  }

  const [input, setInput] = useState<string>('');

  return (
    <>
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
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
          <button onClick={(ev: any) => { addHall({hall_title: input}), ev.preventDefault() }} className="conf-step__button conf-step__button-accent popup__btn">Создать зал</button>
        </div>
      </Popup>

      <section className="conf-step">
        <Header title={true} h2="Управление залами" />
        <div className="conf-step__wrapper">
          <p className="conf-step__paragraph">Доступные залы:</p>
          <ul className="conf-step__list">
            {
              halls.map(hall => (
                <Hall
                  key={hall.id}
                  name={hall.hall_title}
                  id={hall.id}
                  deleteHall={deleteHall}
                  deleteHallSeats={deleteHallSeats}
                />
              ))
            }
          </ul>
          {/* <button onClick={() => createHall('ЗАЛ 666')} className="conf-step__button conf-step__button-accent">Создать зал</button> */}
          <button onClick={openPopup} className="conf-step__button conf-step__button-accent">Создать зал</button>
        </div>
      </section>
    </>
  );
}
export default HallManage;