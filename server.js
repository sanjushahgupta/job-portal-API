const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) =>
  res.json({ msg: "Welcome to the contact keeper API." })
);

app.listen(PORT, () => {
  console.log("Server started.");
});