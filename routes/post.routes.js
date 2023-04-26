const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/Post.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// GET /api/posts
router.get("/posts", (req, res, next) => {
  Post.find({})
    .then((posts) => res.status(200).json(playdates))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving posts" });
    });
});

// GET /api/posts/:postId
router.get("/posts/:postId", (req, res, next) => {
  const postId = req.params.postId;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Post.findById(postId)
    .then((post) => res.status(200).json(playdate))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving post from database" });
    });
});

// POST /api/posts
router.post("/posts", isAuthenticated, (req, res, next) => {
  const { imageUrl, location, caption, business } = req.body;

  Post.create({
    imageUrl,
    location,
    caption,
    business,
    createdBy: { _id: req.payload._id, name: req.payload.name },
  })
    .then((newPost) => res.status(201).json(playdate))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error creating new post" });
    });
});

// PUT /api/posts/:postId
router.put("/posts/:postId", isAuthenticated, (req, res, next) => {
  const postId = req.params.postId;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Post.findByIdAndUpdate(postId, req.body, { new: true })
    .then((updatedPost) => {
      res.json({ post: updatedPost });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error updating post details" });
    });
});

// DELETE /api/posts/:postId
router.delete("/post/:postId", isAuthenticated, (req, res, next) => {
  const postId = req.params.postId;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Post.findByIdAndDelete(postId)
    .then(() =>
      res.json({ message: `Post with ${postId} was removed successfully` })
    )
    .catch((error) => res.json(error));
});
