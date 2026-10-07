const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { User, validateRegister } = require("../models/userModel");
const { Token } = require("../models/tokenModel");
const sendEmail = require("../utils/sendEmail");

module.exports = async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const email = req.body.email.toLowerCase();
    let user = await User.findOne({ email });

    if (user?.verified) return res.status(409).send({ message: "User with given email already exists" });
    if (user?.verificationLinkSent) return res.status(400).send({ message: "A verification link has already been sent" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT || 10));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await new User({ ...req.body, email, password: hashPassword }).save();
    const rawToken = crypto.randomBytes(32).toString("hex");
    await Token.findOneAndDelete({ userId: user._id });
    await new Token({
      userId: user._id,
      token: rawToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000)
    }).save();

    const url = `${process.env.BASE_URL}/users/${user._id}/verify/${rawToken}`;
    await sendEmail(user.email, "Verify Email", url);
    user.verificationLinkSent = true;
    await user.save();

    res.status(201).send({
      message: process.env.SMTP_USER ? `Verification email sent to ${user.email}` : "Registration successful. SMTP is not configured; use the verification URL printed by the server.",
      verificationUrl: process.env.NODE_ENV === "development" ? url : undefined
    });
  } catch (error) {
    console.error("Error in registerController:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
