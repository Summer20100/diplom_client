import { create } from "zustand";
import { IHallSeats } from "../models/IHallSeats";
import axios from "axios";

type HallName = {
  name: string;
};

type State = {
  halls: IHallSeats[];
  delHall: IHallSeats | null;
  message: string;
  error: string;
  activeHallConfig: IHallSeats | null; // Состояние для HallConfig
  activeHallPrice: IHallSeats | null;  // Состояние для PriceConfig
};

type Actions = {
  fetchDataHallSeats: () => Promise<void>;
  deleteHall: (id: number) => Promise<void>;
  createHall: (hall_name: string) => Promise<void>;
  clearNotifications: () => void;
  setActiveHallConfig: (hall: IHallSeats | null) => void;
  setActiveHallPrice: (hall: IHallSeats | null) => void;
};

export const useHallStore = create<State & Actions>((set) => ({
  halls: [],
  delHall: null,
  message: '',
  error: '',
  activeHallConfig: null,
  activeHallPrice: null,
  
  createHall: async (hall_name: string) => {
    try {
      const responseHall = await axios.post(
        // `https://diplom-server-post.onrender.com/api/hall`,
        "http://localhost:3001/api/hall",
        hall_name,
      );
      const response = await axios.get(
        // `https://diplom-server-post.onrender.com/api/hall`,
        "http://localhost:3001/api/hall",
      );
      set({
        halls: response.data,
        message: responseHall.data.message,
        error: '',
      });
    } catch (error: any) {
      console.error(error);
      set({
        error: error.response?.data?.error || 'An error occurred',
        message: '',
      });
    }
  },

  fetchDataHallSeats: async () => {
    try {
      const response = await axios.get(
        // `https://diplom-server-post.onrender.com/api/hall`,
        "http://localhost:3001/api/hall",
      );
      if (response.status === 200) {
        set({ halls: response.data });
      } else {
        set({ halls: [] });
      }
    } catch (error: any) {
      console.error(error);
    }
  },

  deleteHall: async (id: number) => {
    try {
      const response = await axios.delete(
        // `https://diplom-server-post.onrender.com/api/hall/${id}`,
        `http://localhost:3001/api/hall/${id}`,
      );
      await axios.get(
        // "https://diplom-server-post.onrender.com/api/sessions/halls",
        "http://localhost:3001/api/sessions/halls",
      );
      if (response.status === 200) {
        set((state) => ({
          halls: state.halls.filter((hall) => hall.id !== id),
          delHall: response.data,
          message: response.data.message,
        }));
      }
    } catch (error: any) {
      console.error(error);
      set({error: error.response.data.error});
    }
  },

  clearNotifications: () => set({ message: '', error: '' }),

  setActiveHallConfig: (hall) => set({ activeHallConfig: hall }),
  
  setActiveHallPrice: (hall) => set({ activeHallPrice: hall }),
}));