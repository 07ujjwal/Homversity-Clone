const express = require("express");
const router = express.Router();
const AdditionalFacility = require("../../models/additionalFacility");
const PropertyList = require("../../models/PropertyList");

router.post("/", async (req, res) => {
  try {
    const {
      propertyId,
      fireSafety,
      attachedBathroom,
      garden,
      parking,
      terrace,
      lift,
      commonFacility,
    } = req.body;

    const propertyInstance = await PropertyList.findOne({
      where: { id: propertyId },
    });
    if (!propertyInstance) {
      return res.status(400).json({ message: "Property not found" });
    }

    const newAdditionalFacility = await AdditionalFacility.create({
      propertyId: propertyInstance.id,
      fireSafety,
      attachedBathroom,
      garden,
      parking,
      terrace,
      lift,
      commonFacility,
    });

    res.status(201).json(newAdditionalFacility);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("all/:propertyId", async (req, res) => {
  const { propertyId } = req.params;
  try {
    const additionalFacilities = await AdditionalFacility.findAll({
      where: { propertyId: propertyId },
    });
    res.json(additionalFacilities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:propertyId", async (req, res) => {
  const { propertyId } = req.params;
  try {
    const additionalFacilities = await AdditionalFacility.findOne({
      where: { propertyId: propertyId },
    });
    res.json(additionalFacilities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:propertyId", async (req, res) => {
  const { propertyId } = req.params;
  try {
    const propertyInstance = await PropertyList.findOne({
      where: { id: propertyId },
    });
    if (!propertyInstance) {
      return res.status(400).json({ message: "Property not found" });
    }

    let additionalFacility = await AdditionalFacility.findOne({
      where: { propertyId: propertyId },
    });

    if (!additionalFacility) {
      additionalFacility = await AdditionalFacility.create({
        propertyId: propertyInstance.id,
        ...req.body,
      });
      return res.status(201).json(additionalFacility);
    }

    await additionalFacility.update({
      ...req.body,
    });

    res.status(200).json(additionalFacility);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
