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
  deleteCompletedWorkout: async (id) => {
    try {
      const res = await fetch(`/api/completedWorkouts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to delete completed workout");
      }

      set((state) => ({
        completedWorkouts: state.completedWorkouts.filter(
          (workout) => workout._id !== id
        ),
      }));

      return {
        success: true,
        message: "Completed workout deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
  updateCompletedWorkout: async (id, updatedCompletedWorkout) => {
    try {
      const res = await fetch(`/api/completedWorkouts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedCompletedWorkout),
      });

      if (!res.ok) {
        throw new Error("Failed to update completed workout.");
      }

      const data = await res.json();

      set((state) => ({
        completedWorkouts: state.completedWorkout.map((workout) =>
          workout._id === id ? data.data : workout
        ),
      }));
      return {
        success: true,
        completedWorkout: data,
        message: "Completed workout updated successfully.",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
}));
