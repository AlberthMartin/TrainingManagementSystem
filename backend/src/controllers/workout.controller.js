import Workout from "../models/workout.model.js";
import mongoose from "mongoose";
import { getMuscleGroupSetsForWorkout, getTotalSets, getTotalVolume } from "../services/workoutStats.service.js";

//Workouts Backend API, to communicate with MongoDB

export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({
      $or: [
        { user: req.user._id }, // user-created workouts
        { user: null }, // default/global workouts
      ],
    }).populate("exercises.exercise");
    res.status(200).json({ success: true, data: workouts });
  } catch (error) {
    console.log("Error in getWorkouts", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate(
      "exercises.exercise"
    );

    if (!workout) {
      return res
        .status(404)
        .json({ success: false, message: "Workout not found" });
    }

    // Allow access to own workouts or global ones (user === null)
    if (workout.user && !workout.user.equals(req.user._id)) {
      return res
        .status(404)
        .json({ success: false, message: "Workout not found" });
    }

    res.status(200).json({ success: true, data: workout });
  } catch (error) {
    console.log("Error in getWorkoutById", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createWorkout = async (req, res) => {
  try {
    const { name, exercises } = req.body;

    if (!name || !Array.isArray(exercises)) {
      return res
        .status(400)
        .json({ success: false, message: "Name and exercises are required" });
    }

    for (const ex of exercises) {
      if (!ex.exercise || !Array.isArray(ex.sets)) {
        return res.status(400).json({
          success: false,
          message: "Each exercise must have a valid ID and an array of sets",
        });
      }
    }

    const newWorkout = new Workout({
      name,
      exercises,
      user: req.user._id,
    });

    //Calculate stats for new workout
    const muscleGroupVolume = await getMuscleGroupSetsForWorkout(newWorkout);
    const totalSets = await getTotalSets(newWorkout);
    
    newWorkout.muscleGroupVolume = muscleGroupVolume;
    newWorkout.summary.totalSets = totalSets

    await newWorkout.save();

    await res.status(200).json({ success: true, data: newWorkout });
  } catch (error) {
    console.log("Error in createWorkout", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid workout Id" });
    }

    const deletedWorkout = await Workout.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      data: deletedWorkout,
      message: "Workout deleted",
    });
  } catch (error) {
    console.log("Error in deleteWorkout", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    const workout = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid workout Id" });
    }

    const workoutDoc = await Workout.findById(id).populate(
      "exercises.exercise"
    );
    // Apply updates
    workoutDoc.set(workout);
    
    // Calculate muscle group volume using the populated document
    const muscleGroupVolume = await getMuscleGroupSetsForWorkout(workoutDoc);
    const totalSets = await getTotalSets(workoutDoc);
    
    workoutDoc.muscleGroupVolume = muscleGroupVolume;
    workoutDoc.summary.totalSets = totalSets;

    const updatedWorkout = await workoutDoc.save();

    res.status(200).json({
      success: true,
      message: "Workout updated",
      data: updatedWorkout,
    });
  } catch (error) {
    console.error("Error in updateWorkout", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
