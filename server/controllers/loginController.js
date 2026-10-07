const bcrypt = require("bcrypt");
const { User, validateLogin } = require("../models/userModel");

module.exports = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (!user) return res.status(401).send({ message: "Invalid Email" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ message: "Invalid Password" });
    if (!user.verified) return res.status(400).send({ message: "Please verify your email first" });

    const token = user.generateAuthToken();
    res.cookie("authToken", token, {
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(200).send({ message: "Login successful", status: 200 });
  } catch (error) {
    console.error("Error in loginController:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
