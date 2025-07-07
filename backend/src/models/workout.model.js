import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    exercises: [
        {
            exercise: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Exercise"
            },
            sets: {
                type: Number,
                min: 1,
            },
            reps: {
                type: Number,
                min: 1,
            },
            restSeconds: {
                type: Number,
                min: 1,
            },
        }
    ]
}, {
    timestamps: true
})

const Workout = mongoose.model("Workout", workoutSchema)
export default Workout 