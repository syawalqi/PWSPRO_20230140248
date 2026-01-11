import express from "express";
import { createUser } from "../controllers/user.controller.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * Admin-only
 */
router.post("/users", verifyAdmin, createUser);

export default router;
