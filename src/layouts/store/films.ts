import { create } from "zustand";
import { IMovieDate, IMovieInfo } from "../models/IMovieDate";
import axios from "axios";

type State = {
  films: IMovieInfo[],
}

type Actions = {
  getFilms: () => Promise<void>
}

export const useFilmsStore = create<State & Actions>((set) => ({
  films: [],
  getFilms: async () => {
    try {
      const response = await axios.get('https://diplom-server-post.onrender.com/api/films');
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

