import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Seat from "./Seat"

interface ISeat {
  id_seat: number;
  row_number: number;
  seat_number: number;
  chair_type: string;
  price: string;
  hall_title: string;
  hall_id: number;
  session_id: number,
  check_is_buying: boolean
};

interface SeatSchemeProps {
  seats: ISeat[];
  seatInfo: (seat : ISeat[]) => void;
};

const SeatScheme: React.FC<SeatSchemeProps> = ({ seats, seatInfo }) => {
  const [seatInfoNew, setSeatInfoNew] = useState<ISeat[]>([])

  function infoSeats(seat: ISeat) {
    setSeatInfoNew((prev) => {
      if (!prev) return [seat];
      const existingSeatIndex = prev.findIndex((s) => s.id_seat === seat.id_seat);
      if (existingSeatIndex !== -1) {
        return prev.filter((s) => s.id_seat !== seat.id_seat);
      }
      return [...prev, seat];
    });
  };

  useEffect(() => {
    seatInfo(seatInfoNew);
  }, [seatInfoNew, seatInfo]);
 
  const rows = seats.reduce<{ [key: number]: ISeat[] }>((acc, seat) => {
    if (!acc[seat.row_number]) acc[seat.row_number] = [];
    acc[seat.row_number].push(seat);
    return acc;
  }, {});

  const [isZoomIn, setIsZoomIn ] = useState<boolean>(false);
  console.log(isZoomIn)

  return (
    <div className="buying-scheme__wrapper" onDoubleClick={() => setIsZoomIn((prev) => !prev)}>
    <TransformWrapper 
      doubleClick={{ mode: !isZoomIn ? "zoomIn" : "zoomOut", step: 3 }}
      maxScale={3}
      minScale={1}
    >
      <TransformComponent>
        <div className="buying-scheme__wrapper-hall">
          {Object.keys(rows)
            .sort((a, b) => Number(a) - Number(b))
            .map((rowNumber) => (
              <div className="buying-scheme__row" key={rowNumber}>
                {rows[Number(rowNumber)].map((seat) => (
                  <Seat key={`${rowNumber}-${seat.id_seat}`} seat={seat} infoSeats={infoSeats} />
                ))}
              </div>
          ))}
        </div>
      </TransformComponent>
    </TransformWrapper>
    </div>
  );
};

export default SeatScheme;
