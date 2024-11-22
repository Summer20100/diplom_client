import { create } from "zustand";
import { IMovieDate, IMovieInfo } from "../models/IMovieDate";
import axios from "axios";

type State = {
  films: IMovieInfo[];
  filmInfo: IMovieInfo | null;
  message: string;
  saleStatus: string,
  error: string;
  title: string,
};

type Actions = {
  getFilms: () => Promise<void>;
  getFilmById: (id: number) => Promise<void>;
  createFilm: (film: IMovieInfo) => Promise<void>;
  updateFilm: (film: IMovieInfo) => Promise<void>;
  deleteFilm: (id: number) => Promise<void>;
  clearNotifications: () => void;
};

export const useFilmsStore = create<State & Actions>((set) => ({
  films: [],
  filmInfo: null,
  message: '',
  error: '',
  title: '',
  saleStatus: '',

  getFilms: async () => {
    try {
      const response = await axios.get(
        // "https://diplom-server-post.onrender.com/api/films",
        "http://localhost:3001/api/films",
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
        // `https://diplom-server-post.onrender.com/api/films/${id}`,
        `http://localhost:3001/api/films/${id}`,
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
      const responseCreateFilm = await axios.post(
        // "https://diplom-server-post.onrender.com/api/films",
        "http://localhost:3001/api/films",
        film,
      );
      if (responseCreateFilm.status === 200) {
        set({ message: responseCreateFilm.data.message });
      }
      const response = await axios.get(
        // "https://diplom-server-post.onrender.com/api/films",
        "http://localhost:3001/api/films",
      );
      if (response.status === 200) {
        set({ films: response.data });
      } else {
        set({ films: [] });
      }
    } catch (error: any) {
      console.error(error);
      set({ error: error.response.data.error, title: error.response.data.title });
    }
  },

  updateFilm: async (film: IMovieInfo) => {
    const { id } = film;
    try {
      const responseUpdateFilm = await axios.put(
        // `https://diplom-server-post.onrender.com/api/films/${id}`,
        `http://localhost:3001/api/films/${id}`,
        film,
      );
      if (responseUpdateFilm.status === 200) {
        set({ 
          message: responseUpdateFilm.data.message, 
          saleStatus: responseUpdateFilm.data.sale_status, 
        });
      };
      
      const response = await axios.get(
        // "https://diplom-server-post.onrender.com/api/films",
        "http://localhost:3001/api/films",
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
      const responseDeleteFilm = await axios.delete(
        // `https://diplom-server-post.onrender.com/api/films/${id}`,
        `http://localhost:3001/api/films/${id}`,
      );
      if (responseDeleteFilm.status === 200) {
        set({ message: responseDeleteFilm.data.message });
      };
/*       console.log("Фильм удалён успешно"); */
      const response = await axios.get(
        // "https://diplom-server-post.onrender.com/api/films",
        "http://localhost:3001/api/films",
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

  clearNotifications: () => set({ message: '', error: '', title: '', saleStatus: '' }),
}));
