const express = require("express");
const router = express.Router();
const contactModel = require("../models/Contacts");

//@route get api/contacts
//@desc get all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await contactModel.find();
    res.status(200).json(contacts);
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching contacts" });
  }
});

//@route get api/contacts/:name
//@desc get contact by name
router.get("/:name", async (req, res) => {
  try {
    const contact = await contactModel.find({ contactName: req.params.name });
    if (contact.length === 0) {
      return res.status(404).json({ message: "Contacts not found." });
    }
    res.status(200).json(contact);
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching the contact" });
  }
});

//@route post api/contacts/
//@desc add new contact
router.post("/", async (req, res) => {
  try {
    const { contactName, telephone } = req.body;
    if (!contactName || !telephone) {
      res.status(400).json({ message: "Invalid inputs" });
    }
    await contactModel.create({
      contactName: contactName,
      telephone: telephone,
    });
    res.status(201).json({ message: "Contacts added successfully" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while adding the contact" });
  }
});

//@route PUT api/contacts/:name
//@desc update new contact details

router.put("/:name", async (req, res) => {
  try {
    let existingContact = await contactModel.findOne({
      contactName: req.params.name,
    });
    if (!existingContact) {
      return res.status(400).json({ message: "Contact not found." });
    }
    await contactModel.updateOne(
      { contactName: req.params.name },
      {
        contactName: req.body.contactName,
        telephone: req.body.telephone,
      }
    );
    res.status(200).json({ message: "Contact updated sucessfully" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while updating the contact" });
  }
});

//@route Delete api/contacts/:name
//@desc Delete contact
router.delete("/:name", async (req, res) => {
  try {
    const existingContact = await contactModel.findOne({
      contactName: req.params.name,
    });
    if (!existingContact) {
      return res.status(400).json({ message: "Contact not found" });
    }
    await contactModel.deleteOne({ contactName: req.params.name });
    res.status(200).json({ message: "Contact deleted sucessfully" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the contact" });
  }
});

module.exports = router;
