const express = require("express");
const router = express.Router();
const PropertyList = require("../../models/PropertyList"); // Assuming the path is correct
const {
  Type,
  Room,
  PropertyFacility,
  additionalFacility,
  healthFacility,
} = require("../../models");
const Owner = require("../../models/Owner");
const { Op } = require("sequelize");
const upload = require("../../config/multer");

router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const {
      propertyName,
      typeId,
      ownerId,
      city,
      locality,
      nearestCollege,
      distanceFromCollege,
      genderAllowed,
      geolocation,
      status,
      paymentOptions,
      pics,
      video,
      videoThumbnail,
    } = req.body;

    const typeInstance = await Type.findOne({
      where: { id: typeId },
    });
    if (!typeInstance) {
      return res.status(400).json({ message: "Type not found" });
    }

    const ownersInstance = await Owner.findOne({
      where: { id: ownerId },
    });
    if (!ownersInstance) {
      return res.status(400).json({ message: "Owner not found" });
    }

    const imagePaths = req.files?.map((file) => file.path);

    const property = await PropertyList.create({
      propertyName,
      typeId: typeInstance.id,
      ownerId: ownersInstance.id,
      city,
      locality,
      nearestCollege,
      distanceFromCollege,
      genderAllowed,
      geolocation,
      status,
      paymentOptions,
      pics: imagePaths,
      video,
      videoThumbnail,
    });

    res.status(201).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:id/basic", async (req, res) => {
  const propertyId = req.params.id;
  try {
    const propertyData = await PropertyList.findByPk(propertyId);
    if (!propertyData) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(propertyData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const properties = await PropertyList.findAll();
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//properties listed by the owner

router.get("/owner/:ownerId", async (req, res) => {
  const { ownerId } = req.params;
  try {
    const properties = await PropertyList.findAll({
      where: { ownerId: ownerId },
    });

    if (!properties || properties.length === 0) {
      return res
        .status(404)
        .json({ message: "No properties found for the user" });
    }

    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const propertyId = req.params.id;
  const {
    propertyName,
    city,
    locality,
    nearestCollege,
    distanceFromCollege,
    genderAllowed,
    geolocation,
    status,
    paymentOptions,
    pics,
    video,
    videoThumbnail,
    priority,
    view,
  } = req.body;

  try {
    const updatedProperty = await PropertyList.update(
      {
        propertyName,
        city,
        locality,
        nearestCollege,
        distanceFromCollege,
        genderAllowed,
        geolocation,
        status,
        paymentOptions,
        pics,
        video,
        videoThumbnail,
        priority,
        view,
      },
      {
        where: {
          id: propertyId,
        },
      }
    );

    if (updatedProperty[0] === 1) {
      res.status(200).json({ message: "Property updated successfully" });
    } else {
      res.status(404).json({ error: "Property not found" });
    }
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//delete
// cascaded delete will delete all properties
router.delete("/property/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await PropertyList.findByPk(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    await property.destroy();

    return res.json({
      message: "Property and associated components deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting property:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// like implementation.... search on the basis of query

router.get("/like", async (req, res) => {
  try {
    const query = req.query.q;

    const properties = await PropertyList.findAll({
      where: {
        [Op.or]: [
          { propertyName: { [Op.like]: `%${query}%` } },

          { locality: { [Op.like]: `%${query}%` } },

          { city: { [Op.like]: `%${query}%` } },

          { genderAllowed: { [Op.like]: `%${query}%` } },
        ],
      },
    });

    res.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
