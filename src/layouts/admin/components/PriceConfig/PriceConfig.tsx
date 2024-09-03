import { FC, useEffect, useLayoutEffect, useState } from 'react';
import Header from '../Header';
import { HallSelector } from "../HallConfig/HallSelector"
import { IHallSeats } from "../../../models/IHallSeats";
import { useHallStore } from "../../../store/halls"
import { useHallSeats } from "../../../store/hallsSeats"
import { useSeatType } from "../../../store/seats"
import PriceSeat from "./PriceSeat"

interface IPrice {
  type: string;
  price: number;
}

const PriceConfig: FC = () => {
  const { halls } = useHallStore()
  const { hallsSeats, fetchDataHallSeats } = useHallSeats()
  const { seats } = useSeatType()

  useEffect(() => {
    fetchDataHallSeats()
  }, [])
  const [activeHall, setActiveHall] = useState<IHallSeats>()
  const [price, setPrice] = useState<IPrice[]>([])
  const [changeSeatPrice, setChangeSeatPrice] = useState<IHallSeats[]>([])

  const active = (hall: IHallSeats) => {
    setActiveHall(hall)
  }

  const priceSeat = (type: string, price: number) => {
    setPrice(prev => {
      const existingSeat = prev.find(el => el.type === type);
      if (existingSeat) {
        return prev.map(el => (el.type === type ? { type, price } : el));
      } else {
        return [...prev, { type, price }];
      }
    });
  };

  const priceHandler = (type: string, price: number) => {
    priceSeat(type, price)
  }

  const updateSeatPrices = (price: IPrice[], activeHall: IHallSeats) => {
    const { id } = activeHall;
    const updatedHallsSeats = hallsSeats.map(hallsSeat => {
      if (hallsSeat.id === id) {
        const updatedPrice = price.find(el => el.type === hallsSeat.type)?.price;
        if (updatedPrice !== undefined) {
          return { ...hallsSeat, price: updatedPrice };
        }
      }
      return hallsSeat;
    });
    setChangeSeatPrice(updatedHallsSeats);
  };

  useEffect(() => {
    if (price && activeHall) {
      updateSeatPrices(price, activeHall);
    }
  }, [price, activeHall]);

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
                activeHall={active}
              />
            ))
          }
        </ul>
        <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
        {
          seats.map(seat => 
            <PriceSeat key={ seat.id } type={ seat.type } priceHandler={priceHandler} />
          )
        }
        <fieldset className="conf-step__buttons text-center">
          <button className="conf-step__button conf-step__button-regular">Отмена</button>
          <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" />
        </fieldset>
      </div>
    </section>
  );
}
export default PriceConfig;