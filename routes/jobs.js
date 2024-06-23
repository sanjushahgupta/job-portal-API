const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const jobModel = require("../models/Jobs");
const { secretKey } = require("../config/config");
const controller = require("../controller/jobs");

const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];
  if (typeof header !== undefined) {
    const bearer = header.split(" ");
    req.token = bearer[1];
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
};

router.get("/:_id", checkToken, async (req, res) => {
  try {
    jwt.verify(req.token, secretKey, async (err, data) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        await controller.getJobById(req, res);
      }
    });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "An error occurred while fetching the job" });
  }
});

//@route post api/jobs/
//@desc add new job
router.post("/", checkToken, async (req, res) => {
  try {
    jwt.verify(req.token, secretKey, async (err, data) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        await controller.addNewJob(req, res);
      }
    });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "An error occurred while adding the job" });
  }
});

//@route PUT api/job/:_id
//@desc update new job details
router.put("/:_id", checkToken, async (req, res) => {
  try {
    jwt.verify(req.token, secretKey, async (err, data) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        await controller.updateJobById(req, res);
      }
    });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "An error occurred while updating the Job" });
  }
});

//@route Delete api/job/:jobId
//@desc Delete job
router.delete("/:_id", checkToken, async (req, res) => {
  try {
    jwt.verify(req.token, secretKey, async (err, data) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        await controller.deleteJobById(req, res);
      }
    });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "An error occurred while updating the Job" });
  }
});

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
module.exports = router;
