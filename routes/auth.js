const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secretKey = require("../config/config");
const { check, validationResult } = require("express-validator");

//@route    GET api/auth
//@desc     get loggedIn user
//@access   private
router.get("/", (req, res) => {
  res.send("LoggedIn user");
});

//@route    POST api/auth
//@desc     auth user -> get token
//@access   public
router.post(
  "/",
  [
    check("email", "Please enter a valid email.").isEmail(),
    check(
      "password",
      "Please enter password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      res.status(400).json({ error: error.array() });
    }
    let { email, password } = req.body;
    let user;
    let token;
    try {
      user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ user });
      }

      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        return res
          .status(400)
          .json({ msg: "Wrong password.Please try again." });
      }

      token = jwt.sign({ userid: user.id }, secretKey.secretKey, {
        expiresIn: "1d",
      });
      res.status(200).json(token);
    } catch (err) {
      res.status(500).json({ "Internal Server Error": err });
    }
  }
);

module.exports = router;
