const express=require('express');
const router =express.Router();
const Post = require('../models/post')

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })

  post.save().then((re) => {
    res.status(201).json({
      message: "Added successfully",
      post: re._id

    });
  });

})

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({ _id: req.params.id }, post).then(re => {
    console.log(re);
    res.status(200).json({ message: "SuccessFulll" })
  })
})

router.get("/:id", (req, res, next) => {
  Post.findById(re.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    }
    else {
      res.status(404).json({ message: "Post Not Found" })
    }
  })
})


router.get("", (req, res, next) => {

  Post.find().then((re) => {

    res.json({
      message: 'Post Fetch Successfully',
      post: re
    });
  })
})

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(re => {
    console.log(re);
    res.status(200).json({ message: "Post  delete" })

  })
})

module.exports=router;
