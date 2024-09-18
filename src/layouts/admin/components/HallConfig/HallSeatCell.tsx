import { useState } from 'react'
import { IHallSeats } from '../../../models/IHallSeats'
import Popup from '../Popup';
import HallSeatType from "./HallSeatType"
import { useSeatType } from "../../../store/seats"
import { useHallSeats } from "../../../store/hallsSeats"
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

interface ISeatInfo {
  id_seat: number,
  hall_id: number,
  chair_type: string
}

export const SeatCell: React.FC<{ seat: IHallChears }> = ({ seat }) => {
  const [seatInfo, setSeatInfo] = useState<ISeatInfo | undefined>(undefined);
  const [chairType, setChairType] = useState<string>('')
  const { seats: seatType } = useSeatType()
  const { getHallChairsById, hallsSeatsById, getHallChairInfo } = useHallSeats();

  const { getHallSeat, updateHallSeat, hallsSeat, popupHallConfigOpen, popupHallConfigClose, popupIsOpen, popupIsClose } = usePopup();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const openPopup = () => {
    getHallSeat(seat);
    popupHallConfigOpen();
  };

  const [changedInfo, setChangedInfo] = useState<IHallChears>({} as IHallChears)

  const typeOfChair: string = "conf-step__chair conf-step__chair_" + seat.chair_type;

  const inf = (chair_type: string ) => {
    if (hallsSeat) {
      setSeatInfo({
        id_seat: hallsSeat.id_seat,
        hall_id: seat.hall_id,
        chair_type
      });
    }
  }

  // const updatedCearsInfo = (seatInfo: ISeatInfo) => {
  //   console.log(seatInfo)
  // }

  return (
    <>
      <Popup
        isOpen={popupIsOpen}
        title="ТИПЫ КРЕСЕЛ"
        posterImage="poster-image.jpg"
      >
        <p className="conf-step__paragraph">Выберите тип кресла:</p>
        <div className="conf-step__legend conf-step__legend-popup">
        {
          seatType && seatType.map(seat => (
            <HallSeatType key={seat.id} type={seat.type} chairType={() => inf(seat.type)} />
          ))
        }
        </div>
        <button onClick={(ev) => {
          ev.preventDefault(); 
          if(seatInfo !== undefined) {
            updateHallSeat(seatInfo);
          } 
        }} className="conf-step__button conf-step__button-accent popup__btn">Выбрать</button>
      </Popup>

      <span className={ typeOfChair } onClick={openPopup}> </span>
    </>
  );
};

export default SeatCell


