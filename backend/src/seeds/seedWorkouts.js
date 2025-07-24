import mongoose from "mongoose";
import Workout from "../models/workout.model.js";
import dotenv from "dotenv";


dotenv.config();

const ids = {
  squat: "687e02be646e0df3835adcb6",
  deadlift: "687e02be646e0df3835adcb7",
  shoulderPress: "687e02be646e0df3835adcb8",
  pullup: "687e02be646e0df3835adcb9",
  bicepCurl: "687e02be646e0df3835adcba",
  tricepPushdown: "687e02be646e0df3835adcbb",
  plank: "687e02be646e0df3835adcbc",
  forearmCurl: "687e02be646e0df3835adcbd",
};

const workouts = [
  {
    name: "Push Day",
    user: null,
    exercises: [
      {
        exercise: ids.shoulderPress,
        sets: [
          { reps: 10, weight: 20 },
          { reps: 10, weight: 20 },
          { reps: 8, weight: 22.5 },
        ],
      },
      {
        exercise: ids.tricepPushdown,
        sets: [
          { reps: 12, weight: 25 },
          { reps: 12, weight: 25 },
          { reps: 10, weight: 27.5 },
        ],
      },
    ],
    summary: {},
    muscleGroupVolume: {},
  },
  {
    name: "Pull Day",
    user: null,
    exercises: [
      {
        exercise: ids.pullup,
        sets: [
          { reps: 8, weight: 0 },
          { reps: 8, weight: 0 },
          { reps: 6, weight: 5 },
        ],
      },
      {
        exercise: ids.bicepCurl,
        sets: [
          { reps: 12, weight: 12 },
          { reps: 10, weight: 14 },
          { reps: 10, weight: 14 },
        ],
      },
      {
        exercise: ids.forearmCurl,
        sets: [
          { reps: 15, weight: 8 },
          { reps: 15, weight: 8 },
        ],
      },
    ],
    summary: {},
    muscleGroupVolume: {},
  },
  {
    name: "Leg Day",
    user: null,
    exercises: [
      {
        exercise: ids.squat,
        sets: [
          { reps: 10, weight: 60 },
          { reps: 8, weight: 70 },
          { reps: 6, weight: 80 },
        ],
      },
      {
        exercise: ids.deadlift,
        sets: [
          { reps: 5, weight: 90 },
          { reps: 5, weight: 100 },
        ],
      },
      {
        exercise: ids.plank,
        sets: [
          { reps: 1, weight: 0, restSeconds: 60 },
        ],
      },
    ],
    summary: {},
    muscleGroupVolume: {},
  },
];

async function seedWorkouts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Workout.deleteMany({});
    await Workout.insertMany(workouts);
    console.log("Default workouts seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error(" Error seeding workouts:", err.message);
    process.exit(1);
  }
}

seedWorkouts();