const protect = require("../middleware/protect");
const Message = require("../models/messageModel");

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = await protect(req);
    const ourUserId = userData._id;
    const messages = await Message.find({
      $or: [
        { sender: ourUserId, recipient: userId },
        { sender: userId, recipient: ourUserId }
      ]
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
