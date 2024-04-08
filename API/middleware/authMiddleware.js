const jwt = require("jsonwebtoken");
const { User } = require("../models");
const Owner = require("../models/Owner");

const authGuard = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.id);
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, Token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, No token" });
  }
};

const verifyOwner = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Owner.findByPk(decoded.id);
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, Token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, No token" });
  }
};

module.exports = { authGuard, verifyOwner };
