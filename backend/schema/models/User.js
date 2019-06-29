const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserData = new Schema({
  name: String,
  age: Number,
  password: String,
  description: String,
  latitude: Number,
  longitude: Number,
  friends: [String]
});

module.exports = mongoose.model("User", UserData);
