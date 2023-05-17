const getAllJobs = (req, res) => {
  res.status(200).json({ msg: "this is a result of all jobs" });
};

const getJob = (req, res) => {
  res.status(200).json({ msg: "job output" });
};

const createJob = (req, res) => {
  res.status(201).json({ msg: "new job is created" });
};

const updateJob = (req, res) => {
  res.status(200).json({ msg: "job detail is updated" });
};

const deleteJob = (req, res) => {
  res.status(200).json({ msg: "job is deleted" });
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
