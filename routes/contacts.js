const express = require("express");
const router = express.Router();
const contactModel = require("../models/Contact");

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
router.get("/:contactName", async (req, res) => {
  try {
    const contact = await contactModel.findOne({
      contactName: req.params.contactName,
    });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found." });
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

router.put("/:contactName", async (req, res) => {
  try {
    let contact = await contactModel.findOne({
      contactName: req.params.contactName,
    });
    if (!contact) {
      return res.status(400).json({ message: "Contact not found." });
    }
    await contactModel.updateOne(
      { contactName: req.params.contactName },
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
router.delete("/:contactName", async (req, res) => {
  try {
    const contact = await contactModel.findOne({
      contactName: req.params.contactName,
    });
    if (!contact) {
      return res.status(400).json({ message: "Contact not found" });
    }
    await contactModel.deleteOne({ contactName: req.params.contactName });
    res.status(200).json({ message: "Contact deleted sucessfully" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the contact" });
  }
});

module.exports = router;
