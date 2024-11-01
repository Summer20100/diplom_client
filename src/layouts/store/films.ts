import { create } from "zustand";
import { IMovieDate, IMovieInfo } from "../models/IMovieDate";
import axios from "axios";

type State = {
  films: IMovieInfo[];
  filmInfo: IMovieInfo | null;
/*   filmsFetch: IMovieInfo[], */
};

type Actions = {
  getFilms: () => Promise<void>;
  getFilmById: (id: number) => Promise<void>;
  createFilm: (film: IMovieInfo) => Promise<void>;
  updateFilm: (film: IMovieInfo) => Promise<void>;
  deleteFilm: (id: number) => Promise<void>;
/*   fetchDataFilms: () => Promise<void> */
};

export const useFilmsStore = create<State & Actions>((set) => ({
  films: [],
  filmInfo: null,
/*   filmsFetch: [], */

/*   fetchDataFilms: async () => {
    try {
      const response = await axios.get('./store/films.json');
      if (response.status === 200) {
        set({ filmsFetch: response.data });
      } else {
        set({ filmsFetch: [] });
      }
    } catch (error: any) {
      console.error(error);
    }
  }, */

  getFilms: async () => {
    try {
      const response = await axios.get(
        "https://diplom-server-post.onrender.com/api/films",
      );
      if (response.status === 200) {
        set({ films: response.data });
      } else {
        set({ films: [] });
      }
    } catch (error: any) {
      console.error(error);
    }
  },

  getFilmById: async (id: number | null) => {
    try {
      const response = await axios.get(
        `https://diplom-server-post.onrender.com/api/films/${id}`,
      );
      if (response.status === 200) {
        set({ filmInfo: response.data });
      } else {
        set({ filmInfo: null });
      }
    } catch (error: any) {
      console.error(error);
    }
  },

  createFilm: async (film: IMovieInfo) => {
    try {
      await axios.post(
        "https://diplom-server-post.onrender.com/api/films",
        film,
      );
      const response = await axios.get(
        "https://diplom-server-post.onrender.com/api/films",
      );
      if (response.status === 200) {
        set({ films: response.data });
      } else {
        set({ films: [] });
      }
    } catch (error: any) {
      console.error(error);
    }
  },

  updateFilm: async (film: IMovieInfo) => {
    const { id } = film;
    try {
      await axios.put(
        `https://diplom-server-post.onrender.com/api/films/${id}`,
        film,
      );
      const response = await axios.get(
        "https://diplom-server-post.onrender.com/api/films",
      );
      if (response.status === 200) {
        set({ films: response.data });
      } else {
        set({ films: [] });
      }
    } catch (error: any) {
      console.error(error);
    }
  },

  deleteFilm: async (id: number) => {
    try {
      await axios.delete(
        `https://diplom-server-post.onrender.com/api/films/${id}`,
      );
      console.log("Фильм удалён успешно");
      const response = await axios.get(
        "https://diplom-server-post.onrender.com/api/films",
      );
      if (response.status === 200) {
        set({ films: response.data });
      } else {
        set({ films: [] });
      }
    } catch (error: any) {
      console.error("Ошибка при удалении фильма:", error);
    }
  },
}));
