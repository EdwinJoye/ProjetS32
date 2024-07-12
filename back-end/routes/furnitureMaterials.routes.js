const express = require("express");
const router = express.Router();
const pool = require("../db.js");

// Route pour ajouter un matériau à un meuble
router.post("/add", async (req, res) => {
  try {
    const { furniture_id, material_id, quantity } = req.body;
    const result = await pool.query(
      "INSERT INTO furniture_materials (furniture_id, material_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [furniture_id, material_id, quantity]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route pour obtenir tous les matériaux d'un meuble
router.get("/:furnitureId", async (req, res) => {
  try {
    const { furnitureId } = req.params;
    const result = await pool.query(
      "SELECT * FROM furniture_materials WHERE furniture_id = $1",
      [furnitureId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Route pour supprimer un matériau d'un meuble
router.delete("/:furnitureId/:materialId", async (req, res) => {
  try {
    const { furnitureId, materialId } = req.params;
    await pool.query(
      "DELETE FROM furniture_materials WHERE furniture_id = $1 AND material_id = $2",
      [furnitureId, materialId]
    );
    res.json({ message: "Matériau supprimé avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
