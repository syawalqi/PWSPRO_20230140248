import crypto from "crypto";
import pool from "../config/db.js";

/**
 * Get existing API key
 */
export const getMyApiKey = async (req, res) => {
  const userId = req.developer.userId;

  const [rows] = await pool.query(
    "SELECT api_key FROM api_keys WHERE user_id = ?",
    [userId]
  );

  if (rows.length === 0) {
    return res.json({ apiKey: null });
  }

  res.json({ apiKey: rows[0].api_key });
};

/**
 * Generate / regenerate API key
 */
export const generateApiKey = async (req, res) => {
  const userId = req.developer.userId;
  const apiKey = crypto.randomUUID();

  await pool.query(
    "DELETE FROM api_keys WHERE user_id = ?",
    [userId]
  );

  await pool.query(
    "INSERT INTO api_keys (user_id, api_key) VALUES (?, ?)",
    [userId, apiKey]
  );

  res.status(201).json({ apiKey });
};
