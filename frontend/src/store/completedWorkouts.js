import { create } from "zustand";

export const useCompleteWorkoutsStore = create((set) => ({
  completedWorkouts: [],

  setCompletedWorkouts: (completedWorkouts) => set({ completedWorkouts }),

  fetchCompletedWorkouts: async () => {
    try {
      const res = await fetch("/api/completedWorkouts", {
        credentials: "include",
      });

      const data = await res.json();

      set({ completedWorkouts: data.data });
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  saveCompletedWorkout: async (completedWorkout) => {
    try {
      const res = await fetch("/api/completedWorkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(completedWorkout),
      });
      const data = await res.json();

      set((state) => ({
        completedWorkouts: [...state.completedWorkouts, data.data],
      }));

      return {
        success: true,
        message: "Completed workout saved to history",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
}));
