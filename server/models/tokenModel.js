const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User", unique: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true }
});

tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Token = mongoose.model("Token", tokenSchema);
module.exports = { Token };
