import express from "express";
import { generateApiKey } from "../controllers/apikey.controller.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * Admin only
 */
router.post("/apikeys", verifyAdmin, generateApiKey);

export default router;
