import {create} from "zustand"

export const useWorkoutStore = create(( set ) => ({
    workouts: [],
    currentWorkout: null,

    setWorkouts: (workouts) => set({workouts}),

    setCurrentWorkout: (workout) => set({ currentWorkout: workout }),

    createWorkout: async(newWorkout) => {
        try{
        const res = await fetch("/api/workouts", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newWorkout)
        })
        const data = await res.json()

        set((state) => ({workouts: [...state.workouts, data]}))

        return {
            success: true, message: "Workout created"
        }
        }catch(error){
            return {
                success: false,
                message: error.message,
            };
        }
    },

    fetchWorkouts: async () => {
        try{
        const res = await fetch("/api/workouts")

        const data = await res.json();

        set({workouts: data.data})

        }catch(error){
            return {
                success: false,
                message: error.message,
            };
        }
    },

    fetchWorkout: async (id) => {
        try{
            const res = await fetch(`/api/workouts/${id}`)
            if(!res.ok) throw new Error("Failed to fetch workout")
            const data = await res.json();
            
            set({currentWorkout: data})

            return{success: true, workout: data}
        }catch(error) {
            return {
                success: false,
                message: error.message,
            };
        }
        

    },

    deleteWorkout: async (id) => {
        try{
            const res = await fetch(`/api/workouts/${id}`, {
                method: "DELETE"
            });

            if(!res.ok){
                throw new Error("Failed to delete workout")
            }

            set((state) => ({
                workouts: state.workouts.filter((workout) => workout._id !== id)
            }))

            return {
                success: true,
                message: "Workout deleted successfully",
            };

        }catch(error){
            return {
                success: false,
                message: error.message,
            };
        }
    },

    updateWorkout: async (id, updatedWorkout) => {
        try{
            const res = await fetch(`/api/workouts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedWorkout)
            });

            if (!res.ok) {
                throw new Error("Failed to update workout");
            }
    
            const data = await res.json();
            
            set(state => ({
                workouts: state.workouts.map(workout => workout._id === id ? data.data : workout)
            }))

            return {
                success: true,
                workout: data,
                message: "Workout updated successfully",
            };

        }catch(error){
            return {
                success: false,
                message: error.message,
            };
        }
    }
}))