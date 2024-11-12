import { create } from "zustand";
import api from "../http/index";

interface IUser {
  username: string;
  password: string;
  roles: string[];
}

type State = {
  users: IUser[];
  message: string;
  isValid: boolean;
};

type Actions = {
  getUsers: () => Promise<void>;
  setUsers: (users: IUser[]) => void;
};

export const useUser = create<State & Actions>((set) => ({
  users: [],
  message: '',
  isValid: false,

  getUsers: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        set({ users: [], isValid: false, message: "Токен отсутствует" });
        return;
      }
      const response = await api.get<IUser[]>('api/auth/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ users: response.data, isValid: true });
      console.log("Users loaded:", response.data);
    } catch (error) {
      set({ users: [], isValid: false, message: "Не удалось загрузить пользователей" });
      //console.error("Failed to fetch users:", error);
    }
  },

  setUsers: (users: IUser[]) => set({ users }), // Установка пользователей без изменения isValid
}));
