import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getWeeklyVolumePerMuscle,
  getWorkoutTemplateSetsPerMuscleGroup,
  getWorkoutTemplateTotalSets,
  getCompletedWorkoutSetsPerMuscleGroup,
  getWorkoutTemplateTotalVolume,
  getWeeklySetsPerMuscle
} from "../controllers/stats.controller.js";

const router = express.Router();

router.get("/weekly-volume", protectRoute, getWeeklyVolumePerMuscle);
router.get("/weekly-sets", protectRoute, getWeeklySetsPerMuscle)
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
router.get(
  "/workout-template-total-volume/:id",
  protectRoute,
  getWorkoutTemplateTotalVolume
);
router.get(
  "/workout-template-total-sets/:id",
  protectRoute,
  getWorkoutTemplateTotalSets
)

export default router;
