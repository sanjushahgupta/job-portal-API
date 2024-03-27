const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");

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
  (req, res) => {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    res.send(req.body);
  }
);

module.exports = router;
