const mongoose = require("mongoose");

let userImageSchema = new mongoose.Schema({
  name: String,
});

let userImageModel = mongoose.model("UserImage", userImageSchema);

module.exports = userImageModel;
