const express = require("express");
const router = express.Router();
const Room = require("../../models/Room");
// const PropertyList = require("../../models/propertyList");

router.post("/", async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:propertyId", async (req, res) => {
  const { propertyId } = req.params;
  try {
    const rooms = await Room.findOne({
      where: { propertyId: propertyId },
    });
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const { hostelId, totalBeds, totalRooms, totalFloors, roomsPerFloor } =
      req.body;

    await room.update({
      hostelId,
      totalBeds,
      totalRooms,
      totalFloors,
      roomsPerFloor,
    });

    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    await room.destroy();
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
