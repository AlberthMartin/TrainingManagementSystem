import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useActiveWorkoutStore = create(
  persist(
    (set, get) => ({
      activeWorkout: null, //currently logged workout
      workoutStartTime: null,

      setActiveWorkout: (workout) => {
        const now = Date.now();
        set({
          activeWorkout: workout,
          workoutStartTime: now,
        });
      },

      setActiveWorkoutById: async (id) => {
        const res = await fetch(`/api/workouts/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        const now = Date.now();

        set({
          activeWorkout: data.data,
          workoutStartTime: now,
        });
      },

      clearActiveWorkout: async () => {
        set({
          workoutStartTime: null,
          activeWorkout: null,
        });
      },

      getElapsedSeconds: () => {
        const start = get().workoutStartTime;
        if (!start) return 0;
        return Math.floor((Date.now() - start) / 1000);
      },
    }),
    {
      name: "workout-storage",
      partialize: (state) => ({
        activeWorkout: state.activeWorkout,
        workoutStartTime: state.workoutStartTime,
      }),
    }
  )
);
