import mongoose from "mongoose";
import dotenv from "dotenv";
import Exercise from "../models/models.exercise.js"

dotenv.config();

//Then just run: 
// node src/seeds/seedExercises.js from cd backend
//To add the default exercises to the database

const seedExercises = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    await Exercise.deleteMany();

    const exercises = [
      {
        name: "Barbell Bench Press",
        description: "Classic chest compound movement",
        primaryMuscleGroup: "Chest",
        secondaryMuscleGroup: "Triceps",
        category: "Barbell",
      },
      {
        name: "Barbell Back Squat",
        description: "Core leg movement for strength",
        primaryMuscleGroup: "Quadriceps",
        secondaryMuscleGroup: "Glutes",
        category: "Barbell",
      },
      {
        name: "Deadlift",
        description: "Total-body pulling movement",
        primaryMuscleGroup: "Back",
        secondaryMuscleGroup: "Hamstrings",
        category: "Barbell",
      },
      {
        name: "Dumbbell Shoulder Press",
        description: "Targets delts with free weights",
        primaryMuscleGroup: "Shoulders",
        secondaryMuscleGroup: "Triceps",
        category: "Dumbbell",
      },
      {
        name: "Pull-Up",
        description: "Bodyweight back builder",
        primaryMuscleGroup: "Back",
        secondaryMuscleGroup: "Biceps",
        category: "Bodyweight",
      },
      {
        name: "Bicep Curl",
        description: "Isolation curl for biceps",
        primaryMuscleGroup: "Biceps",
        category: "Dumbbell",
      },
      {
        name: "Tricep Pushdown",
        description: "Cable-based tricep movement",
        primaryMuscleGroup: "Triceps",
        category: "Machine",
      },
      {
        name: "Plank",
        description: "Core isometric strength hold",
        primaryMuscleGroup: "Core",
        category: "Duration",
      },
      {
        name: "Forearm Wrist Curl",
        description: "Forearm flexor isolation",
        primaryMuscleGroup: "Forearms",
        category: "Dumbbell",
      },
    ];

    // Add default `createdBy` field (null)
    const exercisesWithDefaults = exercises.map((e) => ({
      ...e,
      createdBy: null,
    }));

    await Exercise.insertMany(exercisesWithDefaults);

    console.log("Seeded updated exercises successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding:", error.message);
    process.exit(1);
  }
};

seedExercises();