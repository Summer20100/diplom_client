import { FC } from 'react'
import { IHallSeats } from "../../../models/IHallSeats";

interface IHallSelector {
  name: string;
  hall: IHallSeats;
  activeHall: (hall: IHallSeats) => void;
  isActive: boolean;
}

export const HallSelector: FC<IHallSelector> = ({ name, hall, activeHall, isActive } ) => {
  return (
    <li>
      <input 
        type="radio" 
        onClick={()=>activeHall(hall)} 
        className="conf-step__radio" 
        name="chairs-hall" 
        value={ name }
        checked={ isActive }
        readOnly
      />
      <span className="conf-step__selector">{ name }</span>
    </li>
  )
}

export default HallSelector