const express = require("express");
const router = express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = require("../config/config");

//@route    POST
//@des      Register new user
//@access   Public

router.post("/signup", async (req, res) => {
  const { userName, email, password } = req.body;
  if (!email || !password || !userName) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      userName: userName,
      email: email,
      password: hashedPassword,
    });

    const payload = { email: email };
    const expire = { expiresIn: "1d" };
    const token = jwt.sign(payload, secretKey.secretKey, expire);

    res.status(200).json({ token: token });
  } catch (e) {
    if (e.code === 11000) {
      res.status(400).json({ message: "Email is already registered" });
    } else {
      res.status(500).json({ message: "Error occured while creating account" });
    }
  }
});

module.exports = router;
