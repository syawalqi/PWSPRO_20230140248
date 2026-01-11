import express from "express";
import { getDogs, getCats } from "../controllers/animal.controller.js";

const router = express.Router();

router.get("/animals/dogs", getDogs);
router.get("/animals/cats", getCats);

export default router;
