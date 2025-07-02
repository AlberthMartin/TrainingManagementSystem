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
        required: true
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }

    }, {
        timestamps: true
    })

const Exercise = mongoose.model("Exercise", exerciseSchema)
export default Exercise