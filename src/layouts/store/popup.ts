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
  namePopup: string;
  message: string;
  infoHallChearsForUpdate: IHallChearsForUpdate | null;
  popupIsOpen: boolean;
  popupIsClose: boolean;
};

type Actions = {
  getHallSeat: (hallsSeat: IHallChears) => Promise<void>;
  updateHallSeat: (infoHallChearsForUpdate: IHallChearsForUpdate) => Promise<void>;
  popupConfigOpen: (name: string) => void;
  popupConfigClose: () => void;
};

export const usePopup = create<State & Actions>((set) => ({
  hallsSeat: null,
  namePopup: '',
  message: '',
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
        set({ message: response.data.message + " hall_id:" + id + " seat:" + seat + " type:" + type });
      }
    } catch (error: any) {
      console.error(error);
    }
  },
  
  popupConfigOpen: (name: string) => {
    set({ popupIsOpen: true, popupIsClose: false,  namePopup: name });
  },

  popupConfigClose: () => {
    set({ popupIsOpen: false, popupIsClose: true, namePopup: '' });
  },
}));
