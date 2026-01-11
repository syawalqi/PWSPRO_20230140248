import pool from "../config/db.js";

export const verifyApiKey = async (req, res, next) => {
  const apiKey = req.query.apikey || req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ message: "API key required" });
  }

  const [rows] = await pool.query(
    "SELECT * FROM api_keys WHERE api_key = ?",
    [apiKey]
  );

  if (rows.length === 0) {
    return res.status(403).json({ message: "Invalid API key" });
  }

  req.apiUser = rows[0];
  next();
};
