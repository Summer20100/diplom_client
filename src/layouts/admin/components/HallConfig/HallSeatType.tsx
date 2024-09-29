import { FC, useState } from 'react';
import { useSeatType } from '../../../store/seats';

interface IHallSeatType {
  type: string;
  chairType: (type: string) => void;
  isActive: boolean
}

const HallSeatType: FC<IHallSeatType> = ({ type, chairType, isActive }) => {
  // const [isActive, setIsActive] = useState(false);
  const { seats: seatType } = useSeatType();
  
  const handleClick = () => {
    // setIsActive(!isActive);
    chairType(type);
  };

  let classSeat = `conf-step__chair square conf-step__chair_${type} ${isActive ? 'active' : ''}`;
  
  let seatName = '';
  if (type === 'disabled') {
    seatName = ' - заблокированные (нет кресла)';
  } else if (type === 'vip') {
    seatName = ' — VIP кресла';
  } else {
    seatName = ' — обычные кресла';
  }

  return (
    <>
      <label className="custom-radio">
        <input 
          type="radio" 
          name="options" 
          value={ type }
          onClick={(ev: any) => (handleClick())}
          // checked={isActive}
          // onChange={handleClick}
        />
        <span className={classSeat}></span>
        {seatName}
      </label>
    </>
  );
};

export default HallSeatType;
