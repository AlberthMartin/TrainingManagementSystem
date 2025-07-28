import mongoose from "mongoose";

const completedWorkoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //Original workout template
    workoutTemplate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workout",
      required: true,
    },
    //the exercises completed
    exercises: [
      {
        exercise: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Exercise",
          required: true,
        },
        //Supports different reps on different sets
        sets: [
          {
            reps: {
              type: Number,
              min: 0,
              required: true,
            },
            weight: {
              type: Number,
              min: 0,
              default: 0,
            },
            restSeconds: {
              type: Number,
              min: 0,
              default: 90,
            },
            //Dropset, warmup
            setType: {
              type: Number,
              default: 1,
            },
          },
        ],
      },
    ],
    summary: {
      totalSets: Number,
      totalVolume: Number,
      mainMuscleGroups: [String], // Two most worked muscles
    },
    muscleGroupVolume: {
      type: Map,
      of: Number,
      default: {},
    },
    duration: { type: Number, required: true },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

const CompletedWorkout = mongoose.model(
  "CompletedWorkout",
  completedWorkoutSchema
);
export default CompletedWorkout;
