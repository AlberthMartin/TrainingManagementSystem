import express from "express"
import {createExercise, deleteExercise, getExercises, updateExercise} from "../controllers/exercise.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router();

router.get("/", protectRoute, getExercises)
router.post("/",protectRoute, createExercise)
router.delete("/:id",protectRoute, deleteExercise)
router.put("/:id",protectRoute, updateExercise)

export default router;