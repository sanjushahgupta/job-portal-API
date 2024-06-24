const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const { secretKey } = require("../config/config");
const controller = require("../controller/jobs");

const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];
  if (typeof header !== undefined) {
    const bearer = header.split(" ");
    req.token = bearer[1];
    try {
      jwt.verify(req.token, secretKey, async (err, data) => {
        if (err) {
          return res.sendStatus(403);
        } else {
          next();
        }
      });
    } catch (e) {
      return res
        .status(500)
        .json({ message: "An error occurred while fetching the job" });
    }
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
};

router.get("/:_id", checkToken, controller.getJobById);

router.post("/", checkToken, controller.addNewJob);

router.put("/:_id", checkToken, controller.updateJobById);

router.delete("/:_id", checkToken, controller.deleteJobById);

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
//@desc get job by id*/
module.exports = router;
