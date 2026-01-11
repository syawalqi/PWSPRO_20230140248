import express from "express";
import { getDogs, getCats } from "../controllers/animal.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/animals/dogs", verifyUser, getDogs);
router.get("/animals/cats", verifyUser, getCats);

export default router;
