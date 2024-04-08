const express = require("express");
const router = express.Router();
const Owner = require("../../models/Owner");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyOwner } = require("../../middleware/authMiddleware");
const PropertyList = require("../../models/propertyList");

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      contact,
      alternateContact,
      profession,
      bio,
      wardenName,
      wardenContact,
      wardenEmail,
      govId,
      password,
      ownersEmail,
    } = req.body;

    if (!name || !contact || !password || !ownersEmail) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const existingOwner = await Owner.findOne({ where: { ownersEmail } });
    if (existingOwner) {
      return res
        .status(400)
        .json({ error: "An account with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newOwner = await Owner.create({
      name,
      contact,
      alternateContact,
      profession,
      bio,
      wardenName,
      wardenContact,
      wardenEmail,
      govId,
      password: hashedPassword,
      ownersEmail,
    });

    const token = jwt.sign({ ownerId: newOwner.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      ownerId: newOwner.id,
      name: newOwner.name,
      email: newOwner.ownersEmail,
      token: token,
    });
  } catch (error) {
    console.error("Error registering owner:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//update

router.put("/:id", async (req, res) => {
  const ownerId = req.params.id;
  const {
    name,
    contact,
    alternateContact,
    profession,
    bio,
    wardenName,
    wardenContact,
    wardenEmail,
    govId,
    password,
    ownersEmail,
  } = req.body;

  try {
    const owner = await Owner.findByPk(ownerId);
    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }

    owner.name = name || owner.name;
    owner.contact = contact || owner.contact;
    owner.alternateContact = alternateContact || owner.alternateContact;
    owner.profession = profession || owner.profession;
    owner.bio = bio || owner.bio;
    owner.wardenName = wardenName || owner.wardenName;
    owner.wardenContact = wardenContact || owner.wardenContact;
    owner.wardenEmail = wardenEmail || owner.wardenEmail;
    owner.govId = govId || owner.govId;

    if (password) {
      owner.password = await bcrypt.hash(password, 10);
    }

    if (wardenEmail) {
      owner.ownersEmail = ownersEmail || owner.ownersEmail;
    }

    await owner.save();

    res.status(200).json({ message: "Owner updated successfully", owner });
  } catch (error) {
    console.error("Error updating owner:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("password/:id", async (req, res) => {
  const { id } = req.params;
  const { name, contact, alternateContact, email, password } = req.body;

  try {
    const owner = await Owner.findByPk(id);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    owner.name = name;
    owner.contact = contact;
    owner.alternateContact = alternateContact;
    owner.email = email;

    if (password) {
      owner.password = await bcrypt.hash(password, 10);
    }

    await owner.save();

    res.status(200).json({ message: "Owner details updated successfully" });
  } catch (error) {
    console.error("Error updating owner details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const { ownersEmail, password } = req.body;

    const owner = await Owner.findOne({ where: { ownersEmail } });

    if (!owner) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, owner.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid  password" });
    }

    const token = jwt.sign({ ownerId: owner.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      ownerId: owner.id,
      name: owner.name,
      email: owner.ownersEmail,
      token: token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// getprofile

router.get("/", verifyOwner, async (req, res) => {
  try {
    const ownerId = req.user.id;

    const owner = await Owner.findByPk(ownerId, {
      attributes: [
        "name",
        "contact",
        "alternateContact",
        "profession",
        "bio",
        "wardenName",
        "wardenContact",
        "wardenEmail",
        "govId",
        "ownersEmail",
      ],
    });

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(200).json(owner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// change password using email....

router.post("/change-password", async (req, res) => {
  const ownersEmail = req.body.email;
  const newPassword = req.body.newPassword;

  try {
    const owner = await Owner.findOne({ where: { ownersEmail } });

    if (!owner) {
      return res.status(404).json({ message: "Owner not found." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await owner.update({ password: hashedPassword });

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Error updating password." });
  }
});

//////////////////////

router.get("/property/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await PropertyList.findByPk(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const owner = await Owner.findOne({ where: { id: property.ownerId } });

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    return res.json(owner);
  } catch (error) {
    console.error("Error finding owner:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/property/:propertyId", async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await PropertyList.findByPk(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const {
      name,
      contact,
      alternateContact,
      profession,
      bio,
      wardenName,
      wardenContact,
      wardenEmail,
      govId,
    } = req.body;

    const updateValues = {
      name,
      contact,
      alternateContact,
      profession,
      bio,
      wardenName,
      wardenContact,
      govId,
    };

    if (wardenEmail) {
      updateValues.wardenEmail = wardenEmail;
    }

    await Owner.update(updateValues, { where: { id: property.ownerId } });

    return res.json({ message: "Owner data updated successfully" });
  } catch (error) {
    console.error("Error updating owner:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
