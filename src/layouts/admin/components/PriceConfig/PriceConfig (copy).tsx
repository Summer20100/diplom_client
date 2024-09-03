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
  const [price, setPrice] = useState<IPrice>()
  const [cangeSeatPrice, setCangeSeatPrice] = useState<IHallSeats[]>([])

  const active = (hall: IHallSeats) => {
    setActiveHall(hall)
  }
  const priceSeat = (type: string, price: number) => {
    setPrice({ type, price })
  }

  const priceHandler = (type: string, price: number) => {
    priceSeat(type, price)
  }

  // const cangePriceSeat = (price: IPrice, activeHall: IHallSeats) => {
  //   const { type, price: seatPrice } = price
  //   const { id } = activeHall
  //   const findHallSeats = hallsSeats.filter(hall => hall.id === id)
  //   const findSeats = findHallSeats.filter(seat => seat.type === type)
  //   const cangedSeat = findSeats.map(el => el.type === type ? { ...el, price: seatPrice } : el)
  //   setCangeSeatPrice(() => {
  //     return cangedSeat
  //   })
  // }

  // useEffect(() => {
  //   if (price && activeHall) {
  //     cangePriceSeat(price, activeHall)
  //   }
  // }, [activeHall, price])

  // console.log(cangeSeatPrice)




  const updateSeatPrices = (price: IPrice, activeHall: IHallSeats) => {
    const { type, price: seatPrice } = price;
    const updatedHallsSeats = hallsSeats.map(hallsSeat => {
      if (hallsSeat.id === activeHall.id) {
        return {
          ...hallsSeat,
          // price:
          
            // if (hall.type === type) {
            //   return { ...hall.seats, price: seatPrice };
            // } else {
            //   return hall.seats;
            // }
          ...hallsSeat.type === type ? { ...hallsSeat, price: seatPrice } : hallsSeat
          
        };
      }
      return hallsSeat;
    });

    setCangeSeatPrice(updatedHallsSeats);
  };

  useEffect(() => {
    if (price && activeHall) {
      updateSeatPrices(price, activeHall);
    }
  }, [price, activeHall]);

  console.log(cangeSeatPrice);


  


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

        {/* <PriceSeat type="standart" priceHandler={priceHandler} /> */}
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