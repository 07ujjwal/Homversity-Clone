const express = require("express");
const router = express.Router();
const Type = require("../../models/Type");

router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const existingType = await Type.findOne({ where: { name } });
    if (existingType) {
      return res.status(400).json({ message: "Type already exists" });
    }

    const newType = await Type.create({ name });
    res.status(201).json(newType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/types", async (req, res) => {
  try {
    const types = await Type.findAll();

    res.json(types);
  } catch (error) {
    console.error("Error fetching types:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
