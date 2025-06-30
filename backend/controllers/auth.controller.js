import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import router from "../routes/auth.route.js"
import { protectRoute } from "../middleware/auth.middleware.js"

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body

    try{
        //Check that all field are filled
        if(!fullName || !email || !password){
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
            fullName: fullName,
            email: email,
            password: hashedPassword,
        })

        if(newUser) {
            //Generate jwt token for user
            generateToken(newUser._id, res)

            //save the user to the database
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
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
            fullName: user.fullName,
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

export const updateProfile = async (req, res) =>{
    try{
        const {profilePicture} = req.body
        const userId = req.user._id

        if(!profilePicture){
            return res.status(400).json({message: "Profile ppicture is required"})
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePicture)

        const updatedUser = await User.findByIdAndUpdate(userId, 
            {profilePicture: uploadResponse.secure_url}, 
            {new:true})

        res.status(200).json(updatedUser)
    
    }catch(error){
        console.log("error in update profile", error);
        res.status(500).json({ message: "Internal server error"})

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