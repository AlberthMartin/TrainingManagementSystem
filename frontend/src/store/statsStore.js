import { create } from "zustand";

export const useStatsStore = create((set) => ({
  weeklyVolume: [],
  loading: false,

  fetchWeeklyVolume: async () => {
    try {
      set({ loading: true });
      const res = await fetch("/api/stats/weekly-volume", {
        credentials: "include"
      });
      const data = await res.json()

      set({weeklyVolume: data.data})
      console.log(weeklyVolume)
      return{ success: true, message: weeklyVolume}
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
}));
