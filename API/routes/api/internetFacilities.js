const express = require("express");
const router = express.Router();
const InternetFacility = require("../../models/internetFacility");
const PropertyList = require("../../models/propertyList");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const internetFacility = await InternetFacility.findByPk(id);
    if (!internetFacility) {
      return res.status(404).json({ error: "Internet facility not found" });
    }
    res.json(internetFacility);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      propertyId,
      internetType,
      wifiMode,
      dataPermission,
      downloadSpeed,
    } = req.body;

    const propertyInstance = await PropertyList.findOne({
      where: { id: propertyId },
    });

    if (!propertyInstance) {
      return res.status(400).json({ message: "Property not found" });
    }

    const internetFacility = await InternetFacility.create({
      propertyId: propertyInstance.id,
      internetType,
      wifiMode,
      dataPermission,
      downloadSpeed,
    });

    res.status(201).json(internetFacility);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:propertyId", async (req, res) => {
  const { propertyId } = req.params;
  try {
    const internetFacilities = await InternetFacility.findAll({
      where: { propertyId: propertyId },
    });
    res.json(internetFacilities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { propertyId, internetType, wifiMode, dataPermission, downloadSpeed } =
    req.body;
  try {
    const internetFacility = await InternetFacility.findByPk(id);
    if (!internetFacility) {
      return res.status(404).json({ error: "Internet facility not found" });
    }
    await internetFacility.update({
      propertyId,
      internetType,
      wifiMode,
      dataPermission,
      downloadSpeed,
    });
    res.json(internetFacility);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const internetFacility = await InternetFacility.findByPk(id);
    if (!internetFacility) {
      return res.status(404).json({ error: "Internet facility not found" });
    }
    await internetFacility.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
