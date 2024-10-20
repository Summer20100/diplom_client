import { FC, useState, useEffect } from 'react';

interface IPriceSeat {
  type: string;
  priceHandler: (type: string, price: number) => void;
  clearPrice: number;
}

const PriceSeat: FC<IPriceSeat> = ({ type, priceHandler, clearPrice }) => {  
  const [price, setPrice] = useState<number | null >(null);
  const typeSeat: string = `conf-step__chair conf-step__chair_${type}`

  console.log(clearPrice)

  useEffect(() => {
    if ( clearPrice === 0 ) {
      setPrice(null)
    }
  }, [clearPrice]);
  
  return (
    <>
      { type !=='disabled' &&
        <div className="conf-step__legend">
          <label className="conf-step__label">
            Цена, рублей
            <input 
              onChange={(e: any) => {
                setPrice(e.target.value)
                priceHandler(type, Number(e.target.value))
              }} 
              type="number" 
              className="conf-step__input" 
              placeholder="0" 
              value={price !== null ? price : ''}
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