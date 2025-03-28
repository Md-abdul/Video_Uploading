const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] }, 
  fileSize: { type: Number, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true }, 
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  videos: {
    type: [videoSchema],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
