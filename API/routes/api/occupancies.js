const express = require("express");
const router = express.Router();
const { OccupanciesAndRent, RoomType, SharingType } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const occupanciesAndRentData = await OccupanciesAndRent.findAll();
    res.status(200).json(occupanciesAndRentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//....

router.get("/room/:roomId", async (req, res) => {
  const roomId = req.params.roomId;

  try {
    const occupanciesAndRentData = await OccupanciesAndRent.findAll({
      where: { roomId: roomId },
    });

    const finalData = await Promise.all(
      occupanciesAndRentData.map(async (record) => {
        const roomTypeData = await RoomType.findByPk(record.roomTypeId, {
          attributes: ["name"],
        });
        const sharingTypeData = await SharingType.findByPk(record.SharingId, {
          attributes: ["name"],
        });

        return {
          ...record.toJSON(),
          roomTypeName: roomTypeData ? roomTypeData.name : null,
          sharingTypeName: sharingTypeData ? sharingTypeData.name : null,
        };
      })
    );

    res.status(200).json(finalData);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//

router.get("/:id", async (req, res) => {
  try {
    const occupanciesAndRentData = await OccupanciesAndRent.findByPk(
      req.params.id
    );
    if (!occupanciesAndRentData) {
      res
        .status(404)
        .json({ message: "No occupancies and rent found with this id!" });
      return;
    }
    res.status(200).json(occupanciesAndRentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const occupanciesAndRentData = await OccupanciesAndRent.create(req.body);
    res.status(200).json(occupanciesAndRentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const occupanciesAndRentData = await OccupanciesAndRent.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!occupanciesAndRentData) {
      res
        .status(404)
        .json({ message: "No occupancies and rent found with this id!" });
      return;
    }
    res.status(200).json(occupanciesAndRentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const occupanciesAndRentData = await OccupanciesAndRent.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!occupanciesAndRentData) {
      res
        .status(404)
        .json({ message: "No occupancies and rent found with this id!" });
      return;
    }
    res.status(200).json(occupanciesAndRentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
