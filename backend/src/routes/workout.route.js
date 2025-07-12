import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { createWorkout, deleteWorkout, getWorkoutById, getWorkouts, updateWorkout } from "../controllers/workout.controller.js";

const router = express.Router();

router.get("/", protectRoute, getWorkouts)
router.get("/:id", protectRoute, getWorkoutById)
router.post("/", protectRoute, createWorkout)
router.delete("/:id", protectRoute, deleteWorkout)
router.put("/:id", protectRoute, updateWorkout)

export default router;