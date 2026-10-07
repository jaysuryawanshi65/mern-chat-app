const mongoose = require("mongoose");

module.exports = async function connectDB() {
  try {
    await mongoose.connect(process.env.DB);
    console.log("DB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error(error);
    console.log("COULD NOT CONNECT TO DB");
    process.exit(1);
  }
};
