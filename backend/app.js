const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Request-With,Content-Type,Accept");
  res.setHeader("Access-Control-Allow-Method", "GET,POST,DELETE,PATCH,OPTIONS")
  next();
})
app.post("/api/posts", (req, res, next) => {
  const post = req.body;


  console.log(post);
  res.status(201).json({
    message: "Added successfully"
  });


})
app.use("/api/posts", (req, res, next) => {

  const post = [{ id: 'asd14', title: '1St', content: '1st' }, { id: 'asd14', title: '2St', content: '2st' }]

  res.json({
    message: 'Post Fetch Successfully',
    post: post
  })
})
module.exports = app;

