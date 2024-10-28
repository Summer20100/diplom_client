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

interface IPrice {
  type: string;
  price: number;
  id: number
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
  updatePriceHallSeats: (price: IPrice[]) => Promise<void>,
}

export const useHallSeats = create<State & Actions>((set) => ({
  fetchAddHallSeats: true,
  hallsSeats: [],
  hallsSeatsById: [],
  delHallSeats: null,

  fetchDataHallSeats: async () => {
    try {
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

  updatePriceHallSeats: async (priceForUpdate: IPrice[]) => {
    try {
      const updatePromises = priceForUpdate.map(async (newPrice) => {
        const { id, price, type } = newPrice;
        try {
          const response = await axios.put(`https://diplom-server-post.onrender.com/api/hallchairs/${id}?type=${type}`, { price });
          if (response.status === 200) {
            console.log(`Price updated successfully for hall_id: ${id}`);
          } else {
            console.error(`Failed to update price for hall_id: ${id}, status: ${response.status}`);
          }
        } catch (error) {
          console.error(`Error updating price for hall_id: ${id}: `, error);
        }
      });
      await Promise.all(updatePromises);
    } catch (error) {
      console.error("Error in price updating: ", error);
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