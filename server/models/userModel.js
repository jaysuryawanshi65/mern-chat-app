const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationLinkSent: { type: Boolean, default: false },
    avatarLink: { type: String, default: "https://i.imgur.com/qGsYvAK.png" }
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    },
    process.env.JWTPRIVATEKEY,
    { expiresIn: "7d" }
  );
};

const User = mongoose.model("User", userSchema);

const validateRegister = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().trim().required().label("First Name"),
    lastName: Joi.string().trim().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity({
      min: 6,
      max: 100,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 0,
      requirementCount: 3
    }).required().label("Password")
  });
  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password")
  });
  return schema.validate(data);
};

module.exports = { User, validateRegister, validateLogin };
