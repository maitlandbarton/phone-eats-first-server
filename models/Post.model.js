const { Schema, model } = require("mongoose");

const postSchema = newSchema({
  imageUrl: {
    type: String,
    required: true,
  },
  location: String,
  caption: String,
  likedBy: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    {
      type: Schema.Types.ObjectId,
      ref: "Business",
    }],
  createdBy: {
    type: Schema.Types.ObjectId,
    refPath: "createdByModel",
  },
  createdByModel: {
    type: String,
    required: true,
    enum: ["User", "Admin"],
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: "Business"
  },
  // location: String
});

const Post = model("Post", postSchema);

module.exports = Post;
