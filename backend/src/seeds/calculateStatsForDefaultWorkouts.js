import mongoose from "mongoose";
import Workout from "../models/workout.model.js";
import { calculateVolumeForWorkoutTemplate } from "../services/workoutStats.service.js";
import Exercise from "../models/models.exercise.js";

import dotenv from "dotenv";

dotenv.config();


const ids = {
  PushDay: "687e091af16ea167b1dd0f68",
  PullDay: "687e091af16ea167b1dd0f71",
  LegDay: "687e091af16ea167b1dd0f7d",
};

async function calculateStatsForDefaultWorkouts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(process.env.MONGODB_URI)
    const pushday = await Workout.findById(ids.PushDay).populate("exercises.exercise");
    const pullday = await Workout.findById(ids.PullDay).populate("exercises.exercise");
    const legday = await Workout.findById(ids.LegDay).populate("exercises.exercise");

    const pushdayMuscleGroupVolume = await calculateVolumeForWorkoutTemplate(
      ids.PushDay
    );
    const pulldayMuscleGroupVolume = await calculateVolumeForWorkoutTemplate(
      ids.PullDay
    );
    const legdayMuscleGroupVolume = await calculateVolumeForWorkoutTemplate(
      ids.LegDay
    );

    pushday.muscleGroupVolume = pushdayMuscleGroupVolume;
    pullday.muscleGroupVolume = pulldayMuscleGroupVolume;
    legday.muscleGroupVolume = legdayMuscleGroupVolume;

    const updatedPushDay = await Workout.findByIdAndUpdate(ids.PushDay, pushday, {new: true})
    const updatedPullDay = await Workout.findByIdAndUpdate(ids.PullDay, pullday, {new: true})
    const updatedLegDay = await Workout.findByIdAndUpdate(ids.LegDay, legday, {new: true})

    console.log("Default workouts muscleGroupVolume inserted successfully", updatedLegDay, updatedPullDay, updatedPushDay);
    process.exit(0);
  } catch (err) {
    console.error(" Error seeding workouts:", err.message);
    process.exit(1);
  }
}

calculateStatsForDefaultWorkouts()