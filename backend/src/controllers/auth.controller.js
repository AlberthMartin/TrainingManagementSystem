import { generateToken } from "../utils/generateToken.js"

import User from "../models/user.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const {name, email, password} = req.body

    try{
        //Check that all field are filled
        if(!name || !email || !password){
            return res.status(400).json({message: "Fill in all the fields"})
        }

        //Check that the password is long enough
        if(password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters"})
        }

        //check if the email already exists
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "Email already exists"})
        } 

        //Hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //Create a new user with the hashed password
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
        })

        if(newUser) {
            //Generate jwt token for user, THis user has been authenticated when it has a token
            generateToken(newUser._id, res)

            //save the user to the database
            await newUser.save()

            res.status(201).json({
                success: true,
                message: "User was created successfully",
                //Send all user info but not the password as a response
                user:{
                    ...newUser._doc,
                    password: undefined 
                }
                
            }) 
        }else{
            res.status(400).json({message: "Invalid user data"})
        }
    }catch(error){
        console.log("Error in signup controller", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const login = async (req, res) =>{
    const {email, password} = req.body
    
    try{
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message: "Invalid credentials"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const token = generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePicture: user.profilePicture, token
        })
    }catch(error){
        console.log("Error in login controller", error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const logout = (req, res) =>{
    try{
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({ message: "Logged out successfully"})
    }catch(error) {
        console.log("Error in logout controller", error.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}


export const checkAuth = (req, res) =>{
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message: "Internal server error"})
    }
}