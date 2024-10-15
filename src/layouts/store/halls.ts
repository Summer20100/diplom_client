import { create } from "zustand";
import { IHallSeats } from "../models/IHallSeats";
import axios from "axios";

type State = {
  halls: IHallSeats[];
  delHall: IHallSeats | null;
};

type Actions = {
  fetchDataHallSeats: () => Promise<void>;
  deleteHall: (id: number) => Promise<void>;
  createHall: (hall_name: Object) => Promise<void>;
};

export const useHallStore = create<State & Actions>((set) => ({
  halls: [],
  delHall: null,
  createHall: async (hall_name: Object) => {
    try {
      await axios.post(
        "https://diplom-server-post.onrender.com/api/hall",
        hall_name,
      );
      const response = await axios.get(
        "https://diplom-server-post.onrender.com/api/hall",
      );
      if (response.status === 200) {
        set({ halls: response.data });
      }
    } catch (error: any) {
      console.error(error);
    }
  },
  fetchDataHallSeats: async () => {
    try {
      const response = await axios.get(
        "https://diplom-server-post.onrender.com/api/hall",
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
        `https://diplom-server-post.onrender.com/api/hall/${id}`,
      );
      if (response.status === 200) {
        await axios.get(
          "https://diplom-server-post.onrender.com/api/sessions/halls",
        );
        set((state) => ({
          halls: state.halls.filter((hall) => hall.id !== id),
          delHall: response.data,
        }));
      }
    } catch (error: any) {
      console.error(error);
    }
  },
}));
