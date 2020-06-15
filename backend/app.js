const express = require('express');
const app = express();
app.use("/api/posts", (req, res, next) => {

  const post = [{ id: 'asd14', title: '1St', content: '1st' }, { id: 'asd14', title: '2St', content: '2st' }]

  res.json({
    message: 'Post Fetch Successfully',
    post: post
  })
})
module.exports = app;
