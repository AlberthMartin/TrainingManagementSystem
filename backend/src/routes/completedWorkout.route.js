import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";

import {
  getCompletedWorkouts,
  saveCompletedWorkout,
  deleteCompletedWorkout,
  updateCompletedWorkout,
} from "../controllers/completedWorkout.controller.js";

const router = express.Router();

router.get("/", protectRoute, getCompletedWorkouts);
router.post("/", protectRoute, saveCompletedWorkout);
router.delete("/:id", protectRoute, deleteCompletedWorkout);
router.put("/:id", protectRoute, updateCompletedWorkout);

export default router;
