import Exercise from "../models/models.exercise.js"
import mongoose from "mongoose"

export const getExercises = async (req, res) =>{

    try{
        const exercise = await Exercise.find({})
        res.status(200).json({success: true, data: exercise})
    }catch(error){
        console.log("Error in getExercises", error.message)
        res.status(500).json({success: false, message: "Server error"})

    }
}
export const createExercise = async (req, res) =>{
    
    const exercise = req.body;

    if(!exercise.name || !exercise.description){
        return res.status(400).json({success:false, message: "Fill in all fields"})
    }

    const newExercise = new Exercise({
        ...exercise,
        //If it is created by a user it is a user specific exercise
        createdBy: req.user._id 
    })

    try{
        newExercise.save()
        res.status(201).json({success: true, data: newExercise})

    }catch(error){
        console.log("Error in createExercise", error.message)
        res.status(500).json({success: false, message: "Server Error"})

    }
}
export const deleteExercise = async (req, res) =>{
    const {id} = req.params
    console.log("Deleting", id)
    
    try{
        await Exercise.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "Exersice deleted"})
    }catch(error){
        console.log("Error in deleteExercise", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const updateExercise = async (req, res) =>{
    const {id} = req.params;

    const exercise = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Exercise Id"})
    }
    try{
        const updatedExercise = await Exercise.findByIdAndUpdate(id, exercise, {new:true})
        res.status(200).json({success: true, message: "Exercise updated", data: updatedExercise})
    }catch(error){
        console.error("Error in updateExercise", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}
