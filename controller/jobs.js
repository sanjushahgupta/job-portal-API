const jobModel = require("../models/Jobs");
module.exports.getJobById = async (req, res) => {
  try {
    const job = await jobModel.findOne({
      _id: req.params._id,
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }
    res.status(200).json(job);
  } catch (e) {
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the job" });
  }
};
