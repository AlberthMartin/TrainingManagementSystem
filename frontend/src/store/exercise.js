import {create} from "zustand"

export const useExerciseStore = create((set) => ({
    exercises: [],

    setExercises: (exercises) => set({exercises}),
    
    createExercise: async(newExercise) => {
        if(!newExercise.name || !newExercise.description){
            return {success: false, message:"Please fill in all fields"}
        }
        const res = await fetch("/api/exercises", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newExercise)
        })

        const data = await res.json();
        set((state) => ({exercises: [...state.exercises, data]}))
        return {success: true, message: "Exercise created successfully"}
    },

    fetchExercises: async () => {
        const res = await fetch("/api/exercises")
        const data = await res.json();
        set({exercises: data.data})
    },

    deleteExercise: async (id) => {
        const res = await fetch(`/api/exercises/${id}`, {
            method: "DELETE"
        })

        let data = {};
        const contentType = res.headers.get("content-type") || "";
        
        if(contentType.includes("application/json")){
            try{
                data = await res.json();
            }catch(error){
                return {success: false, message: "Invalid JSON response from server"}
            }
        }

        if(!data.success){
            return {success: false, message: data.message}
        } 

        set((state) => ({
            exercises: state.exercises.filter((exercises) => exercises._id !== id)
        }))

        return {success: true, message: data.message};
    },

    updateExercise: async (id, updatedExercise) => {
        //Get the exercise with the id
        const res = await fetch(`/api/exercises/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedExercise)
        })
        //
        const data = await res.json();

        if(!data.success){
            return {success: false, message: data.message}
        }

        //Update the state of the app.
        set(state => ({
            exercises: state.exercises.map(exercise => exercise._id === id ? data.data : exercise)
        }))

        return {success: true, message: data.message}
    }
}))