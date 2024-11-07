import { create } from "zustand";
import { ISeatType } from "../models/IHallSeats";
import axios from "axios";

type State = {
  seats: ISeatType[],
}

type Actions = {
  fetchDataSeatType: () => Promise<void>
}

export const useSeatType = create<State & Actions>((set) => ({
  seats: [],
  fetchDataSeatType: async () => {
    try {
      // const response = await axios.get('https://diplom-server-post.onrender.com/api/chair');
      const response = await axios.get('http://localhost:3001/api/chair');
      if (response.status === 200) {
        set({ seats: response.data });
      } else {
        set({ seats: [] });
      }
    } catch (error: any) {
      console.error(error);
    }
  },

}));