import { FC } from 'react'
import { IHallSeats } from "../../../models/IHallSeats";
import { useHallStore } from "../../../store/halls"

interface IHallSelector {
  name: string;
  hall: IHallSeats;
  // activeHall: (hall: IHallSeats) => void;
  isActive: boolean;
}

export const HallSelector: FC<IHallSelector> = ({ name, hall, isActive } ) => {
  const { setActiveHallConfig } = useHallStore();
  return (
    <li>
      <input 
        type="radio" 
        onClick={()=>{
          // activeHall(hall),
          setActiveHallConfig(hall)
        }} 
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