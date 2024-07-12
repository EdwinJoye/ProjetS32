const express = require("express");
const router = express.Router();
const pool = require("../db.js");

// Route pour ajouter un nouveau matériau
router.post("/add", async (req, res) => {
  try {
    const { name, type, supplier } = req.body;
    const result = await pool.query(
      "INSERT INTO materials (name, type, supplier) VALUES ($1, $2, $3) RETURNING *",
      [name, type, supplier]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route pour obtenir tous les matériaux
router.get("/all", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM materials");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route pour obtenir un matériau par ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM materials WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).send("Material not found");
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
