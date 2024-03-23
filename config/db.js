const mongoose = require("mongoose");
const db =
  "mongodb+srv://sanju:2rxbjjbd@contact-keeper.2usmgwz.mongodb.net/?retryWrites=true&w=majority&appName=contact-keeper";

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
