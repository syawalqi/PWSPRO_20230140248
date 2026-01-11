import express from "express";
import {
  getMyApiKey,
  generateApiKey
} from "../controllers/dev.apikey.controller.js";
import { verifyDeveloper } from "../middleware/devAuth.middleware.js";

const router = express.Router();

router.get("/developer/apikey", verifyDeveloper, getMyApiKey);
router.post("/developer/apikey", verifyDeveloper, generateApiKey);

export default router;
