import mongoose from "mongoose";
import Exercise from "../models/models.exercise.js";
import dotenv from "dotenv";

dotenv.config();

//Then just run: 
// node backend/seeds/seedWorkout.js
//To add the default Workouts to the database

const defaultWorkouts = [
    {
        "name": "Push Day",
        "exercises": [
          {
            "exercise": "68613176b42b3c9a0b4f6675",  // Bench Press
            "sets": [
              { "reps": 10, "restSeconds": 90 },
              { "reps": 8, "restSeconds": 90 },
              { "reps": 6, "restSeconds": 90 }
            ]
          },
          {
            "exercise": "6868e083c3f25532f4cc65ab",  // Tricep Pushdowns
            "sets": [
              { "reps": 12, "restSeconds": 60 },
              { "reps": 12, "restSeconds": 60 }
            ]
          },
          {
            "exercise": "6862733bc547cdddceb6e5e0",  // Dips
            "sets": [
              { "reps": 10, "restSeconds": 60 },
              { "reps": 10, "restSeconds": 60 }
            ]
          }
        ]
      }
      ,
      {
        "name": "Pull Day",
        "exercises": [
          {
            "exercise": "685fa4ac97a4309a9a8cb39e",  // Lat pulldown
            "sets": [
              { "reps": 12, "restSeconds": 90 },
              { "reps": 10, "restSeconds": 90 },
              { "reps": 8, "restSeconds": 90 }
            ]
          },
          {
            "exercise": "68613154b42b3c9a0b4f6673",  // Bicep curls
            "sets": [
              { "reps": 15, "restSeconds": 60 },
              { "reps": 12, "restSeconds": 60 }
            ]
          },
          {
            "exercise": "6868df55c3f25532f4cc65a1",  // Dumbbell Row
            "sets": [
              { "reps": 10, "restSeconds": 90 },
              { "reps": 8, "restSeconds": 90 }
            ]
          },
          {
            "exercise": "6868dfe5c3f25532f4cc65a6",  // Bent over Row
            "sets": [
              { "reps": 10, "restSeconds": 90 },
              { "reps": 10, "restSeconds": 90 }
            ]
          }
        ]
      }
      ,
      {
        "name": "Leg & Glutes",
        "exercises": [
          {
            "exercise": "686131aab42b3c9a0b4f6678",  // Deadlift
            "sets": [
              { "reps": 5, "restSeconds": 150 },
              { "reps": 5, "restSeconds": 150 },
              { "reps": 5, "restSeconds": 150 }
            ]
          },
          {
            "exercise": "686274d0c547cdddceb6e5f2",  // Hip thrusts
            "sets": [
              { "reps": 12, "restSeconds": 90 },
              { "reps": 10, "restSeconds": 90 },
              { "reps": 8, "restSeconds": 90 }
            ]
          },
          {
            "exercise": "68627447c547cdddceb6e5ee",  // Matilda squats
            "sets": [
              { "reps": 15, "restSeconds": 60 },
              { "reps": 12, "restSeconds": 60 }
            ]
          },
          {
            "exercise": "6868e0e6c3f25532f4cc65b2",  // Seated leg curls
            "sets": [
              { "reps": 12, "restSeconds": 60 },
              { "reps": 12, "restSeconds": 60 }
            ]
          }
        ]
      }
      ,
      {
        "name": "Core Blast",
        "exercises": [
          {
            "exercise": "68627395c547cdddceb6e5e4",  // Crunches
            "sets": [
              { "reps": 20, "restSeconds": 30 },
              { "reps": 20, "restSeconds": 30 },
              { "reps": 15, "restSeconds": 30 }
            ]
          },
          {
            "exercise": "6862733bc547cdddceb6e5e0",  // Dips (triceps/core support)
            "sets": [
              { "reps": 10, "restSeconds": 60 },
              { "reps": 10, "restSeconds": 60 }
            ]
          }
        ]
      }
      ,
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await Exercise.find({ createdBy: null });
    
    if (existing.length === 0) {
      await Exercise.insertMany(defaultWorkouts);
      console.log("Default Workouts seeded!");
    } else {
      console.log("Default Workouts already exist, skipping.");
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding default Workouts:", error);
  }
}

seed();