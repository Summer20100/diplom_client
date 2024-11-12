import { create } from "zustand";
import axios from "axios";
import api from "../http/index";

interface IUser {
  username: string;
  roles: string[];
};

type State = {
  message: string;
  token: string | null;
  isAuth: boolean;
  user: IUser | null;
};

type Actions = {
  registration: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
};

export const useAuth = create<State & Actions>((set) => ({
  message: '',
  token: localStorage.getItem('token'),
  isAuth: false,
  user: null,

  registration: async (username: string, password: string) => {
    try {
      const result = await api.post(
        /* 'http://localhost:3001/api/auth/registration', */
        'api/auth/registration',
        { username, password }
      );
      set({ message: result.data.message });
      console.log({ message: result.data.message });
    } catch (error: any) {
      set({ message: error.response?.data?.message || 'Registration failed' });
      console.error(error);
    }
  },

  login: async (username: string, password: string) => {
    try {
      const result = await api.post(
      /* 'http://localhost:3001/api/auth/login', */
      'api/auth/login',
        { username, password },
        { withCredentials: true }
      );
      const token = result.data.token;
      set({ token, message: 'Login successful' , isAuth: true, user: result.data.user});
      localStorage.setItem('token', token);
      console.log(result.data);
    } catch (error: any) {
      set({ message: error.response?.data?.message || 'Login failed' });
      localStorage.removeItem('token');
      console.error(error);
    }
  },

}));
