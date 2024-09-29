import { FC, useEffect, useState } from "react"
import { useHallStore } from "../../../store/halls"
import { useSeatType } from "../../../store/seats"
import { IHallSeats } from '../../../models/IHallSeats'
import { useHallSeats } from "../../../store/hallsSeats"
import SeatCell from './HallSeatCell'

interface IHallChears {
  id_seat: number,
  hall_id: number,
  hall_title: string,
  row_number: number,
  seat_number: number,
  chair_type: string,
  price: number,
}

export const HallSeats: FC<IHallSeats> = ({ rows, seats, id, hall_title }) => {
  const [newHall, setNewHall] = useState<IHallChears[]>([])
  const { halls, fetchDataHallSeats } = useHallStore()
  const { seats: seatTypes, fetchDataSeatType } = useSeatType()

  const { addHallSeats, hallsSeats, getHallChairsById, hallsSeatsById, deleteHallSeats, fetchAddHallSeats } = useHallSeats()
  
  useEffect(() => {
    fetchDataHallSeats();
    fetchDataSeatType();
  }, [fetchDataHallSeats, fetchDataSeatType])

  const createHall = (id: number, hall_title: string, rows: number | undefined, seats: number | undefined) => {
    const seat: IHallChears[] = [];
    if (rows !== undefined && seats !== undefined) {
      let id_seat: number = 1;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < seats; j++) {
          seat.push({
            id_seat,
            hall_id: id || 0,
            hall_title: hall_title || '',
            row_number: i + 1,
            seat_number: j + 1,
            chair_type: 'disabled',
            price: 0,
          });
          id_seat++;
        }
      }
    }
    setNewHall(seat);
  }

  useEffect(() => {
    if (hallsSeatsById.length > 0) {
      setNewHall(hallsSeatsById);
    } else {
      createHall(id, hall_title, rows, seats);
    }
  }, [id, hall_title, rows, seats, hallsSeatsById])

  const row = newHall.reduce((acc: { [key: number]: IHallChears[] }, seat) => {
    acc[seat.row_number || 1] = acc[seat.row_number || 1] || [];
    acc[seat.row_number || 1].push(seat);
    return acc;
  }, {});
  
  return (
    <div className="conf-step__hall">
      <div className="conf-step__hall-wrapper">
        {Object.keys(row).map((rowNumber) => (
          <div key={rowNumber} style={{ display: 'flex' }} className="conf-step__row">
            {row[parseInt(rowNumber)].map((seat) => (
              <SeatCell key={`${seat.row_number}-${seat.seat_number}`} seat={seat} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HallSeats
