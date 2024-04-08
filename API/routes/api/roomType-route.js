const express = require("express");
const router = express.Router();
const { RoomType } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const roomTypeData = await RoomType.findAll();
    res.status(200).json(roomTypeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const roomTypeData = await RoomType.findByPk(req.params.id);
    if (!roomTypeData) {
      res.status(404).json({ message: "No room type found with this id!" });
      return;
    }
    res.status(200).json(roomTypeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const roomTypeData = await RoomType.create(req.body);
    res.status(200).json(roomTypeData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const roomTypeData = await RoomType.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!roomTypeData) {
      res.status(404).json({ message: "No room type found with this id!" });
      return;
    }
    res.status(200).json(roomTypeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const roomTypeData = await RoomType.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!roomTypeData) {
      res.status(404).json({ message: "No room type found with this id!" });
      return;
    }
    res.status(200).json(roomTypeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
