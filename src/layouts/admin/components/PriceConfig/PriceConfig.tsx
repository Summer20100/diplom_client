import { FC, useEffect, useLayoutEffect, useState } from 'react';
import Header from '../Header';
import { HallSelector } from "./HallSelector"
import { IHallSeats } from "../../../models/IHallSeats";
import { useHallStore } from "../../../store/halls"
import { useHallSeats } from "../../../store/hallsSeats"
import { useSeatType } from "../../../store/seats"
import { ErrorNotification, MessageNotification } from "../../../Notification";
import PriceSeat from "./PriceSeat"

interface IPrice {
  type: string;
  price: number;
  id: number
}

const PriceConfig: FC = () => {
  const { halls, activeHallPrice, setActiveHallPrice } = useHallStore();

  // console.log("activeHallPrice>>>", activeHallPrice)

  const { seats } = useSeatType()
  const { 
    updatePriceHallSeats, 
    clearNotifications, 
    fetchDataHallSeats, 
    getHallChairsById, 
    message, 
    error 
  } = useHallSeats();

  useEffect(() => {
    fetchDataHallSeats()
  }, [])
  const [activeHall, setActiveHall] = useState<IHallSeats>()
  const [price, setPrice] = useState<IPrice[]>([])

  // const active = (hall: IHallSeats) => {
  //   setActiveHall(activeHallPrice)
  // };

  const priceSeat = (type: string, price: number) => {
    if ( activeHallPrice ) {
      const { id } = activeHallPrice;
      setPrice(prev => {
        const existingSeat = prev.find(el => el.type === type);
        if (existingSeat) {
          return prev.map(el => (el.type === type ? { type, price, id } : el));
        } else {
          return [...prev, { type, price, id }];
        }
      });
    }
  };

  const priceHandler = (type: string, price: number) => {
    priceSeat(type, price)
  }
  
  const [clear, setClear] = useState<number>(1)
  
  const updateSeatPrices = () => {
    updatePriceHallSeats(price);
    setClear(0)
  };
  
  useEffect(() => {
    if (activeHallPrice) {
      getHallChairsById(activeHallPrice.id);
    }
  }, [activeHallPrice]);

  useEffect(() => {
    if (price) {
      setClear(1)
    }
  }, [price]);

  const [activeHallIdPriceConfig, setActiveHallIdPriceConfig] = useState<number | null>(null);

  useEffect(() => {
    if (halls.length > 0 && activeHallIdPriceConfig === null) {
      const firstHall = halls[0];
      setActiveHallIdPriceConfig(firstHall.id);
      setActiveHallPrice(firstHall);
    }
  }, [halls, activeHallIdPriceConfig, setActiveHallPrice]);

  const handleHallSelect = (hall: IHallSeats) => {
    setActiveHallIdPriceConfig(hall.id);
    setActiveHallPrice(hall);
  };

  return (
    <section className="conf-step">
      <Header title={true} h2="Конфигурация цен" />
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
                isActive={activeHallPrice?.id === hall.id}
                onSelect={() => handleHallSelect(hall)}
              />
            ))
          }
        </ul>

        {error && <ErrorNotification message={error} onClose={() => clearNotifications()} />}
        {message && <MessageNotification message={message} onClose={() => clearNotifications()} />}

        <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
        {
          seats.map(seat => 
            <PriceSeat key={ seat.id } type={ seat.type } priceHandler={priceHandler} clearPrice={clear}/>
          )
        }
        <fieldset className="conf-step__buttons text-center">
          {/* <button 
          className="conf-step__button conf-step__button-regular"
          onClick={() => setClear(0)}
          >Отмена</button> */}
          <input 
            type="submit" 
            value="Сохранить" 
            className="conf-step__button conf-step__button-accent" 
            onClick={updateSeatPrices}
          />
        </fieldset>
      </div>
    </section>
  );
}
export default PriceConfig;