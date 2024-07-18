const express = require("express");
const app = express();
var cors = require("cors");
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/db");

connectDB();

app.use(cors());
//init middleware
app.use(express.json({ extended: true }));

app.get("/", (req, res) => res.json({ msg: "Welcome to the JobManage API." }));

//define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/jobs", require("./routes/jobs"));

app.listen(PORT, () => {
  console.log("Server started.");
});
