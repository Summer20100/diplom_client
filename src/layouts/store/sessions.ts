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
};

interface ISessions {
  id?: number;
  session_start: string;
  session_finish: string;
  film_id?: number | null;
};

interface ISessionDay {
  session_date: string;
  session: ISessions[];
};

interface ISessionsHalls {
  hall_id: number;
  hall_title: string;
  sessions: ISessionDay[];
};

interface IHall {
  hall_id: number;
  hall_title: string;
  sessions: ISessions[];
};

interface IFilm {
  film_id: number;
  halls: IHall[];
};

interface ISessionsByDate {
  session_date: string;
  films: IFilm[];
};

interface IHallchairsOfSessionsByIdSession {
  id_seat: number,
  row_number: number,
  seat_number: number,
  chair_type: string,
  price: string,
  hall_title: string,
  hall_id: number,
  session_id: number,
  check_is_buying: boolean,
};

type State = {
  sessions: ISession[];
  sessionById: ISession | null;
  sessionsHalls: ISessionsHalls[];
  newSession: ISession | null;
  sessionByIdHall: ISession[] | null;
  sessionForUpdate: ISession | null;
  sessionsByDate: ISessionsByDate[] |null;
  message: string | null;
  error: string | null;
  hallchairsOfSessionsByIdSession: IHallchairsOfSessionsByIdSession[] | null;
};

type Actions = {
  getSessions: () => Promise<void>;
  getSessionsHalls: () => Promise<void>;
  getSessionById: (id: number) => Promise<void>;
  getHallchairsOfSessionsByIdSession: (session_id: number) => Promise<void>;
  getSessionByIdHall: (hall_id: number) => Promise<void>;
  getSessionsByDate: () => Promise<void>;
  getNewSession: (session: ISession) => void;
  getSessionForUpdate: (session: ISession) => void;
  addSession: (session: ISession | null) => void;
  updateSession: (session: ISession | null) => void;
  deleteSessionById: (id: number) => Promise<void>;
};

