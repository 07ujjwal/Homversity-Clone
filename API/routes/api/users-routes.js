const router = require("express").Router();
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const upload = require("../../config/multer");

const errMsg = "No user found with this id";

router.get("/", async (req, res) => {
  try {
    const dbUsers = await User.findAll({
      attributes: [
        "id",
        "username",
        "email",
        "phone_number",
        "address",
        "image",
        "gender",
        "bio",
        "priority",
        "created_at",
        "updated_at",
        "status",
      ],
    });
    res.json(dbUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const dbUser = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        "id",
        "username",
        "email",
        "phone_number",
        "address",
        "image",
        "gender",
        "bio",
        "priority",
        "created_at",
        "updated_at",
        "status",
      ],
    });
    if (!dbUser) {
      res.status(404).json({ message: errMsg });
      return;
    }
    res.json(dbUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, phoneNumber, password } = req.body;

    if (!username || !email || !phoneNumber || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const newUser = await User.create({
      username,
      email,
      phoneNumber,
      password,
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      userId: newUser.id,
      image: newUser.image,
      username: newUser.username,
      email: newUser.email,
      token: token,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      userId: user.id,
      image: user.image,
      username: user.username,
      email: user.email,
      token: token,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//change userpassword....

router.post("/change-password", async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ message: "Please provide both email and new password." });
  }

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedPassword });

    res.json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Error updating password." });
  }
});

router.post(
  "/update-profile-photo",
  upload.single("photo"),
  async (req, res) => {
    try {
      const { userId } = req.body;
      const { filename } = req.file;

      console.log("User ID:", userId);
      console.log("Filename:", filename);

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await user.update({ image: filename });

      console.log("User updated:", user);

      res.status(200).json({
        message: "Profile photo updated successfully",
        imageUrl: filename,
      });
    } catch (error) {
      console.error("Error updating profile photo:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
