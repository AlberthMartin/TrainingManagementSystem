import dotenv from "dotenv"
dotenv.config();
import express from "express"
import exerciseRoutes from "./routes/exercises.route.js";
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"

import {connectDB} from "./lib/db.js"


const app = express()
app.use(express.static("build"))
app.use(express.json())
app.use(cookieParser()) //allow to get the value from cookie
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
})) //so the frontend on a different port can communicate wiht the backend

app.use("/api/exercises", exerciseRoutes)
app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
    connectDB();
})