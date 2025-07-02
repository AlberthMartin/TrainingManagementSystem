import mongoose from "mongoose";
import Exercise from "../models/models.exercise.js";
import dotenv from "dotenv";

dotenv.config();

//Then just run: 
// node backend/seeds/seedExercises.js
//To add the default exercises to the database

const defaultExercises = [
  { name: "Push-Up", description: "A bodyweight chest exercise." },
  { name: "Squat", description: "A compound leg movement." },
  { name: "Deadlift", description: "A powerful full-body lift." },
  { name: "Pull-Up", description: "A bodyweight back exercise." },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await Exercise.find({ createdBy: null });
    
    if (existing.length === 0) {
      await Exercise.insertMany(defaultExercises);
      console.log("Default exercises seeded!");
    } else {
      console.log("Default exercises already exist, skipping.");
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding default exercises:", error);
  }
}

seed();