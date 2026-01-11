import express from "express";
import {
  getDevelopers,
  deleteDeveloper,
  regenerateApiKey,
  revokeApiKey
} from "../controllers/admin.manage.controller.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/admin/developers", verifyAdmin, getDevelopers);
router.delete("/admin/developers/:id", verifyAdmin, deleteDeveloper);

router.post("/admin/apikey/:userId/regenerate", verifyAdmin, regenerateApiKey);
router.delete("/admin/apikey/:userId", verifyAdmin, revokeApiKey);

export default router;
