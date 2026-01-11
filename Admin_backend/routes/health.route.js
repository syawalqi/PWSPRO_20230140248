import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "OK", db: "connected" });
  } catch (err) {
    console.error("DB ERROR:", err.message);
    res.status(500).json({ status: "ERROR", db: "disconnected" });
  }
});


export default router;
