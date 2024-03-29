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

router.post(
  "/",
  [
    check("name", "Name is required.").notEmpty(),
    check("email", "Please enter valid email.").isEmail(),
    check(
      "password",
      "Please enter password with 5 or more characters."
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { name, password, email } = req.body;

    let user = await User.findOne({ email });
    try {
      if (user) {
        return res.status(400).json({ msg: "Email already exists." });
      }
      const salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(password, salt);
      user = new User({ name, password: hashedPassword, email });
      await user.save();

      let token;
      try {
        token = jwt.sign({ userId: user.id }, secretKey.secretKey, {
          expiresIn: "1d",
        });
        res.status(200).json(token);
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: "Internal server error." });
    }
  }
);

module.exports = router;
