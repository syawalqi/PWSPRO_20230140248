import express from "express";
import { loginDeveloper } from "../controllers/developer.controller.js";

const router = express.Router();

router.post("/developer/login", loginDeveloper);

export default router;
