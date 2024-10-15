import { FC } from "react";

interface IHall {
  name: string;
  id: number;
  deleteHall: (id: number) => void;
  deleteHallSeats: (id: number) => void;
}

const Hall: FC<IHall> = ({ name, id, deleteHall, deleteHallSeats }) => {
  const delItm = (id: number) => {
    deleteHall(id);
    deleteHallSeats(id);
  };

  return (
    <li>
      {name}
      <button
        onClick={() => delItm(id)}
        className="conf-step__button conf-step__button-trash"
        style={{ marginLeft: "5px" }}
      ></button>
    </li>
  );
};
export default Hall;
