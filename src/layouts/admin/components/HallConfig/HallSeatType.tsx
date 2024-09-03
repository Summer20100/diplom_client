import { FC } from 'react';

interface IHallSeatType {
  type: string;
  chairType: (type: string) => void;
}

const HallSeatType: FC<IHallSeatType> = ({ type, chairType }) => {
  let classSeat = `conf-step__chair conf-step__chair_${type}`;
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
      <span className={classSeat} onClick={() => chairType(type)}></span>{seatName}
    </>
  )
}
export default HallSeatType;