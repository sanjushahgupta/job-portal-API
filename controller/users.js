const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const { secretKey } = require("../config/config");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    await userModel.create({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });

    const payload = { email: req.body.email };
    const expire = { expiresIn: "1d" };
    const token = jwt.sign(payload, secretKey, expire);
    res.status(200).json({ token: token });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    return res.status(500).json({ message: "something went wrong" });
  }
};
module.exports.logIn = async (req, res) => {};
