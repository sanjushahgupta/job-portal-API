const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const jobModel = require("../models/Jobs");
const secretKey = require("../config/config");

const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];
  if (typeof header !== undefined) {
    const bearer = header.split(" ");
    req.token = bearer[1];
    next();
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};

//@route get api/jobs
//@desc get all jobs
/*router.get("/", async (req, res) => {
  try {
    const jobs = await jobModel.find();
    res.status(200).json(jobs);
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching jobs" });
  }
});*/

//@route get api/jobs/:_id
//@desc get job by id
router.get("/:_id", checkToken, async (req, res) => {
  try {
    jwt.verify(req.token, secretKey.secretKey, async (err, data) => {
      if (err) {
        console.log("Unauthorized", err);
        res.sendStatus(403);
      } else {
        const job = await jobModel.findOne({
          _id: req.params._id,
        });
        if (!job) {
          return res.status(404).json({ message: "Job not found." });
        }
        res.status(200).json(job);
      }
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching the job" });
  }
});

//@route post api/jobs/
//@desc add new job
router.post("/", checkToken, async (req, res) => {
  try {
    jwt.verify(req.token, secretKey.secretKey, async (err, data) => {
      if (err) {
        console.log("Unauthorized", err);
        res.sendStatus(403);
      } else {
        const { jobTitle, jobDetails } = req.body;
        if (!jobTitle || !jobDetails) {
          res.status(400).json({ message: "Invalid inputs" });
        }
        const job = await jobModel.findOne({
          jobTitle: req.params.jobTitle,
        });

        const newJobPost = await jobModel.create({
          jobTitle: jobTitle,
          jobDetails: jobDetails,
        });
        res.status(201).json({
          message: "Job added successfully",
          job: newJobPost,
        });
      }
    });
  } catch (e) {
    res.status(500).json({ message: "An error occurred while adding the job" });
  }
});

//@route PUT api/job/:_id
//@desc update new job details

router.put("/:_id", checkToken, async (req, res) => {
  try {
    jwt.verify(req.token, secretKey.secretKey, async (err, data) => {
      if (err) {
        console.log("Unauthorized", err);
        res.sendStatus(403);
      } else {
        let job = await jobModel.findOne({
          _id: req.params._id,
        });
        if (!job) {
          return res.status(400).json({ message: "Job not found." });
        }
        const updateJob = await jobModel.updateOne(
          { _id: req.params._id },
          {
            jobTitle: req.body.jobTitle,
            jobDetails: req.body.jobDetails,
          }
        );
        res.status(200).json({ message: "Job updated sucessfully" });
      }
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while updating the Job" });
  }
});

//@route Delete api/job/:jobId
//@desc Delete job
router.delete("/:_id", checkToken, async (req, res) => {
  try {
    jwt.verify(req.token, secretKey.secretKey, async (err, data) => {
      if (err) {
        console.log("Unauthorized", err);
        res.sendStatus(403);
      } else {
        const job = await jobModel.findOne({
          _id: req.params._id,
        });
        if (!job) {
          return res.status(400).json({ message: "Job not found" });
        }
        await jobModel.deleteOne({ _id: req.params._id });
        res.status(200).json({ message: "Job deleted sucessfully" });
      }
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the job" });
  }
});

module.exports = router;
