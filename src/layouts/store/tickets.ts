import { create } from "zustand";
import axios from "axios";

interface ISeat {
  id_seat: number;
  row_number: number;
  seat_number: number;
  chair_type: string;
  price: string;
  hall_title: string;
  hall_id: number;
  session_id: number;
  check_is_buying: boolean;
};

type State = {
  ticketsForBuying: ISeat[] | null;
};

type Actions = {
  createTicketForBuying: (tickets: ISeat[]) => Promise<void>;
  updateTicketForBuying: (tickets: ISeat[]) => Promise<void>;
};

export const useTickets = create<State & Actions>((set) => ({
  ticketsForBuying: [],

  createTicketForBuying: async (tickets: ISeat[]) => {
    set({ ticketsForBuying: tickets });
  },

  updateTicketForBuying: async (tickets: ISeat[]) => {
    set({ ticketsForBuying: tickets });
    try {
      const updateRequests = tickets.map(ticket => {
        const { session_id: id, id_seat } = ticket;
        const newTicket = {
          id_seat,
          check_is_buying: true
        }
        const newCheckIsBuing = true;
        return axios.put(
          // `https://diplom-server-post.onrender.com/api/hallchairs_of_sessions/${id}`,
          `http://localhost:3001/api/hallchairs_of_sessions/${id}`,
          newTicket
        ).catch(err => {
          console.error(`Failed to buy tickets ${id} - ${id_seat}:`, err);
        });
      });

      console.log("All tickets bought");
    } catch (err) {
      console.error("Error buying tickets:", err);
    }
  },  
}));
