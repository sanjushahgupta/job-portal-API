const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/config");

//@route    POST api/auth
//@desc     auth user -> get token
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid inputs." });
  }

  try {
    const user = await User.findOne({ email: email });

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
      res.status(200).json({ token: token });
    });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
