const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./config/dbConnect");
const http = require("http");
const PORT = process.env.PORT || 3000;

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

connectDB();

app.use("/", require("./routes/home.routes"));

const server = http.createServer(app);
server.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT} for requests`);
});
