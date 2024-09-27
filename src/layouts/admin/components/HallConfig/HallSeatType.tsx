import { FC, useState } from 'react';

interface IHallSeatType {
  type: string;
  chairType: (type: string) => void;
}

const HallSeatType: FC<IHallSeatType> = ({ type, chairType }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    chairType(type);
  };

  let classSeat = `conf-step__chair conf-step__chair_${type} ${isActive ? 'active' : ''}`;
  
  let seatName = '';
  if (type === 'disabled') {
    seatName = ' - заблокированные (нет кресла)'
  } else if (type === 'vip') {
    seatName = ' — VIP кресла'
  } else {
    seatName = ' — обычные кресла'
  }

  return (
    <>
      <span className={classSeat} onClick={handleClick}></span>{seatName}
    </>
  )
}
export default HallSeatType;