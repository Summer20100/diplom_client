export interface IHallSeats {
  id: number;
  hall_title: string;
  hall_id?: number | undefined;
  id_seat?: number | undefined;
  row?: number | undefined;
  rows?: number | undefined;
  seats?: number | undefined;
  seat?: number | null;
  seatNumber?: number;
  type?: string;
  price?: number | undefined;
  seating?: ISeating[];
}

export interface ISeating {
  row: number;
  seats: ISeat[];
}

export interface ISeat {
  seatNumber: number;
  type: string;
}

export interface IHall {
  id: number;
  hall_title: string;
}


// for seats.json

export interface ISeatType {
  id: number;
  type: string;
}