import { create } from "zustand";
import { IMovieDate, IMovieInfo } from "../models/IMovieDate";
import axios from "axios";

type State = {
  films: IMovieInfo[],
}

type Actions = {
  fetchDataFilms: () => Promise<void>
}

export const useFilmsStore = create<State & Actions>((set) => ({
  films: [],
  fetchDataFilms: async () => {
    try {
      const response = await axios.get('src/layouts/store/films.json');
      if (response.status === 200) {
        set({ films: response.data });
      } else {
        set({ films: [] });
      }
    } catch (error: any) {
      console.error(error);
    }
  },
}));

