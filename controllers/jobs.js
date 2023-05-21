const Job = require("../models/Jobs");
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middleWare/asyncWrapper");

const getAllJobs = (req, res) => {
  res.status(200).json({ msg: "this is a result of all jobs" });
};

const getJob = (req, res) => {
  res.status(200).json({ msg: "job output" });
};

const createJob = asyncWrapper(async (req, res) => {
  req.body.createdBy = req.user.userId;
  console.log(req.user);
  const newJob = await Job.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "new job is created", job: newJob });
});

const updateJob = (req, res) => {
  res.status(200).json({ msg: "job detail is updated" });
};

const deleteJob = (req, res) => {
  res.status(200).json({ msg: "job is deleted" });
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
