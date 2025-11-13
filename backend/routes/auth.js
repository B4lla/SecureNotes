import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: "User and password required" });
  }
  
  if (username.length < 3) {
    return res.status(400).json({ error: "User must have at least 3 characters" });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must have at least 6 characters" });
  }
  
  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, hashed]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Error:", err);
    
    if (err.code === '23505') {
      return res.status(400).json({ error: "User already exists" });
    }
    
    res.status(500).json({ error: "Error while creating user" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: "User and password required" });
  }
  
  try {
    const userResult = await pool.query(
      "SELECT * FROM users WHERE username=$1",
      [username]
    );
    const user = userResult.rows[0];
    
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: "Password incorrect" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error while login" });
  }
});

export default router;
