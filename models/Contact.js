const mongoose = require("mongoose");
const ContactScheme = mongoose.Schema({
  contactName: {
    type: String,
    required: true,
    unique: true,
  },
  telephone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("contact", ContactScheme);
