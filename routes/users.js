const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

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
      res.status(200).json({ msg: "User is registered." });
    } catch (err) {
      console.log(err.message);
    }
  }
);

module.exports = router;
