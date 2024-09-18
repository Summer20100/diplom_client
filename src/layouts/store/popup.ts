import { create } from "zustand";
import axios from "axios";

interface IHallChears {
  id_seat: number,
  hall_id: number,
  hall_title: string,
  row_number: number,
  seat_number: number,
  chair_type: string,
  price: number,
}

interface IHallChearsForUpdate {
  id_seat: number,
  hall_id: number,
  chair_type: string,
}


type State = {
  hallsSeat: IHallChears | null;
  infoHallChearsForUpdate: IHallChearsForUpdate | null;
  popupIsOpen: boolean;
  popupIsClose: boolean;
};

type Actions = {
  getHallSeat: (hallsSeat: IHallChears) => Promise<void>;
  updateHallSeat: (infoHallChearsForUpdate: IHallChearsForUpdate) => Promise<void>;
  popupHallConfigOpen: () => void;
  popupHallConfigClose: () => void;
};

export const usePopup = create<State & Actions>((set) => ({
  hallsSeat: null,
  infoHallChearsForUpdate: null,
  popupIsOpen: false,
  popupIsClose: false,

  getHallSeat: async (hallsSeat: IHallChears) => {
    set({ hallsSeat });
  },

  updateHallSeat: async (infoHallChearsForUpdate: IHallChearsForUpdate) => {
    const { hall_id : id, id_seat : seat, chair_type : type } = infoHallChearsForUpdate;
    try {
      const response = await axios.put(`https://diplom-server-post.onrender.com/api/hallchairs/${id}?seat=${seat}`, {
        chair_type: type,
      });
      if (response.status === 200) {
        console.log(response.data.message)
      }
    } catch (error: any) {
      console.error(error);
    }
  },
  
  popupHallConfigOpen: () => {
    set({ popupIsOpen: true, popupIsClose: false });
  },

  popupHallConfigClose: () => {
    set({ popupIsOpen: false, popupIsClose: true });
  },
}));
