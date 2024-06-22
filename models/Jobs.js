const mongoose = require("mongoose");
const JobScheme = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("job", JobScheme);
