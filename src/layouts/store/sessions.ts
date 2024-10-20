import { create } from "zustand";
import axios from "axios";

interface ISession {
  id?: number | null;
  hall_id: number | null;
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
  sessionForUpdate: ISession | null;
};

type Actions = {
  getSessions: () => Promise<void>;
  getSessionsHalls: () => Promise<void>;
  getSessionById: (id: number) => Promise<void>;
  getSessionByIdHall: (hall_id: number) => Promise<void>;
  getNewSession: (session: ISession) => void;
  getSessionForUpdate: (session: ISession) => void;
  addSession: (session: ISession | null) => void;
  updateSession: (session: ISession | null) => void;
  deleteSessionById: (id: number) => Promise<void>;
};

export const useSessions = create<State & Actions>((set) => ({
  sessions: [],
  sessionById: null,
  sessionByIdHall: [],
  sessionsHalls: [],
  newSession: null,
  sessionForUpdate: null,

  getNewSession: (session: ISession) => set({ newSession: session }),

  getSessionForUpdate: (session: ISession) => set({ sessionForUpdate: session }),

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
        const getResponseSessions = await axios.get(
          "https://diplom-server-post.onrender.com/api/sessions/",
        );
        if (getResponseSessions.status === 200) {
          set({ sessions: getResponseSessions.data });
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

  updateSession: async (session: ISession | null) => {
    try {
      const result = session ? { id: session.id } : 0;
      if (result !== 0) {
        console.log(result.id);
        const response = await axios.put(
          `https://diplom-server-post.onrender.com/api/sessions/${result.id}`,
          session,
        );
        if (response.status === 200) {
          console.log("Сессия обновлена успешно");
          const getResponse = await axios.get(
            "https://diplom-server-post.onrender.com/api/sessions/halls",
          );
          if (getResponse.status === 200) {
            set({ sessionsHalls: getResponse.data });
          } else {
            console.log("Failed to fetch updated sessions list");
          }
          const getResponseSessions = await axios.get(
            "https://diplom-server-post.onrender.com/api/sessions/",
          );
          if (getResponseSessions.status === 200) {
            set({ sessions: getResponseSessions.data });
          } else {
            console.log("Failed to fetch updated sessions list");
          }
        } else {
          console.error("Сессия не обновлена");
        }
      } else {
        console.log("No session for update");
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
        const getResponseSessionsHalls = await axios.get(
          "https://diplom-server-post.onrender.com/api/sessions/halls",
        );
        const getResponseSessions = await axios.get(
          "https://diplom-server-post.onrender.com/api/sessions/",
        );
        if (getResponseSessions.status === 200) {
          set({ sessions: getResponseSessions.data });
        } else {
          console.log("Failed to fetch updated sessions list");
        }
        if (getResponseSessionsHalls.status === 200) {
          set({ sessionsHalls: getResponseSessionsHalls.data });
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

  getSessionById: async (id: number | null ) => {
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
