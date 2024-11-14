import { FC, useEffect, useLayoutEffect, useState } from 'react';
import Header from '../Header';
import { HallSelector } from "./HallSelector"
import { IHallSeats } from "../../../models/IHallSeats";
import { useHallStore } from "../../../store/halls"
import { useHallSeats } from "../../../store/hallsSeats"
import { useSeatType } from "../../../store/seats"
import PriceSeat from "./PriceSeat"

interface IPrice {
  type: string;
  price: number;
  id: number
}

const PriceConfig: FC = () => {
  const { halls, activeHallPrice, setActiveHallPrice } = useHallStore()
  const { seats } = useSeatType()
  const { updatePriceHallSeats, fetchDataHallSeats, getHallChairsById } = useHallSeats();


  useEffect(() => {
    fetchDataHallSeats()
  }, [])
  const [activeHall, setActiveHall] = useState<IHallSeats>()
  const [price, setPrice] = useState<IPrice[]>([])

  const active = (hall: IHallSeats) => {
    setActiveHall(hall)
  };

  console.log(activeHallPrice)
  console.log(activeHall)

  const priceSeat = (type: string, price: number) => {
    if ( activeHall ) {
      const { id } = activeHall;
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
    if (activeHall) {
      getHallChairsById(activeHall.id);
    }
  }, [activeHall]);

  useEffect(() => {
    if (price) {
      setClear(1)
    }
  }, [price]);

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
                isActive={activeHall?.id === hall.id}
              />
            ))
          }
        </ul>
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