const express = require("express");
const router = express.Router();
const HealthFacility = require("../../models/healthFacility");
const PropertyList = require("../../models/propertyList");

router.post("/", async (req, res) => {
  try {
    const { propertyId, firstAid, visitingDoctor } = req.body;

    const propertyInstance = await PropertyList.findOne({
      where: { id: propertyId },
    });
    if (!propertyInstance) {
      return res.status(400).json({ message: "Property not found" });
    }

    const newHealthFacility = await HealthFacility.create({
      propertyId: propertyInstance.id,
      firstAid,
      visitingDoctor,
    });

    res.status(201).json(newHealthFacility);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("all/:propertyId", async (req, res) => {
  const { propertyId } = req.params;
  try {
    const healthFacilities = await HealthFacility.findAll({
      where: { propertyId: propertyId },
    });
    res.json(healthFacilities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:propertyId", async (req, res) => {
  const { propertyId } = req.params;
  try {
    const healthFacility = await HealthFacility.findOne({
      where: { propertyId: propertyId },
    });
    res.json(healthFacility);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:propertyId", async (req, res) => {
  const { propertyId } = req.params;
  const { firstAid, visitingDoctor } = req.body;

  try {
    let healthFacility = await HealthFacility.findOne({
      where: { propertyId: propertyId },
    });

    if (!healthFacility) {
      return res.status(404).json({ message: "Health facility not found" });
    }

    healthFacility = await HealthFacility.update(
      { firstAid, visitingDoctor },
      { where: { propertyId: propertyId } }
    );

    res.json({ message: "Health facility updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
