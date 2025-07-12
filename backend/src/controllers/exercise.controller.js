import Exercise from "../models/models.exercise.js"
import mongoose from "mongoose"

/*Backend API for exercise.model
Exercise Controller made to manage the MONGODB database of exercises
 getExercises --> get all the exercises stored in the database
 createExercise --> Create a new exercise in the database
 deleteExercise --> Delete an exercise id from the database
 updateExercise --> Update the value of a exercise
 */

// A function to get all the exercises from the database
export const getExercises = async (req, res) =>{

    try{
        //Mongoose finds all the exercises
        const exercises = await Exercise.find({
            $or: [
                { createdBy: req.user._id }, // user-created exercise
                { createdBy: null }          // default/global exercise
              ]
        })
        //returns an array of all the found exercises as JSON
        res.status(200).json({
            success: true, 
            data: exercises
        })
    }catch(error){
        console.log("Error in getExercises", error.message)
        res.status(500).json({
            success: false, 
            message: "Server error"})

    }
}
export const createExercise = async (req, res) =>{
    //The exercise sent as JSON from frontend
    const exercise = req.body;

    //Simple validation
    if(!exercise.name || !exercise.description){
        return res.status(400).json({
            success:false,
            message: "Fill in all fields"
        })
    }
    //Creates the exercise with mongoose
    const newExercise = new Exercise({
        name: exercise.name,
        description: exercise.description,
        createdBy: req.user._id
    })

    try{
        //Saves the exercise in the database
        newExercise.save()
        //Responds with the added exercise as JSON (+success: true)
        res.status(201).json({
            success: true, 
            data: newExercise
        })

    }catch(error){
        console.log("Error in createExercise", error.message)
        res.status(500).json({
            success: false, 
            message: "Server Error"
        })

    }
}
export const deleteExercise = async (req, res) =>{
    //extract the id from the req URL parameter
    const {id} = req.params

    //Checks that the provided id is valid MongDB ID
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            success: false, 
            message: "Invalid Exercise Id"
        })
    }
    
    try{
        //Try to find and delete exercise
        await Exercise.findByIdAndDelete(id)

        //if success: 
        res.status(200).json({
            success: true,
            message: "Exersice deleted"
        })
        //if server down or other error:
    }catch(error){
        console.log("Error in deleteExercise", error.message)
        res.status(500).json({
            success: false, 
            message: "Server Error"
        })
    }
}

export const updateExercise = async (req, res) =>{
    const {id} = req.params;

    const exercise = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            success: false, 
            message: "Invalid Exercise Id"
        })
    }
    try{
        const updatedExercise = await Exercise.findByIdAndUpdate(id, exercise, {new:true})
        
        res.status(200).json({
            success: true, 
            message: "Exercise updated", 
            data: updatedExercise
        })
    }catch(error){
        console.error("Error in updateExercise", error.message)
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}
