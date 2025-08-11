import { create } from "zustand";

export const useStatsStore = create((set) => ({
  weeklyVolume: [],
  weeklySets: [],
  loading: false,

  fetchWeeklyVolume: async () => {
    try {
      set({ loading: true });
      const res = await fetch("/api/stats/weekly-volume", {
        credentials: "include"
      });
      const data = await res.json()

      set({weeklyVolume: data.data})
      set({ loading: false });
      return{ success: true, message: weeklyVolume}
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  fetchWeeklySets: async () => {
    try {
      set({ loading: true });
      const res = await fetch("/api/stats/weekly-sets", {
        credentials: "include"
      });
      const data = await res.json()

      set({weeklySets: data.data})
      set({ loading: false });
      return{ success: true, message: weeklySets}
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
}));
