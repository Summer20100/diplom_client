import { usePopup } from '../../../store/popup';

interface IHallChears {
  id_seat: number,
  hall_id: number,
  hall_title: string,
  row_number: number,
  seat_number: number,
  chair_type: string,
  price: number,
};

const SeatCell: React.FC<{ seat: IHallChears }> = ({ seat }) => {
  const { getHallSeat, popupConfigOpen } = usePopup();

  const openPopup = () => {
    getHallSeat(seat);
    popupConfigOpen('popupHallConfig');
  };

  const typeOfChair: string = "conf-step__chair conf-step__chair_" + seat.chair_type;

  return (
    <>
      <span className={ typeOfChair } onClick={openPopup}> </span>
    </>
  );
};

export default SeatCell


