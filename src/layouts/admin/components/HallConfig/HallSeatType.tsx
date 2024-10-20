import { FC, useState, useEffect } from 'react';
import { useSeatType } from '../../../store/seats';

interface IHallSeatType {
  type: string;
  chairType: (type: string) => void;
  checkIsActive: boolean
}

const HallSeatType: FC<IHallSeatType> = ({ type, chairType, checkIsActive }) => {
  const [isActive, setIsActive] = useState(false);
  
  const handleClick = () => {
    setIsActive(!isActive);
    chairType(type);
  };
  
  let seatName = '';
  if (type === 'disabled') {
    seatName = ' - заблокированные (нет кресла)';
  } else if (type === 'vip') {
    seatName = ' — VIP кресла';
  } else {
    seatName = ' — обычные кресла';
  }

  const [styleInput, setStyleInput] = useState<boolean>(false);

  useEffect(() => {
    if (checkIsActive) {
      setStyleInput(false)
    } else {
      setStyleInput(true)
    }
  }, [checkIsActive]);


  const [classSeat, setClassSeat] = useState<string>('conf-step__chair square');

  useEffect(() => {
    if (checkIsActive) {
      setClassSeat(`conf-step__chair square conf-step__chair_${type} ${isActive ? 'active' : ''}`)
    } else {
      setClassSeat(`conf-step__chair conf-step__chair_${type}`)
    }
  }, [checkIsActive]);

  return (
       <label className="custom-radio">
        <input 
          type="radio" 
          name="options" 
          value={ type }
          onClick={(ev: any) => (handleClick())}
        />
        <span 
          className={classSeat} 
          style={{
            pointerEvents: styleInput ? 'none' : 'auto',
            cursor: styleInput ? 'default' : 'pointer'
          }}
        ></span>
        {seatName}
      </label>
  );
};

export default HallSeatType;
