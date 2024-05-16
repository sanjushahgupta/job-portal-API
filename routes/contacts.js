const express = require("express");
const router = express.Router();
const contact = require("../models/Contacts");

//@desc get all contacts
router.get("/", async (req, res) => {
  try {
    await contact.find().then((data) => {
      const listofContacts = data;
      res.status(200);
    });
  } catch (e) {
    res.status(501);
  }
});

router.get("/:name", async (req, res) => {
  try {
    await contact.find({ contactName: req.params.name }).then((data) => {
      res.send(data).status(200);
    });
  } catch (e) {
    res.send("Sorry, Something went wrong.").status(500);
  }
});

//@desc add new contact
router.post("/", async (req, res) => {
  try {
    let contactName = req.body.contactName;
    let telephone = req.body.telephone;
    if (!contactName || !telephone) {
      res.status(400).send("Invalid inputs");
    }
    await contact.create({
      contactName: contactName,
      telephone: telephone,
    });
    res.status(200).send("Contacts added successfully");
  } catch (e) {
    res.status(501);
  }
});

//@route    PUT api/contacts/:name
//@desc     update new contact details

router.put("/:name", async (req, res) => {
  let nameExists = await contact.findOne({ contactName: req.params.name });
  if (nameExists) {
    await contact.updateOne(
      { contactName: req.params.name },
      {
        contactName: req.body.contactName,
        telephone: req.body.telephone,
      }
    );
    res.send("contact updated").status(200);
  } else {
    res.send("contact not found.").status(500);
  }
});

//@route    Delete api/contacts/:id
//@desc     delete contact
//@access   Private
router.delete("/:name", async (req, res) => {
  try {
    let contactsExists = await contact.findOne({
      contactName: req.params.name,
    });
    if (contactsExists) {
      await contact.deleteOne({ contactName: req.params.name });
      res.send("contact deleted");
    } else {
      res.send("Contact not found.");
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
