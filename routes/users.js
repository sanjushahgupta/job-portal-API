const express = require("express");
const router = express.Router();
const userModel = require("../models/User");
const controller = require("../controller/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/config");

//@route    POST
//@des      Register new user
//@access   Public

router.post("/signup", async (req, res) => {
  const { userName, email, password } = req.body;
  if (!email || !password || !userName) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    await controller.registerUser(req, res);
  } catch (e) {
    return res.status(500).json({ message: e });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid inputs." });
  }

  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Email does not exists." });
    }

    bcrypt.compare(password, user.password, function (err, passwordMatch) {
      if (err) {
        return res.status(500).json({ message: "Error comparing passwords." });
      }

      if (!passwordMatch) {
        return res.status(400).json({ message: "Password doesn't match." });
      }

      const token = jwt.sign({ email: email }, secretKey, {
        expiresIn: "1d",
      });
      return res.status(200).json({ token: token });
      //
    });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
