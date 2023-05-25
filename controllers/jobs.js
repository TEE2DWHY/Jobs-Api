const Job = require("../models/Jobs");
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../middleWare/asyncWrapper");

const getAllJobs = asyncWrapper(async (req, res) => {
  const allJobs = await Job.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ allJobs });
});

const getJob = asyncWrapper(async (req, res) => {
  const job = await Job.find({
    _id: req.params.id,
    createdBy: req.user.userId,
  });
  if (!job) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `Job with ${id} does not exist` });
  }
  res.status(StatusCodes.OK).json({ job });
});

const createJob = asyncWrapper(async (req, res) => {
  req.body.createdBy = req.user.userId;
  console.log(req.user);
  const newJob = await Job.create(req.body);
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "new job is created", job: newJob });
});

const updateJob = asyncWrapper(async (req, res) => {
  const { company, position } = req.body;
  if (company === "" || position === "") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "company or position fields cannot be empty" });
  }
  const job = await Job.findByIdAndUpdate(
    { _id: req.params.id, createdBy: req.user.userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!job) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `id: ${req.params.id} does not exist.` });
  }
  res.status(StatusCodes.OK).json({ job });
});

const deleteJob = asyncWrapper(async (req, res) => {
  const job = await Job.findByIdAndDelete({
    _id: req.params.id,
    createdBy: req.user.userId,
  });
  res.status(StatusCodes.OK).send();
});

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
