const express = require('express');
const router = express.Router();
const Post = require('../models/post')
const multer = require('multer')
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image.jpg': 'jpg'

}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isvalid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid MIMI")
    if (isvalid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('_');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "_" + Date.now() + "." + ext);
  }
});

router.post("", multer({ storage: storage }).single('image'), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host")
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename
  })

  post.save().then((re) => {
    res.status(201).json({
      message: "Added successfully",
      post: {
        ...re,
        id: re._id,

      }

    });
  });

})

router.put("/:id", multer({ storage: storage }).single('image'), (req, res, next) => {
  let imagePath=req.body.imagePath
  if(req.file)
  {
    const url = req.protocol + '://' + req.get("host")
    imagePath=url+"/images/"+req.file.filename
  }
  const post = new Post({

    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath:imagePath
  })
  Post.updateOne({ _id: req.params.id }, post).then(re => {

    res.status(200).json({ message: "SuccessFulll" })
  })
})

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
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

module.exports = router;
