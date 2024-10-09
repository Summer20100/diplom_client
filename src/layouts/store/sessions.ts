import { create } from "zustand";
import axios from "axios";

interface ISession {
  id: number,
  hall_id: number,
  hall_title: string,
  session_date: string,
  session_start: string,
  session_finish: string
}

interface ISession {
  id: number;
  session_start: string;
  session_finish: string;
  film_id: number | null;
}

interface ISessionDay {
  session_date: string;
  session: ISession[];
}

interface ISessionsHalls {
  hall_id: number;
  hall_title: string;
  sessions: ISessionDay[];
}


type State = {
  sessions: ISession[],
  sessionById: ISession | null,
  sessionsHalls: ISessionsHalls[],
  sessionByIdHall: ISession[] | null,
}

type Actions = {
  getSessions: () => Promise<void>,
  getSessionsHalls: () => Promise<void>,
  getSessionById: (id: number) => Promise<void>,
  getSessionByIdHall: (hall_id: number) => Promise<void>,
}

export const useSessions = create<State & Actions>((set) => ({
  sessions: [],
  sessionById: null,
  sessionByIdHall: [],
  sessionsHalls: [],
  
  getSessions: async () => {
    try {
      const response = await axios.get('https://diplom-server-post.onrender.com/api/sessions');
      if (response.status === 200) {
        set({ sessions: response.data });
      } else {
        set({ sessions: [] });
      }
    } catch (error: any) {
      console.error(error);
    }
  },

  getSessionsHalls: async () => {
    try {
      const response = await axios.get('https://diplom-server-post.onrender.com/api/sessions/halls');
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
      const response = await axios.get(`https://diplom-server-post.onrender.com/api/sessions/${id}`);
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
      const response = await axios.get(`https://diplom-server-post.onrender.com/api/sessions/hall/${hall_id}`);
      if (response.status === 200) {
        set({ sessionByIdHall: response.data });
      } else {
        set({ sessionByIdHall: [] });
      }
    } catch (error: any) {
      console.error(error);
    }
  }
}));
