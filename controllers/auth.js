const User = require("../models/User");
const asyncWrapper = require("../middleWare/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

const register = asyncWrapper(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: cryptoJs.AES.encrypt(
      req.body.password,
      process.env.SECRET
    ).toString(),
  });
  const token = jwt.sign(
    { userId: newUser._id, name: newUser.name },
    process.env.SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
  res.status(StatusCodes.CREATED).json({
    msg: "user created successfully",
    user: { name: newUser.name, token: token },
  });
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide email and password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid Credentials" });
  }
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );

  res.status(StatusCodes.OK).json({ msg: user.name, token: token });
});

module.exports = { register, login };
