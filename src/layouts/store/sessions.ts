import { create } from "zustand";
import axios from "axios";

interface ISession {
  id?: number | null;
  hall_id: number;
  hall_title: string;
  session_date: string;
  session_start: string;
  session_finish: string;
  film_id: number | null;
}

interface ISessions {
  id?: number;
  session_start: string;
  session_finish: string;
  film_id: number | null;
}

interface ISessionDay {
  session_date: string;
  session: ISessions[];
}

interface ISessionsHalls {
  hall_id: number;
  hall_title: string;
  sessions: ISessionDay[];
}

type State = {
  sessions: ISession[];
  sessionById: ISession | null;
  sessionsHalls: ISessionsHalls[];
  newSession: ISession | null;
  sessionByIdHall: ISession[] | null;
};

type Actions = {
  getSessions: () => Promise<void>;
  getSessionsHalls: () => Promise<void>;
  getSessionById: (id: number) => Promise<void>;
  getSessionByIdHall: (hall_id: number) => Promise<void>;
  getNewSession: (session: ISession) => void;
  addSession: (session: ISession | null) => void;
  deleteSessionById: (id: number) => Promise<void>;
};

export const useSessions = create<State & Actions>((set) => ({
  sessions: [],
  sessionById: null,
  sessionByIdHall: [],
  sessionsHalls: [],
  newSession: null,

  getNewSession: (session: ISession) => set({ newSession: session }),

  addSession: async (session: ISession | null) => {
    try {
      const response = await axios.post(
        "https://diplom-server-post.onrender.com/api/sessions",
        session,
      );
      if (response.status === 200) {
        console.log("Сессия создана успешно");
        const getResponse = await axios.get(
          "https://diplom-server-post.onrender.com/api/sessions/halls",
        );
        if (getResponse.status === 200) {
          set({ sessionsHalls: getResponse.data });
        } else {
          console.log("Failed to fetch updated sessions list");
        }
      } else {
        console.error("Заполните все поля");
      }
    } catch (error: any) {
      console.error(error);
    }
  },

  getSessions: async () => {
    try {
      const response = await axios.get(
        "https://diplom-server-post.onrender.com/api/sessions",
      );
      if (response.status === 200) {
        set({ sessions: response.data });
      } else {
        set({ sessions: [] });
      }
    } catch (error: any) {
      console.error(error);
    }
  },

  deleteSessionById: async (id: number) => {
    try {
      const deleteResponse = await axios.delete(
        `https://diplom-server-post.onrender.com/api/sessions/${id}`,
      );
      if (deleteResponse.status === 200) {
        console.log(`Session with ID: ${id} deleted successfully`);
        const getResponse = await axios.get(
          "https://diplom-server-post.onrender.com/api/sessions/halls",
        );
        if (getResponse.status === 200) {
          set({ sessionsHalls: getResponse.data });
        } else {
          console.log("Failed to fetch updated sessions list");
        }
      } else {
        console.log(`Failed to delete session with ID: ${id}`);
      }
    } catch (error: any) {
      console.error(`Error deleting session with ID: ${id}`, error);
    }
  },

  getSessionsHalls: async () => {
    try {
      const response = await axios.get(
        "https://diplom-server-post.onrender.com/api/sessions/halls",
      );
      if (response.status === 200) {
        set({ sessionsHalls: response.data });
      } else {
        set({ sessionsHalls: [] });
      }
    } catch (error: any) {
      console.error(error);
    }
  },

  getSessionById: async (id: number) => {
    try {
      const response = await axios.get(
        `https://diplom-server-post.onrender.com/api/sessions/${id}`,
      );
      if (response.status === 200) {
        set({ sessionById: response.data });
      } else {
        set({ sessionById: null });
      }
    } catch (error: any) {
      console.error(error);
    }
  },

  getSessionByIdHall: async (hall_id: number) => {
    try {
      const response = await axios.get(
        `https://diplom-server-post.onrender.com/api/sessions/hall/${hall_id}`,
      );
      if (response.status === 200) {
        set({ sessionByIdHall: response.data });
      } else {
        set({ sessionByIdHall: [] });
      }
    } catch (error: any) {
      console.error(error);
    }
  },
}));
