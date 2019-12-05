const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
  email: String,
  favorites: Array,
  places: [{ type: Schema.Types.ObjectId, ref: "places" }],
  profilePhoto: {
    caption: { type: String },
    imageUrl: { type: String }
  }
});

module.exports = mongoose.model("User", userSchema);
