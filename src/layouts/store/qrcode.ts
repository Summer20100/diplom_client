import { create } from "zustand";
import { IMovieDate, IMovieInfo } from "../models/IMovieDate";
import axios from "axios";

interface IQRCode {
  session_date: string;
  session_start: string;
  title: string;
  origin: string;
  duration: number;
  id_seat: number;
  row_number: number;
  seat_number: number;
  chair_type: string;
  price: string;
  hall_title: string;
}

type State = {
  qrcode: string | null;
  isLoading: boolean;
  error: string | null;
};

type Actions = {
  generateQRCode: (dataQRCode: IQRCode) => Promise<void>;
};

export const useQRCode = create<State & Actions>((set) => ({
  qrcode: null,
  isLoading: false,
  error: null,

  generateQRCode: async (dataQRCode: IQRCode) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        "https://diplom-server-post.onrender.com/api/qrcode",
        dataQRCode,
        { responseType: "blob" }
      );
      if (response.status >= 200 && response.status < 300) {
/*         const blob = await response.blob(); */
        const url = URL.createObjectURL(response.data);
        set({ qrcode: url, isLoading: false });
      } else {
        set({ qrcode: null, isLoading: false });
      }
    } catch (error: any) {
      console.error(error);
      set({ error: error.message, isLoading: false });
    }
  },
}));
