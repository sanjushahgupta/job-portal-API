const mongoose = require("mongoose");
const db = process.env.DATABASE_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("Database connected.");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = connectDB;
