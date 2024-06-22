const mongoose = require("mongoose");
const JobScheme = mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobDetails: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("job", JobScheme);
