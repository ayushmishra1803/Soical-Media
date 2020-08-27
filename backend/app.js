// pass -  xcNM9iJvh4xODD3Q

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PostRoutes = require("./routes/posts");

const app = express();
mongoose
  .connect(
    "mongodb+srv://ayush:xcNM9iJvh4xODD3Q@socailmedia-rdwr2.mongodb.net/socialmedia?retryWrites=true&w=majority"
  )
  .then((re) => {
    console.log("successfully Connect");
  })
  .catch((re) => {
    console.log("Failed");
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT,DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", PostRoutes);
module.exports = app;
