const express = require("express");
const router = express.Router();
const PropertyFacility = require("../../models/PropertyFacility");
const PropertyList = require("../../models/PropertyList");
const Owner = require("../../models/Owner");

router.post("/", async (req, res) => {
  try {
    const {
      propertyId,
      staffGender,
      servingType,
      capacity,
      servingFrequency,
      menu,
      foodType,
      studentLunch,
      nonVegFrequency,
      fruitProvision,
      milkProvision,
      roWater,
      laundrySystem,
      laundryMode,
      clothLimit,
      laundryAction,
    } = req.body;

    const propertyInstance = await PropertyList.findOne({
      where: { id: propertyId },
    });
    if (!propertyInstance) {
      return res.status(404).json({ error: "Property not found" });
    }

    const existingFacility = await PropertyFacility.findOne({
      where: { propertyId },
    });
    if (existingFacility) {
      return res
        .status(409)
        .json({ error: "Facility for this property already exists" });
    }

    const newFacility = await PropertyFacility.create({
      propertyId,
      staffGender,
      servingType,
      capacity,
      servingFrequency,
      menu,
      foodType,
      studentLunch,
      nonVegFrequency,
      fruitProvision,
      milkProvision,
      roWater,
      laundrySystem,
      laundryMode,
      clothLimit,
      laundryAction,
    });

    res.status(201).json({
      message: "Facility created successfully",
      facility: newFacility,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

router.get("/:propertyId", async (req, res) => {
  const { propertyId } = req.params;
  try {
    const facility = await PropertyFacility.findOne({
      where: { propertyId: propertyId },
    });
    res.json(facility);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:propertyId", async (req, res) => {
  const { propertyId } = req.params;
  const {
    staffGender,
    servingType,
    capacity,
    servingFrequency,
    menu,
    foodType,
    studentLunch,
    nonVegFrequency,
    fruitProvision,
    milkProvision,
    roWater,
    laundrySystem,
    laundryMode,
    clothLimit,
    laundryAction,
  } = req.body;

  try {
    const propertyFacility = await PropertyFacility.findOne({
      where: { propertyId },
    });

    if (!propertyFacility) {
      return res.status(404).json({ error: "Property facility not found" });
    }

    propertyFacility.staffGender = staffGender;
    propertyFacility.servingType = servingType;
    propertyFacility.capacity = capacity;
    propertyFacility.servingFrequency = servingFrequency;
    propertyFacility.menu = menu;
    propertyFacility.foodType = foodType;
    propertyFacility.studentLunch = studentLunch;
    propertyFacility.nonVegFrequency = nonVegFrequency;
    propertyFacility.fruitProvision = fruitProvision;
    propertyFacility.milkProvision = milkProvision;
    propertyFacility.roWater = roWater;
    propertyFacility.laundrySystem = laundrySystem;
    propertyFacility.laundryMode = laundryMode;
    propertyFacility.clothLimit = clothLimit;
    propertyFacility.laundryAction = laundryAction;

    await propertyFacility.save();

    return res.json(propertyFacility);
  } catch (error) {
    console.error("Error updating property facility:", error);
    return res
      .status(500)
      .json({ error: "Failed to update property facility" });
  }
});

module.exports = router;
