import express from "express"
import {createExercise, deleteExercise, getExercises, updateExercise} from "../controllers/exercise.controller.js"

const router = express.Router();

router.get("/", getExercises)
router.post("/", createExercise)
router.delete("/:id", deleteExercise)
router.put("/:id", updateExercise)

export default router;