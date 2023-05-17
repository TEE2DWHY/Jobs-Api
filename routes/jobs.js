const router = require("express").Router();

const {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");

//jobs
router.route("/create").post(createJob);
router.route("/").get(getAllJobs);
router.route("/:id").get(getJob).put(updateJob).delete(deleteJob);
module.exports = router;
