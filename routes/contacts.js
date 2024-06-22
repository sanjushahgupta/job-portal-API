const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const contactModel = require("../models/Contact");
const secretKey = require("../config/config");

const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];
  if (typeof header !== undefined) {
    const bearer = header.split(" ");
    req.token = bearer[1];
    next();
  } else {
    res.status(403).json({ message: "Unauthorized 6" });
  }
};

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
router.get("/:jobTitle", async (req, res) => {
  try {
    const contact = await contactModel.findOne({
      jobTitle: req.params.jobTitle,
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
router.post("/", checkToken, async (req, res) => {
  try {
    jwt.verify(req.token, secretKey.secretKey, async (err, data) => {
      if (err) {
        console.log("Unauthorized", err);
        res.sendStatus(403);
      } else {
        const { jobTitle, jobDetails: jobDetails } = req.body;
        if (!jobTitle || !jobDetails) {
          res.status(400).json({ message: "Invalid inputs" });
        }
        await contactModel.create({
          jobTitle: jobTitle,
          jobDetails: jobDetails,
        });
        res.status(201).json({ message: "Contacts added successfully" });
      }
    });

    //login page
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while adding the contact" });
  }
});

//@route PUT api/contacts/:name
//@desc update new contact details

router.put("/:jobTitle", async (req, res) => {
  try {
    let contact = await contactModel.findOne({
      jobTitle: req.params.jobTitle,
    });
    if (!contact) {
      return res.status(400).json({ message: "Contact not found." });
    }
    await contactModel.updateOne(
      { jobTitle: req.params.jobTitle },
      {
        jobTitle: req.body.jobTitle,
        jobTitle: req.body.jobTitle,
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
router.delete("/:jobTitle", async (req, res) => {
  try {
    const contact = await contactModel.findOne({
      jobTitle: req.params.jobTitle,
    });
    if (!contact) {
      return res.status(400).json({ message: "Contact not found" });
    }
    await contactModel.deleteOne({ jobTitle: req.params.jobTitle });
    res.status(200).json({ message: "Contact deleted sucessfully" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the contact" });
  }
});

module.exports = router;
