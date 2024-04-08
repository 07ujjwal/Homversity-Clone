const express = require("express");
const router = express.Router();
const { SharingType } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const sharingTypeData = await SharingType.findAll();
    res.status(200).json(sharingTypeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const sharingTypeData = await SharingType.findByPk(req.params.id);
    if (!sharingTypeData) {
      res.status(404).json({ message: "No sharing type found with this id!" });
      return;
    }
    res.status(200).json(sharingTypeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const sharingTypeData = await SharingType.create(req.body);
    res.status(200).json(sharingTypeData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const sharingTypeData = await SharingType.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!sharingTypeData) {
      res.status(404).json({ message: "No sharing type found with this id!" });
      return;
    }
    res.status(200).json(sharingTypeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const sharingTypeData = await SharingType.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!sharingTypeData) {
      res.status(404).json({ message: "No sharing type found with this id!" });
      return;
    }
    res.status(200).json(sharingTypeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
