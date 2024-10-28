import React from 'react';

interface Seat {
  id_seat: number;
  row_number: number;
  seat_number: number;
  chair_type: string;
  price: string;
  hall_title: string;
  hall_id: number;
}

interface SeatSchemeProps {
  seats: Seat[];
}

const SeatScheme: React.FC<SeatSchemeProps> = ({ seats }) => {
  // Сгруппируем места по строкам
  const rows = seats.reduce<{ [key: number]: Seat[] }>((acc, seat) => {
    if (!acc[seat.row_number]) acc[seat.row_number] = [];
    acc[seat.row_number].push(seat);
    return acc;
  }, {});

  // Функция для определения класса для стиля
  const getChairClass = (chairType: string) => {
    switch (chairType) {
      case 'vip':
        return 'buying-scheme__chair_vip';
      case 'disabled':
        return 'buying-scheme__chair_disabled';
      case 'standart':
        return 'buying-scheme__chair_standart';
      default:
        return 'buying-scheme__chair_disabled'; // default style for unknown types
    }
  };

  return (
    <div className="buying-scheme__wrapper">
      {Object.keys(rows)
        .sort((a, b) => Number(a) - Number(b))
        .map((rowNumber) => (
          <div className="buying-scheme__row" key={rowNumber}>
            {rows[Number(rowNumber)].map((seat) => (
              <span
                key={seat.id_seat}
                className={`buying-scheme__chair ${getChairClass(seat.chair_type)}`}
              ></span>
            ))}
          </div>
        ))}
    </div>
  );
};

export default SeatScheme;
