import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

/**
 * Register admin (run once)
 */
export const registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO admins (email, password_hash) VALUES (?, ?)",
      [email, hash]
    );

    res.status(201).json({ message: "Admin created" });
  } catch (err) {
    res.status(400).json({ message: "Admin already exists" });
  }
};

/**
 * Admin login
 */
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await pool.query(
    "SELECT * FROM admins WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const admin = rows[0];
  const isValid = await bcrypt.compare(password, admin.password_hash);

  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { adminId: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token, role: admin.role });
};
