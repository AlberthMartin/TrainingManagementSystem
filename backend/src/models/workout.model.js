import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    //The user who creates the workout
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    exercises: [
      {
        exercise: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Exercise",
        },
        //Supports different reps on different sets
        sets: [
          {
            reps: {
              type: Number,
              min: 0,
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
  },
  {
    timestamps: true,
  }
);

const Workout = mongoose.model("Workout", workoutSchema);
export default Workout;
