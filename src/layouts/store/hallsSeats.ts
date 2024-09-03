import { create } from "zustand";
import { IHallSeats } from "../models/IHallSeats";
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

type State = {
  hallsSeats: IHallChears[],
  hallsSeatsById: IHallChears[],
  delHallSeats: null,
  fetchAddHallSeats: boolean
}

type Actions = {
  fetchDataHallSeats: () => Promise<void>,
  addHallSeats: (hallSeats: IHallChears[]) => Promise<void>,
  getHallChairsById: (id: number) => Promise<IHallChears[]>,
  deleteHallSeats: (id: number) => Promise<void>,
  getHallChairInfo: ({ }: IHallChears) => void,
}

export const useHallSeats = create<State & Actions>((set) => ({
  fetchAddHallSeats: true,
  hallsSeats: [],
  hallsSeatsById: [],
  delHallSeats: null,
  fetchDataHallSeats: async () => {
    try {
      // const response = await axios.get('src/layouts/store/hallSeats.json');
      // const response = await axios.get('http://localhost:5000/api/hallchairs');
      const response = await axios.get('https://diplom-server-post.onrender.com/api/hallchairs');
      if (response.status === 200) {
        set({ hallsSeats: response.data });
      } else {
        set({ hallsSeats: [] });
      }
    } catch (error: any) {
      console.error(error);
    }
  },

  // addHallSeats: async (hallSeats: IHallChears[]) => {
  //   await axios.post('https://diplom-server-post.onrender.com/api/hallchairs', hallSeats);
  // },

  addHallSeats: async (hallSeats: IHallChears[]) => {
    set({ fetchAddHallSeats: false });
    try {
      await axios.post('https://diplom-server-post.onrender.com/api/hallchairs', hallSeats);
    } catch (error) {
      console.error("Error adding hall seats:", error);
    } finally {
      set({ fetchAddHallSeats: true });
    }
  },

  getHallChairsById: async (id: number) => {
    try {
      const response = await axios.get(`https://diplom-server-post.onrender.com/api/hallchairs/${id}`);
      if (response.status === 200) {
        set({ hallsSeatsById: response.data });
        return response.data;
      } else {
        set({ hallsSeatsById: [] });
        return [];
      }
    } catch (error: any) {
      set({ hallsSeatsById: [] });
      // console.error(error);
      return [];
    }
  },


  deleteHallSeats: async (id: number) => {
    try {
      const response = await axios.delete(`https://diplom-server-post.onrender.com/api/hallchairs/${id}`);
      if (response.status === 200) {
        set({ delHallSeats: response.data });
      } else {
        set({ delHallSeats: null });
      }
    } catch (error: any) {
      console.error(error);
    }
  },

  getHallChairInfo: (chairInfo: IHallChears) => {
    console.log(chairInfo);
    return chairInfo;
  }
}));