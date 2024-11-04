import { FC, useState } from 'react';

interface ISeat {
  id_seat: number;
  row_number: number;
  seat_number: number;
  chair_type: string;
  price: string;
  hall_title: string;
  hall_id: number;
  session_id: number;
  check_is_buying: boolean;
}

interface ISchemeProps {
  seat: ISeat;
  infoSeats: (seat: ISeat) => void;
}

const Seat: FC<ISchemeProps> = ({ seat, infoSeats }) => {
  const [checked, setChecked] = useState(false);

  const getChairClass = (chairType: string) => {
    switch (chairType) {
      case 'vip':
        return 'buying-scheme__chair_vip';
      case 'disabled':
        return 'buying-scheme__chair_disabled cursor-default';
      case 'standart':
        return 'buying-scheme__chair_standart';
      case 'taken':
        return 'square buying-scheme__chair buying-scheme__chair_taken cursor-default';
      default:
        return 'buying-scheme__chair_disabled';
    }
  };

  const handleCheckboxChange = () => {
    setChecked(!checked);
    if (seat.chair_type !== 'disabled') {
      infoSeats(seat);
    }
  };

  return (
    <label className="custom-checkbox">
      { seat.check_is_buying 
        ? <>
          <input
            type="checkbox"
            key={seat.id_seat}
            disabled
          />
          <span className={`${getChairClass('taken')}`}></span>
        </>
        : 
        <>
          <input
            type="checkbox"
            key={seat.id_seat}
            onChange={handleCheckboxChange}
            disabled={seat.chair_type === 'disabled'}
          />
          <span className={`square buying-scheme__chair ${checked ? 'buying-scheme__chair_selected' : ''} ${getChairClass(seat.chair_type)}`}></span>
        </>
      }
    </label>
  );
};

export default Seat;