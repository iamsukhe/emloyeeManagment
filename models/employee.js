const mongoose = require("mongoose");

let employeeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  etype: String,
  hourlyRate: Number,
  totalRate: Number,
  totalAmount: Number,
});

let empoyeeModel = mongoose.model("Employee", employeeSchema);

module.exports = empoyeeModel;
