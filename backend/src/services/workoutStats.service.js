import CompletedWorkout from "../models/completedWorkout.model.js";
import Workout from "../models/workout.model.js";
import mongoose from "mongoose";
import { startOfWeek } from "date-fns";

//{ Shoulders: 3, Triceps: 4.5 }
export const getMuscleGroupVolumeForWorkout = async (workout) => {
  try {
    if (!workout)
      throw new Error(
        "Workout not found in workoutStats.service.js --> getMuscleGroupVolumeForWorkout"
      );

    await workout.populate("exercises.exercise");
    const muscleGroups = {};

    for (const ex of workout.exercises) {
      const exercise = ex.exercise;
      const sets = ex.sets || [];

      for (const set of sets) {
        //Count primary muscle group
        if (exercise.primaryMuscleGroup) {
          muscleGroups[exercise.primaryMuscleGroup] =
            (muscleGroups[exercise.primaryMuscleGroup] || 0) + 1;
        }

        //Count secondary muscle group
        if (exercise.secondaryMuscleGroup) {
          muscleGroups[exercise.secondaryMuscleGroup] =
            (muscleGroups[exercise.secondaryMuscleGroup] || 0) + 0.5;
        }
      }
    }
    return muscleGroups;
    //{ Shoulders: 3, Triceps: 4.5 }
  } catch (error) {
    console.log("error in getMuscleGroupVolumeForWorkout", error.message);
    throw error;
  }
};
//Total sets in a workout
export const getTotalSets = async (workout) => {
  try {
    if (!workout)
      throw new Error(
        "Workout not found in getTotalSets --> workoutStats.service.js"
      );

    await workout.populate("exercises.exercise");

    let totalSets = 0;

    if (!Array.isArray(workout.exercises)) {
      throw new Error("workout.exercises is not an array");
    }

    for (const ex of workout.exercises) {
      totalSets += Array.isArray(ex.sets) ? ex.sets.length : 0;
    }
    return totalSets;
  } catch (error) {
    console.log("error in getTotalSets @ workoutStats.service.js");
    throw error;
  }
};

// Total Volume of all exercises combined (Reps * Sets * Weight)
export const getTotalVolume = async (workout) => {
  try {
    if (!workout)
      throw new Error(
        "Workout not found in getTotalVolume --> workoutStats.service.js"
      );

    await workout.populate("exercises.exercise");

    let totalVolume = 0;

    if (!Array.isArray(workout.exercises)) {
      throw new Error("workout.exercises is not an array");
    }

    for (const ex of workout.exercises) {
      for (const set of ex.sets) {
        totalVolume += set.reps * set.weight;
      }
    }

    return totalVolume;

  } catch (error) {
    console.log("error in getTotalVolume @ workoutStats.service.js");
    throw error;
  }
};

//How much volume (reps*sets*weight) was performed per muscle group a given week
export const getWeeklyMuscleGroupVolume = async (userId) => {
  try {
    const workouts = await CompletedWorkout.find({ user: userId })
      .populate("exercises.exercise")
      .exec();

    const weeklyVolume = {};

    for (const workout of workouts) {
      if (!workout.completedAt) continue;
      const weekStart = startOfWeek(new Date(workout.completedAt), {
        weekStartsOn: 1,
      }); //Monday

      for (const ex of workout.exercises) {
        const exercise = ex.exercise;
        const sets = ex.sets || [];

        for (const set of sets) {
          const volume = set.reps * set.weight;

          if (!volume || isNaN(volume)) continue;

          const weekKey = weekStart.toISOString().split("T")[0];

          //Init object
          if (!weeklyVolume[weekKey]) weeklyVolume[weekKey] = {};

          // Primary
          if (exercise.primaryMuscleGroup) {
            const muscle = exercise.primaryMuscleGroup;
            weeklyVolume[weekKey][muscle] =
              (weeklyVolume[weekKey][muscle] || 0) + volume * 1;
          }

          // Secondary
          if (exercise.secondaryMuscleGroup) {
            const muscle = exercise.secondaryMuscleGroup;
            weeklyVolume[weekKey][muscle] =
              (weeklyVolume[weekKey][muscle] || 0) + volume * 0.5;
          }
        }
      }
    }

    return weeklyVolume;
    /*{
  "2025-07-14": {
    "Chest": 2500,
    "Triceps": 1300,
    "Back": 3600,
    "Shoulders": 900
  },
  "2025-07-07": {
    "Legs": 4000
  }
} */
  } catch (error) {
    console.error("Error in getWeeklyMuscleGroupVolume:", error.message);
    throw error;
  }
};
