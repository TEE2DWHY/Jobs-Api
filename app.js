const express = require("express");
const app = express();
require("dotenv").config();
const connectDb = require("./db/connect");
const authRouter = require("./routes/auth");
const jobRouter = require("./routes/jobs");
const notFound = require("./middleWare/notFound");
const errorHandler = require("./middleWare/errorHandler");
const authMiddleWear = require("./middleWare/authentication");
//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
//middleWear
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/job", authMiddleWear, jobRouter);
//notFound
app.use(notFound);
//errorHandler
app.use(errorHandler);

//set app port
const port = process.env.PORT || 8000;
//start db connection
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, console.log(`server is running on port: ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
