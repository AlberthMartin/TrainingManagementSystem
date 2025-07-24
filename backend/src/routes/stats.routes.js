import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getWeeklyVolume,
  getCompletedWorkoutSetsPerMuscleGroup,
  getWorkoutTemplateSetsPerMuscleGroup,
} from "../controllers/stats.controller.js";

const router = express.Router();

router.get("/weekly-volume", protectRoute, getWeeklyVolume);
router.get(
  "/completed-workout-sets-per-muscle-group/:id",
  protectRoute,
  getCompletedWorkoutSetsPerMuscleGroup
);
router.get(
  "/workout-template-sets-per-muscle-group/:id",
  protectRoute,
  getWorkoutTemplateSetsPerMuscleGroup
);

export default router;
