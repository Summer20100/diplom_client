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
        const { session_id: id, id_seat, check_is_buying } = ticket;
        const newCheckIsBuing = true;
        return axios.put(
          `https://diplom-server-post.onrender.com/api/hallchairs_of_sessions/${id}`,
          { id_seat: 16, check_is_buying: true }
        ).catch(err => {
          console.error(`Failed to update ticket ${id} - ${id_seat}:`, err);
        });
      });
  
      await Promise.all(updateRequests);
      console.log("All tickets processed.");
    } catch (err) {
      console.error("Error updating tickets:", err);
    }
  },  
}));
