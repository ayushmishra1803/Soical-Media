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
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })

  post.save().then((re)=>{
    res.status(201).json({
      message: "Added successfully",
      post:re._id

    });
  });

})

app.get("/api/posts", (req, res, next) => {

  Post.find().then((re) => {

    res.json({
      message: 'Post Fetch Successfully',
      post: re
    });
  })
})

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(re => {
    console.log(re);
    res.status(200).json({ message: "Post  delete" })

  })
})
module.exports = app;

