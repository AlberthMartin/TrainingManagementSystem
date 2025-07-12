import Workout from "../models/workout.model.js";
import Exercise from "../models/models.exercise.js";
import mongoose from "mongoose";

//Workouts Backend API, to communicate with MongoDB

export const getWorkouts = async (req, res) => {
    try{
        const workouts = await Workout.find({
            $or: [
                { user: req.user._id }, // user-created workouts
                { user: null }          // default/global workouts
              ]
        }).populate("exercises.exercise")
        res.status(200).json({success: true, data: workouts})
    }catch(error){
        console.log("Error in getWorkouts", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}
export const getWorkoutById = async (req, res) =>{
    try{
        const workout = await Workout.findById(req.params.id).populate("exercises.exercise")
        
        if(!workout) {
            return res.status(404).json({ success: false, message: "Workout not found" });
        }
        res.status(200).json({success: true, data: workout})

    }catch(error){
        console.log("Error in getWorkoutById", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const createWorkout = async (req, res) => {
    try{
    const {name, exercises} = req.body

    if(!name || !Array.isArray(exercises)){
        return res.status(400).json({success: false, message: "Name and exercises are required"})
    }

    for (const ex of exercises) {
        if (!ex.exercise || !Array.isArray(ex.sets)) {
          return res.status(400).json({ success: false, message: "Each exercise must have a valid ID and an array of sets" });
        }
      }
   
    const newWorkout = new Workout({
        name, 
        exercises,
        user: req.user._id
    })

    await newWorkout.save()

    res.status(200).json({success: true, data: newWorkout})

    }catch(error){
        console.log("Error in createWorkout", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }

}

export const deleteWorkout = async (req, res) => {
    try{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Program Id"})
    }

    const deletedWorkout = await Workout.findByIdAndDelete(id)
    res.status(200).json({success: true, data: deletedWorkout, message:"Program deleted"})

    }catch(error){
        console.log("Error in deleteWorkout", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const updateWorkout = async (req, res) => {
    try{
    const { id } = req.params

    const workout = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Program Id"})
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(id, workout, {new: true})
    res.status(200).json({success: true, message: "Workout updated", data: updatedWorkout})
    }
    catch(error){
        console.error("Error in updateWorkout", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}

