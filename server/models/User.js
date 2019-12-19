const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
  email: String,
  places: Array,
  following: Array,
  followers: Array,
  profilePhoto: {
    caption: { type: String },
    imageUrl: { type: String }
  },
  city: String
});

module.exports = mongoose.model("User", userSchema);
