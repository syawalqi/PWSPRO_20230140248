import crypto from "crypto";
import pool from "../config/db.js";

/**
 * GET /admin/developers
 */
export const getDevelopers = async (req, res) => {
  const [rows] = await pool.query(`
    SELECT 
      u.id,
      u.email,
      k.api_key
    FROM users u
    LEFT JOIN api_keys k ON k.user_id = u.id
  `);

  res.json(rows);
};

/**
 * DELETE /admin/developers/:id
 */
export const deleteDeveloper = async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM api_keys WHERE user_id = ?", [id]);
  await pool.query("DELETE FROM users WHERE id = ?", [id]);

  res.json({ message: "Developer deleted" });
};

/**
 * POST /admin/apikey/:userId/regenerate
 */
export const regenerateApiKey = async (req, res) => {
  const { userId } = req.params;
  const apiKey = crypto.randomUUID();

  await pool.query("DELETE FROM api_keys WHERE user_id = ?", [userId]);
  await pool.query(
    "INSERT INTO api_keys (user_id, api_key) VALUES (?, ?)",
    [userId, apiKey]
  );

  res.json({ apiKey });
};

/**
 * DELETE /admin/apikey/:userId
 */
export const revokeApiKey = async (req, res) => {
  const { userId } = req.params;

  await pool.query("DELETE FROM api_keys WHERE user_id = ?", [userId]);

  res.json({ message: "API key revoked" });
};
