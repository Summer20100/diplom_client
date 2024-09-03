import { FC, useState } from 'react';
import { useSeatType } from "../../../store/seats"

interface IPriceSeat {
  type: string;
  priceHandler: (type: string, price: number) => void
}

const PriceSeat: FC<IPriceSeat> = ({ type, priceHandler }) => {
  const { seats: seatTypes } = useSeatType()
  
  const [price, setPrice] = useState<number>()
  // const [typeSeat, setTypeSeat] = useState<string>()

  const typeSeat: string = `conf-step__chair conf-step__chair_${type}`
  
  return (
    <>
      { type !=='disabled' &&
        <div className="conf-step__legend">
          <label className="conf-step__label">
            Цена, рублей
            <input 
              onChange={(e: any) => {
                setPrice(e.target.value)
                priceHandler(type, e.target.value)
              }} 
              type="text" 
              className="conf-step__input" 
              placeholder="0" 
              value={ price }
            />
          </label>
          за 
          <span className={ typeSeat }></span> 
          {
            type === 'vip' ? ' VIP кресла' : ' обычные кресла'
          }
        </div>
      }
    </>
  );
}
export default PriceSeat;