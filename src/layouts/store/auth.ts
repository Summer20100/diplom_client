import { create } from "zustand";
import axios from "axios";

type State = {
  message: string;
  token: string | null;
};

type Actions = {
  login: (username: string, password: string) => Promise<void>;
};

export const useAuth = create<State & Actions>((set) => ({
  message: '',
  token: null,

  login: async (username: string, password: string) => {
    try {
      const result = await axios.post(
        'http://localhost:3001/api/auth/login',
        { username, password },
        { withCredentials: true }
      );

      const token = result.data.token;
      set({ token, message: 'Login successful' });

      localStorage.setItem('token', token);

      console.log(result);
    } catch (error: any) {
      set({ message: error.response?.data?.message || 'Login failed' });
      localStorage.removeItem('token');
      console.error(error);
    }
  },
}));
