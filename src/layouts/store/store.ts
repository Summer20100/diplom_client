import { create } from "zustand";
import { IMovieDate, IMovieInfo } from "../models/IMovieDate";
import axios from "axios";

type State = {
  data: IMovieDate[],
}

type Actions = {
  fetchData: () => Promise<void>
}

export const useMovieStore = create<State & Actions>((set) => ({
  data: [],
  fetchData: async () => {
    try {
      const response = await axios.get('src/layouts/store/data.json');
      if (response.status === 200) {
        set({ data: response.data });
      } else {
        set({ data: [] });
      }
    } catch (error: any) {
      console.error(error);
    }
  },
}));

