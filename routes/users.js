const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = require("../config/config");

//@route    POST
//@des      Register new user
//@access   Public

router.post("/signup", async (req, res) => {
  const { userName, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid input" });
  }
  try {
    bcrypt.hash(password, 10, async function (err, hashPassword) {
      await User.create({
        userName: userName,
        email: email,
        password: hashPassword,
      });
    });
    const payload = { email: email };
    const expire = { expiresIn: "1d" };
    const token = jwt.sign(payload, secretKey.secretKey, expire);
    res.status(200).json({ token: token });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error occured while creating account", e });
  }
});

module.exports = router;
