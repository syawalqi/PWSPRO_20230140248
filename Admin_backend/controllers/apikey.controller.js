import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";

export const generateApiKey = async (req, res) => {
  const { user_id } = req.body;

  try {
    // Check if user exists
    const [users] = await pool.query(
      "SELECT id FROM users WHERE id = ?",
      [user_id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const apiKey = uuidv4();

    await pool.query(
      "INSERT INTO api_keys (user_id, api_key) VALUES (?, ?)",
      [user_id, apiKey]
    );

    res.status(201).json({
      message: "API key generated",
      api_key: apiKey
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate API key" });
  }
};
