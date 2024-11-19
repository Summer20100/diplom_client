import { FC, useEffect, useState } from 'react';
import Header from '../Header';
import HallSeats from './HallSeats';
import { useHallStore } from "../../../store/halls"
import { useSeatType } from "../../../store/seats"
import { useHallSeats } from "../../../store/hallsSeats"
import { HallSelector } from "./HallSelector"
import { IHallSeats, IHall } from "../../../models/IHallSeats";
import { ErrorNotification, MessageNotification } from "../../../Notification";
import { usePopup } from "../../../store/popup";
import HallSeatType from "./HallSeatType"

interface IHallConfig {
  id_seat: number,
  hall_id: number,
  hall_title: string,
  row_number: number,
  seat_number: number,
  chair_type: string,
  price: number,
}

const HallConfig: FC = () => {
  const { halls, fetchDataHallSeats, activeHallConfig, setActiveHallConfig } = useHallStore();
  const { 
    addHallSeats, 
    hallsSeats, 
    getHallChairsById, 
    hallsSeatsById, 
    deleteHallSeats, 
    fetchAddHallSeats,
    clearNotifications,
    error,
    message
  } = useHallSeats();

  const { seats: seatType } = useSeatType();
  
  const [rows, setRows] = useState<number>(10);
  const [seats, setSeats] = useState<number>(8);

  useEffect(() => {
    fetchDataHallSeats();
  }, []);

  const [activeHall, setActiveHall] = useState<IHall>()
  const [newHall, setNewHall] = useState<IHallConfig[] | undefined>([])

  const active = (hall: IHall) => {
    setActiveHall(hall)
    getHallChairsById(hall.id)
  };

  useEffect(() => {
    if (halls.length > 0 && !activeHall) {
      setActiveHall(halls[0]);
      getHallChairsById(halls[0].id);
    }
  }, [halls]);

  useEffect(() => {
    if (activeHall) {
      getHallChairsById(activeHall.id);
    }
  }, [activeHall]);
  
  const createHall = (activeHall: IHall, rows: number, seats: number) => {
    const seat: IHallConfig[] = [];
    const { id, hall_title } = activeHall
    let id_seat = 1;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < seats; j++) {
        seat.push({
          id_seat,
          hall_id: id,
          hall_title,
          row_number: i + 1,
          seat_number: j + 1,
          chair_type: 'disabled',
          price: 0,
        });
        id_seat += 1;
      }
    };

    if (hallsSeatsById.length > 0) {
      if (seat.length === hallsSeatsById.length && id === hallsSeatsById[0].hall_id) {
        console.log('ДЛИНА И ИД РАВНЫ');
      } else if (id === hallsSeatsById[0].hall_id && seat.length !== hallsSeatsById.length) {
        console.log('ЗАЛ ПЕРЕЗАПИСАН');
        deleteHallSeats(id);
        addHallSeats(seat);
        setNewHall(seat);
      }
    } else {
      console.log('НОВЫЙ ЭЛЕМЕНТ');
      addHallSeats(seat);
      setNewHall(seat);
    }
  }

  useEffect(()=> {
    getHallChairsById(activeHall?.id ?? 0)
  },[newHall, fetchAddHallSeats ])

  const chairType = (type: string) => {
    //console.log(type)
  }

  const handleSelectHall = (hall: IHallSeats) => {
    setActiveHallConfig(hall);
  };

  const closeNotification = () => {
    clearNotifications();
  };

  return (
    <>
      <section className="conf-step">
        <Header title={true} h2="Конфигурация залов" />
        <div className="conf-step__wrapper">
          <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
          <ul className="conf-step__selectors-box">
            {
              halls.map(hall => (
                <HallSelector
                  key={hall.id}
                  name={hall.hall_title}
                  hall={hall}
                  activeHall={active}
                  isActive={activeHall?.id === hall.id}
                />
              ))
            }
          </ul>

          {error && <ErrorNotification message={error} onClose={closeNotification} />}
          {message && <MessageNotification message={message} onClose={closeNotification} />}
          
          <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
          <div className="conf-step__legend">
            <label className="conf-step__label">
              Рядов, шт
              <input
                type="text"
                onChange={(e) => {
                  !e.target.value ? setRows(10) : setRows(Number(e.target.value))
                }}
                className="conf-step__input"
                placeholder={
                  hallsSeatsById.length === 0
                  ? String(rows)
                  : String(Math.max(...hallsSeatsById.map(seat => seat.row_number)))
                } 
                disabled = { hallsSeatsById.length !== 0 } 
              />
            </label>
            <span className="multiplier">x</span>
            <label className="conf-step__label">
              Мест, шт
              <input
                type="text"
                onChange={(e) => {
                  !e.target.value ? setSeats(8) : setSeats(Number(e.target.value))
                }}
                className="conf-step__input"
                placeholder={
                  hallsSeatsById.length === 0
                  ? String(seats)
                  : String(hallsSeatsById.length/Math.max(...hallsSeatsById.map(seat => seat.row_number)))
                } 
                disabled = { hallsSeatsById.length !== 0 }
              />
            </label>
          </div>
          <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
          <div className="conf-step__legend">
            {
              seatType.map(seat => 
                <HallSeatType 
                  key={seat.id} 
                  type={seat.type} 
                  chairType={chairType} 
                  checkIsActive={false}
                />
            )}
            <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
          </div>

          { hallsSeatsById.length > 0
            ? <HallSeats 
                rows={Math.max(...hallsSeatsById.map(seat => seat.row_number))} 
                seats={hallsSeatsById.length/(Math.max(...hallsSeatsById.map(seat => seat.row_number)))} 
                id={activeHall?.id || 0}
                hall_title={activeHall?.hall_title || ''}
              />
            : <HallSeats rows={rows} seats={seats} id={activeHall?.id || 0} hall_title={activeHall?.hall_title || ''} />
          }

          <fieldset 
            className="conf-step__buttons text-center"
            style={{ visibility: hallsSeatsById.length !== 0 ? 'hidden' : 'visible' }}
          >
            {/* <button 
              className="conf-step__button conf-step__button-regular"
              disabled = { hallsSeatsById.length !== 0 }
            >Отмена</button> */}
            <input 
              onClick={() => createHall(activeHall as IHallSeats, rows, seats)} 
              type="submit" 
              value="Сохранить" 
              className="conf-step__button conf-step__button-accent"
              disabled = { hallsSeatsById.length !== 0 }
            />
          </fieldset>
        </div>
      </section>
    </>

  );
}
export default HallConfig;