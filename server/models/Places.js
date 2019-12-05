const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placesSchema = new Schema({
  id: String,
  name: String,
  rating: Number,
  price: String,
  lat: Number,
  lng: Number
});

const Places = mongoose.model("Places", placesSchema);

module.exports = Places;
