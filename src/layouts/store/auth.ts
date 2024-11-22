import { create } from "zustand";
import axios from "axios";
import api from "../http/index";

interface IUser {
  username: string;
  roles: string[];
}

type State = {
  message: string;
  token: string | null;
  isAuth: boolean;
  user: IUser | null;
  roles: string[];
};

type Actions = {
  fetchUserInfo: (user: IUser | null) => Promise<void>;
  registration: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuth = create<State & Actions>((set) => ({
  message: '',
  token: localStorage.getItem('token'),
  isAuth: !!localStorage.getItem('token'),
  user: null,
  roles: [],

  fetchUserInfo: async (user: IUser | null) => {
    set({ user })
  },

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
      localStorage.setItem('token', token);
      localStorage.setItem('roles', result.data.roles);
      localStorage.setItem('username', result.data.username);
      set({ 
        token, 
        message: 'Login successful', 
        isAuth: true, 
/*         user: result.data.user, */
        roles: result.data.roles
      });
      

      console.log(result.data);
    } catch (error: any) {
      set({ message: error.response?.data?.message || 'Login failed' });
      localStorage.removeItem('token');
      console.error(error);
    }
  },

  logout: async () => {
    try {
      localStorage.clear();
      set({ token: null, user: null, isAuth: false, message: 'Пользователь успешно вышел' });
      console.log('Пользователь успешно вышел');
    } catch (error: any) {
      set({ message: error.response?.data?.message || 'Ошибка выхода' });
      console.error(error);
    }
  },
}));


