const { User } = require("../models/userModel");

module.exports = async (req, res) => {
  try {
    const users = await User.find({ verified: true }).select("firstName lastName email avatarLink");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Could not load users" });
  }
};
