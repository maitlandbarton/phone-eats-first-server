const { Schema, model } = require("mongoose");

const businessSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  bio: {
    type: String,
  },
  imageUrl: String,
  followers: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    {
      type: Schema.Types.ObjectId,
      ref: "Business",
    }],
  following: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    {
      type: Schema.Types.ObjectId,
      ref: "Business",
    }],
   events: [{
    type: Schema.Types.ObjectId,
    ref: "Event"
   }],
   /*location: {
    type: String
   }*/
});

const Business = model("Business", businessSchema);

module.exports = Business;
