import mongoose from "mongoose";

    //TODO: Make a field for created by, null for the default and user id for the ones
    //Created by the user
const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    primaryMuscleGroup: {
        type: String,
        enum: ["Chest", "Back", "Shoulders", "Triceps", "Biceps", "Forearms", "Core", "Quadriceps", 
            "Hamstrings", "Glutes", "Calves"
        ],
        required: true
    },
    secondaryMuscleGroup: {
        type: String,
        enum: ["Chest", "Back", "Shoulders", "Triceps", "Biceps", "Forearms", "Core", "Quadriceps", 
            "Hamstrings", "Glutes", "Calves"
        ],
        //Not really required for all exericese: ex bicep curls tricep pushdowns
    },
    category: {
        type: String,
        enum: ["Barbell", "Dumbbell", "Machine", "Bodyweight", 
            "Assisted Bodyweight", "Cardio", "Duration"],
        required: true,
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }

    }, {
        timestamps: true
    })

const Exercise = mongoose.model("Exercise", exerciseSchema)
export default Exercise