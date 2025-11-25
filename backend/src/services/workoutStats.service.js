import CompletedWorkout from "../models/completedWorkout.js";
import Workout from "../models/workout.js";
import mongoose from "mongoose";
import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";

/*Get the trained muscle group sets for a given workout
  { Shoulders: 3, Triceps: 4.5 } 
*/
export const getMuscleGroupSetsForWorkout = async (workout) => {
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

// Total Volume of all exercises combined in a specific workout
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

/*How much volume (reps*sets*weight) was performed per muscle group a given week,
"2025-07-14": {
    "Chest": 2500,
    "Triceps": 1300,
    "Back": 3600,
    "Shoulders": 900
  },
  "2025-07-07": {
    "Legs": 4000
  }
    */
export const getWeeklyMuscleGroupVolume = async (userId) => {
  try {
    //Finds the workouts the user has completed
    const workouts = await CompletedWorkout.find({ user: userId })
      .populate("exercises.exercise")
      .exec();

    const weeklyVolume = {};

    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday start
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

    //For each workout
    for (const workout of workouts) {
      if (!workout.completedAt) continue;
      //Gets the week start for a given date if the week starts on monday
     if (
        !isWithinInterval(new Date(workout.completedAt), {
          start: weekStart,
          end: weekEnd,
        })
      ) {
        continue;
      }

      //For each exercise in the workout
      for (const ex of workout.exercises) {
        const exercise = ex.exercise;
        const sets = ex.sets || [];

        //For each set of the exercise
        for (const set of sets) {
          //Calculate volume reps*weight
          const volume = set.reps * set.weight;

          if (!volume || isNaN(volume)) continue;

          //completedAt 2025-07-21T09:35:11.201+00:00
          const weekKey = weekStart.toISOString().split("T")[0];

          //Init object
          /*
          "2025-07-14": {}, 
          */
          if (!weeklyVolume[weekKey]) weeklyVolume[weekKey] = {};

          // Primary muscle group volume
          if (exercise.primaryMuscleGroup) {
            const muscle = exercise.primaryMuscleGroup; //ex. "Chest"
            /*
            {
            "2025-07-14": {
              "Chest": 200,
                } 
              }
              */
            weeklyVolume[weekKey][muscle] =
              (weeklyVolume[weekKey][muscle] || 0) + volume * 1;
          }

          // Secondary muscle group counts as 0.5 of the volume
          if (exercise.secondaryMuscleGroup) {
            const muscle = exercise.secondaryMuscleGroup;
            weeklyVolume[weekKey][muscle] =
              (weeklyVolume[weekKey][muscle] || 0) + volume * 0.5;
          }
        }
      }
    }

    return weeklyVolume;
  } catch (error) {
    console.error("Error in getWeeklyMuscleGroupVolume:", error.message);
    throw error;
  }
};

export const getWeeklyMuscleGroupSets = async (userId) => {
  try {
    const workouts = await CompletedWorkout.find({ user: userId })
      .populate("exercises.exercise")
      .exec();

    const weeklyMuscleGroupSets = {};

    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday start
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

    for (const workout of workouts) {
      if (!workout.completedAt) continue;

      if (
        !isWithinInterval(new Date(workout.completedAt), {
          start: weekStart,
          end: weekEnd,
        })
      ) {
        continue;
      }

      const weekKey = weekStart.toISOString().split("T")[0];

      for (const ex of workout.exercises) {
        const exercise = ex.exercise;
        const setsCount = Array.isArray(ex.sets)
          ? ex.sets.length
          : Number(ex.sets) || 0;
        if (!setsCount) continue;

        if (!weeklyMuscleGroupSets[weekKey]) {
          weeklyMuscleGroupSets[weekKey] = {};
        }

        if (exercise.primaryMuscleGroup) {
          const muscle = exercise.primaryMuscleGroup;
          weeklyMuscleGroupSets[weekKey][muscle] =
            (weeklyMuscleGroupSets[weekKey][muscle] || 0) + setsCount * 1;
        }
        if (exercise.secondaryMuscleGroup) {
          const muscle = exercise.secondaryMuscleGroup;
          weeklyMuscleGroupSets[weekKey][muscle] =
            (weeklyMuscleGroupSets[weekKey][muscle] || 0) + setsCount * 0.5;
        }
      }
    }

    return weeklyMuscleGroupSets;
    /*Should be something like:
    "2025-07-14": {
      "Chest": 4,
      "Back": 6,
      }
    }
     */
  } catch (error) {
    console.error("Error in getWeeklyMuscleGroupVolume:", error.message);
    throw error;
  }
};

export const getWeeklyWorkoutsCompleted = async (userId) => {
  try {
  } catch (error) {
    console.error("Error in getWeeklyMuscleGroupVolume:", error.message);
    throw error;
  }
};
