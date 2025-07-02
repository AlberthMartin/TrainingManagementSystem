import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    workouts: 
    [
        {
        workoutName: {type: String, required: true},
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
            }
            }
                ]
        }
    ]}, {
        timestamps: true //CreatedAt, UpdatedAt
    })

const Program = mongoose.model("Program", programSchema)
export default Program