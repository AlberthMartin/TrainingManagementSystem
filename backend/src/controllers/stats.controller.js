import CompletedWorkout from "../models/completedWorkout.model.js";
import Workout from "../models/workout.model.js";
import {
  getWeeklyMuscleGroupVolume,
  getMuscleGroupVolumeForWorkout,
  getTotalSets,
  getTotalVolume,
} from "../services/workoutStats.service.js";

//How much volume (reps*sets*weight) was performed per muscle group a given week
export const getWeeklyVolumePerMuscle = async (req, res) => {
  try {
    const data = await getWeeklyMuscleGroupVolume(req.user._id);
    res.json({ success: true, data: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
//{ Shoulders: 3, Triceps: 4.5 } (Workout Template)
export const getWorkoutTemplateSetsPerMuscleGroup = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    const data = await getMuscleGroupVolumeForWorkout(workout);
    res.json({ success: true, data: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
//Total sets in a workout
export const getWorkoutTemplateTotalSets = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Workout not found (getWorkoutTemplateTotalSets)",
        });
    }
    const data = await getTotalSets(workout);
    res.json({ success: true, data: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
// Total Volume of all exercises combined in a workout (Reps * Sets * Weight)
export const getWorkoutTemplateTotalVolume = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {return res.status(404).json({ success: false, message: "Workout not found" });}
    const data = await getTotalVolume(workout)
    res.json({ success: true, data: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


/**
 *
 * Same funtions for Completed Workouts BELOW!
 *
 */
//{ Shoulders: 3, Triceps: 4.5 } (CompletedWorkout)
export const getCompletedWorkoutSetsPerMuscleGroup = async (req, res) => {
  try {
    const workout = await CompletedWorkout.findById(req.params.id);
    if (!workout) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Workout not found (getCompletedWorkoutSetsPerMuscleGroup)",
        });
    }
    const data = await getMuscleGroupVolumeForWorkout(workout);
    res.json({ success: true, data: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
