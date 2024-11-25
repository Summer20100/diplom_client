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
  const { halls, fetchDataHallSeats, activeHallConfig, activeHallPrice, setActiveHallConfig } = useHallStore();

  // console.log("activeHallConfig>>>", activeHallConfig)

  const { 
    addHallSeats, 
    hallsSeats, 
    getHallChairsByIdHallConfig, 
    hallsSeatsByIdHallConfig, 
    deleteHallSeats, 
    fetchAddHallSeats,
    clearNotifications,
    error,
    message
  } = useHallSeats();


  // console.log(hallsSeatsByIdHallConfig)



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
    getHallChairsByIdHallConfig(hall.id)
  };

  useEffect(() => {
    if (halls.length > 0 && !activeHallConfig) {
      setActiveHall(halls[0]);
      getHallChairsByIdHallConfig(halls[0].id);
    }
  }, [halls]);

  useEffect(() => {
    if (activeHallConfig) {
      getHallChairsByIdHallConfig(activeHallConfig.id);
    }
  }, [activeHallConfig]);
  
  const createHall = (activeHallConfig: IHall, rows: number, seats: number) => {
    const seat: IHallConfig[] = [];
    const { id, hall_title } = activeHallConfig
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

    if (hallsSeatsByIdHallConfig.length > 0) {
      if (seat.length === hallsSeatsByIdHallConfig.length && id === hallsSeatsByIdHallConfig[0].hall_id) {
        console.log('ДЛИНА И ИД РАВНЫ');
      } else if (id === hallsSeatsByIdHallConfig[0].hall_id && seat.length !== hallsSeatsByIdHallConfig.length) {
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
    getHallChairsByIdHallConfig(activeHallConfig?.id ?? 0)
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

  const [activeHallIdHallConfig, setActiveHallIdHallConfig] = useState<number | null>(null);

  useEffect(() => {
    if (halls.length > 0 && activeHallIdHallConfig === null) {
      const firstHall = halls[0];
      setActiveHallIdHallConfig(firstHall.id);
      setActiveHallConfig(firstHall);
    }
  }, [halls, activeHallIdHallConfig, setActiveHallConfig]);

  const handleHallSelect = (hall: IHallSeats) => {
    setActiveHallIdHallConfig(hall.id);
    setActiveHallConfig(hall);
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
                  // activeHall={active}
                  isActive={activeHallConfig?.id === hall.id}
                  onSelect={() => handleHallSelect(hall)}
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
                  hallsSeatsByIdHallConfig.length === 0
                  ? String(rows)
                  : String(Math.max(...hallsSeatsByIdHallConfig.map(seat => seat.row_number)))
                } 
                disabled = { hallsSeatsByIdHallConfig.length !== 0 } 
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
                  hallsSeatsByIdHallConfig.length === 0
                  ? String(seats)
                  : String(hallsSeatsByIdHallConfig.length/Math.max(...hallsSeatsByIdHallConfig.map(seat => seat.row_number)))
                } 
                disabled = { hallsSeatsByIdHallConfig.length !== 0 }
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

          { hallsSeatsByIdHallConfig.length > 0
            ? <HallSeats 
                rows={Math.max(...hallsSeatsByIdHallConfig.map(seat => seat.row_number))} 
                seats={hallsSeatsByIdHallConfig.length/(Math.max(...hallsSeatsByIdHallConfig.map(seat => seat.row_number)))} 
                id={activeHallConfig?.id || 0}
                hall_title={activeHallConfig?.hall_title || ''}
              />
            : <HallSeats rows={rows} seats={seats} id={activeHallConfig?.id || 0} hall_title={activeHallConfig?.hall_title || ''} />
          }

          <fieldset 
            className="conf-step__buttons text-center"
            style={{ visibility: hallsSeatsByIdHallConfig.length !== 0 ? 'hidden' : 'visible' }}
          >
            {/* <button 
              className="conf-step__button conf-step__button-regular"
              disabled = { hallsSeatsById.length !== 0 }
            >Отмена</button> */}
            <input 
              onClick={() => createHall(activeHallConfig as IHallSeats, rows, seats)} 
              type="submit" 
              value="Сохранить" 
              className="conf-step__button conf-step__button-accent"
              disabled = { hallsSeatsByIdHallConfig.length !== 0 }
            />
          </fieldset>
        </div>
      </section>
    </>

  );
}
export default HallConfig;