const mongoose = require("mongoose");
const ContactScheme = mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobDetails: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("contact", ContactScheme);
