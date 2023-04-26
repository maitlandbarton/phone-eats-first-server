const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// GET /api/profile/:userId
router.get("/profile/:userId", isAuthenticated, (req, res, next) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(userId)
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error retrieving user details" });
    });
});

// PUT /api/profile/:userId
router.put("/profile/:userId", isAuthenticated, (req, res, next) => {
  const userId = req.params.userId;
  const { imageUrl, bio } = req.body; // don't really  need this line

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((updatedUser) => {
      res.json({ user: updatedUser });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error updating user details" });
    });
});

// DELETE /api/profile/:userId
router.delete("/profile/:userId", isAuthenticated, (req, res, next) => {
    const userId = req.params.userId;

    User.findByIdAndDelete(userId)
        .then(() => res.json({ message: `User with ${userId} was removed successfully` }))
        .catch((error) => res.json(error));
});
