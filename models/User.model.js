const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    bio: {
      type: String
    },
    imageUrl: String,
    followers: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }, 
    {
      type: Schema.Types.ObjectId,
      ref: 'Business'
    }],
    following: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }, 
    {
      type: Schema.Types.ObjectId,
      ref: 'Business'
    }],
    /*location: {
      type: String
    }*/
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
