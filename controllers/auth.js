const User = require("../models/User");
const asyncWrapper = require("../middleWare/asyncWrapper");
const { StatusCodes } = require("http-status-codes");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

const register = asyncWrapper(async (req, res) => {
  // Register new user
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: cryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECRET
      ).toString(),
    });

    await sendEmail({
      email: req.body.email,
      subject: "Confirm Email Address",
      message: "Confirm email address by using this Link",
    });

    res.status(StatusCodes.CREATED).json({
      msg: "user created successfully",
      user: { name: newUser.name },
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "An error occurred while sending the email.",
    });
  }
});

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  //Validate input fields
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide email and password" });
  }
  //Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid Credentials" });
  }
  //Compare Password
  const hashedPassword = cryptoJs.AES.decrypt(
    user.password,
    process.env.SECRET
  );
  const originalPassword = hashedPassword.toString(cryptoJs.enc.Utf8);
  if (originalPassword !== password) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "invalid credentials" });
  }
  //Create user token upon successful login
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
  res.status(StatusCodes.OK).json({ msg: user.name, token: token });
});

//export controllers
module.exports = { register, login };
