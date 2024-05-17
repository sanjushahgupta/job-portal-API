const express = require("express");
const router = express.Router();

//@route    GET api/auth
//@desc     get loggedIn user
//@access   private
router.get("/", (req, res) => {
  res.send("LoggedIn user");
});

//@route    POST api/auth
//@desc     auth user -> get token
//@access   public
router.post("/login", (req, res) => {
  res.send("Log in user");
});

module.exports = router;
