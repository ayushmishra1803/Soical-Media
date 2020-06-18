// pass -  xcNM9iJvh4xODD3Q

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post')

const app = express();
mongoose.connect("mongodb+srv://ayush:xcNM9iJvh4xODD3Q@socailmedia-rdwr2.mongodb.net/socialmedia?retryWrites=true&w=majority").then((re) => {
  console.log("successfully Connect");

}).catch((re) => {
  console.log("Failed");

})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Request-With,Content-Type,Accept");
  res.setHeader("Access-Control-Allow-Method", "GET,POST,DELETE,PATCH,OPTIONS")
  next();
})
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })

  post.save();
  res.status(201).json({
    message: "Added successfully"
  });


})
app.get("/api/posts", (req, res, next) => {

  Post.find().then((re) => {
    console.log(re);
    res.json({
      message: 'Post Fetch Successfully',
      post: re


    });
  })


})
module.exports = app;

