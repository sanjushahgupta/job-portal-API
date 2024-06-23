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

module.exports.addNewJob = async (req, res) => {
  const { title, details } = req.body;
  if (!title || !details) {
    res.status(400).json({ message: "Invalid inputs" });
  }
  try {
    const newJobPost = await jobModel.create({
      title: title,
      details: details,
    });
    res.status(201).json({
      message: "Job added successfully",
      job: newJobPost,
    });
  } catch (e) {
    res.status(500).json({ message: "error while creating job posts" });
  }
};

module.exports.updateJobById = async (req, res) => {
  try {
    const job = await jobModel.findOne({
      _id: req.params._id,
    });
    if (!job) {
      return res.status(400).json({ message: "Job not found." });
    }
    try {
      const update = await jobModel.updateOne(
        { _id: req.params._id },
        {
          title: req.body.title,
          details: req.body.details,
        }
      );
      res.status(200).json({ message: "Job updated sucessfully" });
    } catch (e) {
      res
        .status(501)
        .json({ message: "Something went wrong, while updating job" });
    }
  } catch (e) {
    res
      .status(501)
      .json({ message: "Something went wrong, while updating job" });
  }
};

module.exports.deleteJobById = async (req, res) => {
  try {
    const job = await jobModel.findOne({
      _id: req.params._id,
    });
    if (!job) {
      return res.status(400).json({ message: "Job not found" });
    }
    await jobModel.deleteOne({ _id: req.params._id });
    res.status(200).json({ message: "Job deleted sucessfully" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the job" });
  }
};
