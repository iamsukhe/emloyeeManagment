const mongoose = require("mongoose");

const URI =
  "mongodb+srv://nodejsproject:node1234@cluster0.zdvxb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(URI, { useNewUrlParser: true });
    console.log("DB connnected");
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
};

module.exports = connectDB;