export const useSessions = create<State & Actions>((set) => ({
  sessions: [],
  sessionById: null,
  hallchairsOfSessionsByIdSession: [],
  sessionByIdHall: [],
  sessionsHalls: [],
  newSession: null,
  sessionForUpdate: null,
  sessionsByDate: [],
  message: null,
  error: null,

  getNewSession: (session: ISession) => set({ newSession: session }),

  getSessionsByDate: async () => {
    try {
      const response = await axios.get(
        // "https://diplom-server-post.onrender.com/api/sessions/date",
        "http://localhost:3001/api/sessions/date",
      );
      if (response.status === 200) {
        set({ sessionsByDate: response.data });
      } else {
        set({ sessionsByDate: [] });
      }
    } catch (error: any) {
      console.error(error);
    }
  },


  getHallchairsOfSessionsByIdSession: async (session_id: number) => {
    try {
      // const response = await axios.get(`https://diplom-server-post.onrender.com/api/hallchairs_of_sessions/${session_id}`);
      const response = await axios.get(`http://localhost:3001/api/hallchairs_of_sessions/${session_id}`);
      if (response.status === 200) {
        set({ hallchairsOfSessionsByIdSession: response.data });
      } else {
        set({ message: "Session does not exist" });
        console.log("Session does not exist");
      }
    } catch (err: any) {
      console.error(err.response.data.message);
    }
  },

  getSessionForUpdate: (session: ISession) => set({ sessionForUpdate: session }),

  addSession: async (session: ISession | null) => {
    try {
      const hall_id = session?.hall_id;
      const responseHallchairs = await axios.get(
        // `https://diplom-server-post.onrender.com/api/hallchairs/${hall_id}`
        `http://localhost:3001/api/hallchairs/${hall_id}`
      );
  
      const response = await axios.post(
        // "https://diplom-server-post.onrender.com/api/sessions",
        "http://localhost:3001/api/sessions",
        session
      );
  
      if (responseHallchairs.status === 200 && response.status === 200) {
        const id = response.data.session_id;
  
        const hallchairs_of_sessions = [];
        if (responseHallchairs.data.length > 0) {
          for (let hallchair of responseHallchairs.data) {
            hallchairs_of_sessions.push({ ...hallchair, session_id: id });
          }
        }
  
        if (hallchairs_of_sessions.length > 0) {
          const responseHallchairs_of_sessions = await axios.post(
            // `https://diplom-server-post.onrender.com/api/hallchairs_of_sessions`,
            `http://localhost:3001/api/hallchairs_of_sessions`,
            hallchairs_of_sessions
          );
  
          if (responseHallchairs_of_sessions.status === 200) {
            console.log("Сессия создана успешно");
            set({ message: response.data.message });
          } else {
            console.error("Ошибка при создании hallchairs_of_sessions:", responseHallchairs_of_sessions.data);
          }
        }
  
        const getResponse = await axios.get(
          // "https://diplom-server-post.onrender.com/api/sessions/halls"
          "http://localhost:3001/api/sessions/halls"
        );
        if (getResponse.status === 200) {
          set({ sessionsHalls: getResponse.data });
        } else {
          console.log("Failed to fetch updated sessions list");
        }
  
        const getResponseSessions = await axios.get(
          // "https://diplom-server-post.onrender.com/api/sessions/"
          "http://localhost:3001/api/sessions/"
        );
        if (getResponseSessions.status === 200) {
          set({ sessions: getResponseSessions.data });
        } else {
          console.log("Failed to fetch updated sessions list");
        }
      } else {
        console.error("Заполните все поля");
        set({ message: response.data });
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Ошибка при добавлении сессии:", error.response.data.message);
        set({ message: error.response.data.message });
      } else {
        console.error("Ошибка:", error.message);
      }
    }
  },
  
  getSessions: async () => {
    try {
      const response = await axios.get(
        // "https://diplom-server-post.onrender.com/api/sessions",
        "http://localhost:3001/api/sessions",
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
        const response = await axios.put(
          // `https://diplom-server-post.onrender.com/api/sessions/${result.id}`,
          `http://localhost:3001/api/sessions/${result.id}`,
          session,
        );
        if (response.status === 200) {
          console.log("Сессия обновлена успешно");
          set({ message: response.data.message });
          const getResponse = await axios.get(
            // "https://diplom-server-post.onrender.com/api/sessions/halls",
            "http://localhost:3001/api/sessions/halls",
          );
          if (getResponse.status === 200) {
            set({ sessionsHalls: getResponse.data });
          } else {
            console.log("Failed to fetch updated sessions list");
          }
          const getResponseSessions = await axios.get(
            // "https://diplom-server-post.onrender.com/api/sessions/",
            "http://localhost:3001/api/sessions/",
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
        // `https://diplom-server-post.onrender.com/api/sessions/${id}`,
        `http://localhost:3001/api/sessions/${id}`,
      );
      if (deleteResponse.status === 200) {
        console.log(`Session with ID: ${id} deleted successfully`);
        set({ message: deleteResponse.data.message });
        const getResponseSessionsHalls = await axios.get(
          // "https://diplom-server-post.onrender.com/api/sessions/halls",
          "http://localhost:3001/api/sessions/halls",
        );
        const getResponseSessions = await axios.get(
          // "https://diplom-server-post.onrender.com/api/sessions/",
          "http://localhost:3001/api/sessions/",
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
        // "https://diplom-server-post.onrender.com/api/sessions/halls",
        "http://localhost:3001/api/sessions/halls",
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
        // `https://diplom-server-post.onrender.com/api/sessions/${id}`,
        `http://localhost:3001/api/sessions/${id}`,
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
        // `https://diplom-server-post.onrender.com/api/sessions/hall/${hall_id}`,
        `http://localhost:3001/api/sessions/hall/${hall_id}`,
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
