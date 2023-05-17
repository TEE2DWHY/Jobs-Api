const mongoose = require("mongoose");

const connect = async (url) => {
  try {
    await mongoose.connect(url);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connect;
