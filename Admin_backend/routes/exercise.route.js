import express from "express";
import { getExercises } from "../controllers/exercise.controller.js";
import { verifyApiKey } from "../middleware/verifyApiKey.js";

const router = express.Router();

router.get("/exercises", verifyApiKey, getExercises);

export default router;
