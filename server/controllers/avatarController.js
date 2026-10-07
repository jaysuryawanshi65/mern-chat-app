const Avatar = require("../models/avatars");

async function avatarController(req, res) {
  try {
    const { link } = req.body;
    if (!link) return res.status(400).json({ error: "Link is required" });
    const avatar = await Avatar.findOneAndUpdate({ link }, { link }, { upsert: true, new: true });
    res.status(201).json({ success: true, message: "Avatar link added successfully", avatar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllAvatars(req, res) {
  try {
    const avatars = await Avatar.find().sort({ createdAt: 1 });
    res.status(200).json({ success: true, avatars });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { avatarController, getAllAvatars };
