import express from "express";
import pool from "../db.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/notes", authMiddleware, async (req, res) => {
  const { note } = req.body;
  await pool.query(
    "INSERT INTO notes (user_id, note) VALUES ($1, $2)",
    [req.user.id, note]
  );
  res.json({ success: true });
});

router.get("/notes", authMiddleware, async (req, res) => {
  const result = await pool.query(
    "SELECT id, note, created_at, updated_at FROM notes WHERE user_id=$1",
    [req.user.id]
  );
  res.json(result.rows);
});

router.put("/notes/:id", authMiddleware, async (req, res) => {
  const { note } = req.body;
  const { id } = req.params;
  await pool.query(
    "UPDATE notes SET note=$1, updated_at=NOW() WHERE id=$2 AND user_id=$3",
    [note, id, req.user.id]
  );
  res.json({ success: true });
});

router.delete("/notes/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM notes WHERE id=$1 AND user_id=$2", [id, req.user.id]);
  res.json({ success: true });
});

export default router;
