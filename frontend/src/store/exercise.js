import {create} from "zustand"
//Stores the global state of the exercises array so all 
//the components using useExerciseStore can access the exercises array
export const useExerciseStore = create((set) => ({

    exercises: [],

    setExercises: (exercises) => set({exercises}),
    
    createExercise: async(newExercise) => {
        //Validates exercise object
        if(!newExercise.name || !newExercise.description){
            return {success: false, message:"Please fill in all fields"}
        }
        //POST JSON request to backend
        const res = await fetch("/api/exercises", {
            method: "POST",
            headers: {
                "Content-Type":"application/json" //Say to server that JSON is comming
            },
            credentials: "include", // This sends the jwt cookie
            body: JSON.stringify(newExercise) // Sends exercise object as JSON
        })

        //Makes the response into json
        const data = await res.json();
        //Adds the new exercise to the end of the state array of exercises
        set((state) => ({exercises: [...state.exercises, data]}))

        return {
            success: true, 
            message: "Exercise created"}
    },

    fetchExercises: async () => {
        //Sends a get request to the backend at /api/exercises
        //This is recieved by the express server
        //Then it awaits a HTTP response from the server
        //res is a RESPONSE OBJECT which has metadata and a body
        //the /api/exercises Backned responds with the array of exercises and a success: true or false if something went wrong
        const res = await fetch("/api/exercises", {
            credentials: "include", // This sends the jwt cookie
        })

        //Makes the response object into json
        const data = await res.json();

        //The zustand set() function updates the globa state
        //So all the components using useExerciseStore can access the exercises array
        set({exercises: data.data})
    },

    deleteExercise: async (id) => {
        //Sends a DELETE request to backend API at /api/exercises/id
        const res = await fetch(`/api/exercises/${id}`, {
            method: "DELETE",
            credentials: "include",
        })

        //Creates an empty JavaScript object
        let data = {};
        //Gets the info for what content is in the response
        const contentType = res.headers.get("content-type") || "";
        
        //if it is in JSON
        if(contentType.includes("application/json")){
            try{
                //Get the response data as JSON
                data = await res.json();
            }catch(error){
                //The server did not responde in JSON... error
                return {
                    success: false,
                    message: "Invalid JSON response from server"
                }
            }
        }
        //If the exercise was not deleted success === false
        if(!data.success){
            return {
                success: false, 
                message: data.message
            }
        } 
        //Filter away the deleted exercise from the state array of exercises
        set((state) => ({
            //js filter function, takes all the exercises that are not equal to the deleted exercise
            exercises: state.exercises.filter((exercises) => exercises._id !== id)
        }))

        return {success: true, message: data.message};
    },

    updateExercise: async (id, updatedExercise) => {
        //Send a `/api/exercises/${id}` PUT JSON request to the API backend 
        const res = await fetch(`/api/exercises/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(updatedExercise)
        })
        //response to JSON
        const data = await res.json();

        //success === false
        if(!data.success){
            return {
                success: false, 
                message: data.message
            }
        }

        //Update the state of the app.
        set(state => ({
            //Updates the value for the updated exercise
            exercises: state.exercises.map(exercise => exercise._id === id ? data.data : exercise)
        }))
        
        return {success: true, message: data.message}
    }
}))