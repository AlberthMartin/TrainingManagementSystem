import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true,
        },
        
        name:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
            minlength: 6,
        },
        profilePicture:{
            type: String,
            default: "No Picture",
        },
        lastLogin: {
            type: Date,
            default: Date.now
        },
        
    },
    { timestamps: true}
)

const User = mongoose.model("User", userSchema)

export default User;