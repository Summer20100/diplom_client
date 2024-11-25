import { FC } from 'react'
import { IHallSeats } from "../../../models/IHallSeats";
import { useHallStore } from "../../../store/halls"

interface IHallSelector {
  name: string;
  hall: IHallSeats;
  // activeHall: (hall: IHallSeats) => void;
  isActive: boolean;
  onSelect: () => void;
}

export const HallSelector: FC<IHallSelector> = ({ name, hall, isActive, onSelect  } ) => {
  const { setActiveHallConfig } = useHallStore();
  return (
    <li>
      <input 
        type="checkbox"
        onClick={()=>{
          // activeHall(hall),
          // setActiveHallConfig(hall);
          onSelect();
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