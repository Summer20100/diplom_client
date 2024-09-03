import { FC, useEffect } from "react"
import { useHallStore } from "../../../store/halls"
import { useSeatType } from "../../../store/seats"

interface IHallSeats {
  rows: number;
  seats: number;
}

export const HallSeats: FC<IHallSeats> = ({ rows, seats }) => {
  const { halls, fetchDataHallSeats } = useHallStore()
  const { seats: seatTypes, fetchDataSeatType } = useSeatType()
  

  useEffect(() => {
    fetchDataHallSeats();
    fetchDataSeatType()
  }, [fetchDataHallSeats, fetchDataSeatType])

  const hallCell = [];

  for (let i = 0; i < rows; i++) {
    const columns = [];
    for (let j = 0; j < seats; j++) {
      columns.push(
        <span className="conf-step__chair conf-step__chair_disabled" key={j}></span>
      );
    }
    hallCell.push(
      <div className="conf-step__row" key={i}>
        { columns }
      </div>
    );
  }

  
  return (
    <div className="conf-step__hall">      
      <div className="conf-step__hall-wrapper">
        { hallCell }
      </div>
    </div>
  )
}

export default HallSeats