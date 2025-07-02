import Program from "../models/models.program.js";
import mongoose from "mongoose";

export const getPrograms = async (req, res) => {
    try{
        const program = await Program.find({})
        res.status(200).json({success: true, data: program})
    }catch(error){
        console.log("Error in getPrograms in program.controller", error.message)
        res.status(500).json({success: false, message: "Server error"})
    }
}

export const createProgram = async (req, res) =>{
    const program = req.body;

    if(!program.name){
        return res.status(400).json({success: false, message: "Fill in the program name"})
    }
    
    const newProgram = new Program({
        ...program,
        //createdBy: req.user._id 
    })

    try{
        //remember to add protectroute funktion in routes
        await newProgram.save()
        res.status(201).json({success: true, data: newProgram})
    }catch(error){
        console.log("Error in create program", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const deleteProgram = async (req, res) =>{
    const {id } = req.params
    
    try{
        await Program.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "Program deleted"})
    }catch(error) {
        console.log("Error in deleteProgram", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const updateProgram = async (req, res) =>{
    const { id } = req.params;

    const program = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Program Id"})
    }

    try{
        const updatedProgram = await Program.findByIdAndUpdate(id, program, {new: true})
        res.status(200).json({success: true, message: "Program updated", data: updatedProgram})
    }catch(error){
        console.error("Error in updateProgram", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}