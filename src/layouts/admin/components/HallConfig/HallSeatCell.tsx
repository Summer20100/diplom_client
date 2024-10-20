import { usePopup } from '../../../store/popup';
import { useState, useEffect } from "react";

interface IHallChears {
  id_seat: number;
  hall_id: number;
  hall_title: string;
  row_number: number;
  seat_number: number;
  chair_type: string;
  price: number;
}

const SeatCell: React.FC<{ seat: IHallChears }> = ({ seat }) => {
  const { getHallSeat, popupConfigOpen } = usePopup();

  const openPopup = () => {
    getHallSeat(seat);
    popupConfigOpen('popupHallConfig');
    handleClick();
  };

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const [typeOfChair, setTypeOfChair] = useState(`conf-step__chair conf-step__chair_${seat.chair_type}`);

  useEffect(() => {
    setTypeOfChair(`conf-step__chair square conf-step__chair_${seat.chair_type} ${isActive ? 'active' : ''}`);
  }, [seat.chair_type, isActive]);

  return (
      <label className="custom-radio">
        <input 
          type="radio" 
          name="options" 
          value={ seat.chair_type }
          onClick={(ev: any) => (openPopup())}
        />
        <span 
          className={typeOfChair} 
        ></span>
      </label>
  );
};

export default SeatCell;
