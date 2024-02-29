const express = require("express");
const app = express();
// const mongoose = require("mongoose");
// const validator = require("validator");
const connectDB = require("./db/connection");
const Student = require("./models/students");
const studentRouter = require("./router/student");

const port = process.env.port || 3000;

app.use(express.json());
app.use(studentRouter);

app.post("/", (req, res) => {
  res.send("Home page");
});

app.listen(port, () => {
  console.log(`server is runnig in ${port}`);
});
