const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const authorization = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith === "Bearer ") {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Authentication invalid" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { _id, name } = payload;
    req.user = { _id, name, token };
    next();
  } catch (err) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Unauthorized user" });
  }
};

module.exports = authorization;
