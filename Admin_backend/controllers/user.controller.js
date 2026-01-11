import bcrypt from "bcrypt";
import pool from "../config/db.js";

export const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, hash]
    );

    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
};
