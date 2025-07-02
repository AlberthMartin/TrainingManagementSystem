import express from "express"
import { getPrograms, createProgram, deleteProgram, updateProgram } from "../controllers/program.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"

const router = express.Router();

router.get("/", getPrograms)
router.post("/", createProgram)
router.delete("/:id", deleteProgram)
router.put("/:id", updateProgram)

export default router;