import dotenv from "dotenv"
dotenv.config();
import express from "express"
import exerciseRoutes from "../routes/exercises.route.js";

const app = express()
app.use(express.static("build"))
app.use(express.json())

app.use("/api/exercises", exerciseRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})