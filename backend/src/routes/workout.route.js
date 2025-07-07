import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { createWorkout, deleteWorkout, getWorkoutById, getWorkouts, updateWorkout } from "../controllers/workout.controller.js";

const router = express.Router();

router.get("/", getWorkouts)
router.get("/:id", getWorkoutById)
router.post("/", createWorkout)
router.delete("/:id", deleteWorkout)
router.put("/:id", updateWorkout)

export default router;