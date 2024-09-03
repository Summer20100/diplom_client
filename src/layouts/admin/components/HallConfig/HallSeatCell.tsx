import { useState } from 'react'
import { IHallSeats } from '../../../models/IHallSeats'
import Popup from '../Popup';
import HallSeatType from "./HallSeatType"
import { useSeatType } from "../../../store/seats"
import { useHallSeats } from "../../../store/hallsSeats"

interface IHallChears {
  id_seat: number,
  hall_id: number,
  hall_title: string,
  row_number: number,
  seat_number: number,
  chair_type: string,
  price: number,
}


export const SeatCell: React.FC<{ seat: IHallChears }> = ({ seat }) => {
  const [seatInfo, setSeatInfo] = useState<IHallChears>()
  const [chairType, setChairType] = useState<string>('')
  const { seats: seatType } = useSeatType()
  const { getHallChairsById, hallsSeatsById, getHallChairInfo } = useHallSeats();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const openPopup = () => {
    getHallChairInfo(seat);
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const info = (seat: IHallChears) => {
    console.log(seat)
    setSeatInfo(seat)
  }

  // console.log(chairType)

  const [changedInfo, setChangedInfo] = useState<IHallChears>({} as IHallChears)

  

  const updatedCearsInfo = (chairType: string) => {
    getHallChairsById(seat.hall_id)
    const newPosition = hallsSeatsById.filter(chair => chair.id_seat === seat.id_seat)
    const newNewPosition = newPosition.map(chair => ({ 
        ...chair, 
        chair_type: chairType
    }));

    // setChangedInfo({ ...seat, chair_type: chairType });
    // console.log("newPosition >>>>", newPosition)
    // console.log("newNewPosition >>>>", newNewPosition)

    const updatedHallsSeats = hallsSeatsById.map(chair => {
      if (chair.id_seat === seat.id_seat) {
        return { ...chair, chair_type: chairType };
      }
      return chair;
    })

    console.log("updatedHallsSeats >>>>", updatedHallsSeats)
    
    // getHallChairsById(seat.hall_id)
    // return [{ ...seat }, { chair_type: chairType }]
  }

  // console.log(hallsSeatsById)

  return (
    <>
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup}
        title="ТИПЫ КРЕСЕЛ"
        posterImage="poster-image.jpg"
      >
        <p className="conf-step__paragraph">Выберите тип кресла:</p>
        <div className="conf-step__legend conf-step__legend-popup">
          {
            seatType.map(seat => <HallSeatType key={seat.id} type={seat.type} chairType={updatedCearsInfo} />)
          }
        </div>
        <button onClick={() => { updatedCearsInfo(chairType); closePopup() }} className="conf-step__button conf-step__button-accent popup__btn">Выбрать</button>
      </Popup>

      <span className="conf-step__chair conf-step__chair_disabled" onClick={openPopup}> </span>
    </>
  );
};

export default SeatCell


