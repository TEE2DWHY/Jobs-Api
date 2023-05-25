const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(400).json({
      msg: `${Object.keys(err.keyValue)}(${Object.values(
        err.keyValue
      )}) is taken. Please Choose another`,
    });
  }
  return res.status(500).json({ msg: err });
};

module.exports = errorHandler;
