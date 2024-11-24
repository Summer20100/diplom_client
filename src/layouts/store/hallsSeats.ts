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

interface IPrice {
  type: string;
  price: number;
  id: number
}

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
  hallsSeats: IHallChears[],
  hallsSeatsByIdHallConfig: IHallChears[],
  hallsSeatsById: IHallChears[],
  delHallSeats: null,
  fetchAddHallSeats: boolean,
  message: string,
  error: string,
  messagePrice: string[],
  errorPrice: string[],
};

type Actions = {
  fetchDataHallSeats: () => Promise<void>,
  addHallSeats: (hallSeats: IHallChears[]) => Promise<void>,
  getHallChairsByIdHallConfig: (id: number) => Promise<IHallChears[]>,
  getHallChairsById: (id: number) => Promise<IHallChears[]>,
  deleteHallSeats: (id: number) => Promise<void>,
  getHallChairInfo: ({ }: IHallChears) => void,
  updateHallSeat: (infoHallChearsForUpdate: IHallChearsForUpdate) => Promise<void>;
  updatePriceHallSeats: (price: IPrice[]) => Promise<void>,
  clearNotifications: () => void,
}

export const useHallSeats = create<State & Actions>((set) => ({
  fetchAddHallSeats: true,
  hallsSeats: [],
  hallsSeatsByIdHallConfig: [],
  hallsSeatsById: [],
  delHallSeats: null,
  message: '',
  error: '',
  messagePrice: [],
  errorPrice: [],

  fetchDataHallSeats: async () => {
    try {
      // const response = await axios.get('https://diplom-server-post.onrender.com/api/hallchairs');
      const response = await axios.get('http://localhost:3001/api/hallchairs');
      if (response.status === 200) {
        set({ hallsSeats: response.data });
      } else {
        set({ hallsSeats: [] });
      }
    } catch (error: any) {
      console.error(error);
    }
  },

/*   addHallSeats: async (hallSeats: IHallChears[]) => {
    set({ fetchAddHallSeats: false });
    try {
      // await axios.post('https://diplom-server-post.onrender.com/api/hallchairs', hallSeats);
      const response = await axios.post('http://localhost:3001/api/hallchairs', hallSeats);
      set({ message: response.data.message });
    } catch (error) {
      console.error("Error adding hall seats:", error);
      set({ error: error.response.data.error});
    } finally {
      set({ fetchAddHallSeats: true });
    }
  },
 */

  addHallSeats: async (hallSeats: IHallChears[]) => {
    set({ fetchAddHallSeats: false });
    try {
      // await axios.post('https://diplom-server-post.onrender.com/api/hallchairs', hallSeats);
      const response = await axios.post('http://localhost:3001/api/hallchairs', hallSeats);
      set({ message: response.data.message });
    } catch (error: any) {
      console.error("Error adding hall seats:", error);
      set({ error: error.response?.data?.error });
    } finally {
      set({ fetchAddHallSeats: true });
    }
  },

  clearNotifications: () => set({ message: '', error: '' }),

  updateHallSeat: async (infoHallChearsForUpdate: IHallChearsForUpdate) => {
    const { hall_id : id, id_seat : seat, chair_type : type } = infoHallChearsForUpdate;
    try {
      // const response = await axios.put(`https://diplom-server-post.onrender.com/api/hallchairs/${id}?seat=${seat}`, {
      const response = await axios.put(`http://localhost:3001/api/hallchairs/${id}?seat=${seat}`, {
        chair_type: type,
      });
      if (response.status === 200) {
        set({ message: response.data.message  });
        console.log(response.data.message);
      }
    } catch (error: any) {
      console.error(error);
      set({error: error.response.data.error});
    }
  },

  updatePriceHallSeats: async (priceForUpdate: IPrice[]) => {
    try {
      const updatePromises = priceForUpdate.map(async (newPrice) => {
        const { id, price, type } = newPrice;
        try {
          // const response = await axios.put(`https://diplom-server-post.onrender.com/api/hallchairs/${id}?type=${type}`, { price });
          const response = await axios.put(`http://localhost:3001/api/hallchairs/${id}?type=${type}`, { price });
          if (response.status === 200) {
            console.log(`Стоимость места типа "${type}" обновлена успешно`);
            set({ message: response.data.message  });
          } else {
            console.error(`Стоимость места типа "${type}" не обновлена`);
            set({error: response.data.error});
          }
        } catch (error: any) {
          console.error(`Стоимость места типа "${type}" не обновлена`);
          set({error: error.response.data.error });
        }
      });
      await Promise.all(updatePromises);
    } catch (err: any) {
      console.error("Ошибка на сервере", err);
      set({error: err?.response?.data.error });
    }
  },

  getHallChairsByIdHallConfig: async (id: number) => {
    try {
      // const response = await axios.get(`https://diplom-server-post.onrender.com/api/hallchairs/${id}`);
      const response = await axios.get(`http://localhost:3001/api/hallchairs/${id}`);
      if (response.status === 200) {
        set({ hallsSeatsByIdHallConfig: response.data });
        return response.data;
      } else {
        set({ hallsSeatsByIdHallConfig: [] });
        return [];
      }
    } catch (error: any) {
      set({ hallsSeatsByIdHallConfig: [] });
      // console.error(error);
      return [];
    }
  },

  getHallChairsById: async (id: number) => {
    try {
      // const response = await axios.get(`https://diplom-server-post.onrender.com/api/hallchairs/${id}`);
      const response = await axios.get(`http://localhost:3001/api/hallchairs/${id}`);
      if (response.status === 200) {
        set({ hallsSeatsById: response.data });
        return response.data;
      } else {
        set({ hallsSeatsById: [] });
        return [];
      }
    } catch (error: any) {
      set({ hallsSeatsByIdHallConfig: [] });
      // console.error(error);
      return [];
    }
  },

  deleteHallSeats: async (id: number) => {
    try {
      // const response = await axios.delete(`https://diplom-server-post.onrender.com/api/hallchairs/${id}`);
      const response = await axios.delete(`http://localhost:3001/api/hallchairs/${id}`);
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