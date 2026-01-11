import express from "express";
import { getDogBreeds, getCatBreeds } from "../controllers/animal.controller.js";
import { verifyApiKey } from "../middleware/verifyApiKey.js";

const router = express.Router();

router.get("/animals/dogs", verifyApiKey, getDogBreeds);
router.get("/animals/cats", verifyApiKey, getCatBreeds);

export default router;
