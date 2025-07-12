import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

//Takes the userId and response object
export const generateToken = (userId, res) =>{
    
    //Creates a JWT token containing the userID using the JWT_SECRET, makes it expire in 7days
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    //Sends the token as a HTTP-only cookie
    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000, // 7 days in milliseconds, save login for 7 days
        httpOnly: true, // prevents XSS attacks (cross site scripting attacks)
        sameSite: "strict", // prevents CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"  // when in development it is false, and in production true
    })

    return token;
}