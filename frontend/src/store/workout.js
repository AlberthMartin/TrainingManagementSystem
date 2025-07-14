import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWorkoutStore = create(
  persist(
    (set, get) => ({
      workouts: [], //Stored workout templates
      completedWorkouts: [], //History of completed Workouts

      activeWorkout: null, //currently logged workout
      workoutStartTime: null,

      setWorkouts: (workouts) => set({ workouts }),
      //History of completed workouts for the user
      setCompletedWorkouts: (completedWorkouts) => set({ completedWorkouts }),

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

      createWorkout: async (newWorkout) => {
        try {
          const res = await fetch("/api/workouts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(newWorkout),
          });
          const data = await res.json();

          set((state) => ({ workouts: [...state.workouts, data.data] }));

          return {
            success: true,
            message: "Workout created",
          };
        } catch (error) {
          return {
            success: false,
            message: error.message,
          };
        }
      },

      fetchWorkouts: async () => {
        try {
          const res = await fetch("/api/workouts", {
            credentials: "include",
          });

          const data = await res.json();

          set({ workouts: data.data });
        } catch (error) {
          return {
            success: false,
            message: error.message,
          };
        }
      },
      fetchCompletedWorkouts: async () => {
        try{
          const res = await fetch("/api/completedWorkouts", {
            credentials: "include"
          })

          const data = await res.json();

          set({completedWorkouts: data.data})
        }catch (error){
          return{
            success: false,
            message: error.message,
          }
        }
      },

      fetchWorkout: async (id) => {
        try {
          const res = await fetch(`/api/workouts/${id}`, {
            credentials: "include",
          });
          if (!res.ok) throw new Error("Failed to fetch workout");
          const json = await res.json();

          return { success: true, workout: json.data };
        } catch (error) {
          return {
            success: false,
            message: error.message,
          };
        }
      },

      deleteWorkout: async (id) => {
        try {
          const res = await fetch(`/api/workouts/${id}`, {
            method: "DELETE",
            credentials: "include",
          });

          if (!res.ok) {
            throw new Error("Failed to delete workout");
          }

          set((state) => ({
            workouts: state.workouts.filter((workout) => workout._id !== id),
          }));

          return {
            success: true,
            message: "Workout deleted successfully",
          };
        } catch (error) {
          return {
            success: false,
            message: error.message,
          };
        }
      },

      updateWorkout: async (id, updatedWorkout) => {
        try {
          const res = await fetch(`/api/workouts/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(updatedWorkout),
          });

          if (!res.ok) {
            throw new Error("Failed to update workout");
          }

          const data = await res.json();

          set((state) => ({
            workouts: state.workouts.map((workout) =>
              workout._id === id ? data.data : workout
            ),
          }));

          return {
            success: true,
            workout: data,
            message: "Workout updated successfully",
          };
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
