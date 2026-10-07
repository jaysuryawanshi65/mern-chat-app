const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const getUserFromToken = (req) => {
  const token = req.cookies?.authToken;
  if (!token) return null;
  return jwt.verify(token, process.env.JWTPRIVATEKEY);
};

const profileController = async (req, res) => {
  try {
    const userData = getUserFromToken(req);
    if (!userData) return res.status(401).json({ message: "No token" });
    const user = await User.findById(userData._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const profileUpdate = async (req, res) => {
  try {
    const userData = getUserFromToken(req);
    if (!userData) return res.status(401).json({ message: "No token" });
    const { firstName, lastName, avatarLink } = req.body;
    const user = await User.findByIdAndUpdate(
      userData._id,
      { firstName, lastName, avatarLink },
      { new: true, runValidators: true }
    ).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not update profile" });
  }
};

module.exports = { profileController, profileUpdate };
