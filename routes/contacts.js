const express = require("express");
const router = express.Router();

//@route    GET api/contacts
//@desc     get all contacts
//@access   Private
router.get("/", (req, res) => {
  res.send("Contacts list");
});

//@route    POST api/contacts
//@desc     add new contact
//@access   private
router.post("/", (req, res) => {
  res.send("Add contact");
});

//@route    PUT api/contacts/:id
//@desc     update new contact details
//@access   Private
router.put("/:id", (req, res) => {
  res.send("contact updated");
});

//@route    Delete api/contacts/:id
//@desc     delete contact
//@access   Private
router.delete("/:id", (req, res) => {
  res.send("contact deleted");
});

module.exports = router;
