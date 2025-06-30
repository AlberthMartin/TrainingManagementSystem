import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URI

console.log("Connecting to", url)
  
mongoose.connect(url)
    .then(result =>{
        console.log("connected to MongoDB")
    })
    .catch(error=>{
        console.log("error connection to MongoDB", error.message)
    })

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
    }, {
        timestamps: true
    })

const Exercise = mongoose.model("Exercise", exerciseSchema)
export default Exercise