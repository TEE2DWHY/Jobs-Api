const errorHandler = (err, req, res, next) => {
  //handle duplicate unique values
  if (err.code === 11000) {
    return res.status(400).json({
      msg: `${Object.keys(err.keyValue)}(${Object.values(
        err.keyValue
      )}) is taken. Please Choose another`,
    });
  }
  //handle cast error
  if (err.name === "CastError") {
    return res.status(404).json({
      msg: `${err.value} does not exist in database`,
    });
  }
  //handle validation error
  if (err.name === "ValidationError") {
    return res.status(401).json({
      msg: `${err.message}`,
    });
  }
  return res.status(500).json({ msg: err });
};

module.exports = errorHandler;
