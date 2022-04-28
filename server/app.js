const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("./Car");

const Car = mongoose.model("car");
app.use(bodyParser.json());
const mongoURI =
  "mongodb+srv://carlotclust:wRNniBNuWwnEkzkm@cluster0.es6bc.mongodb.net/Project0?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected!");
});

mongoose.connection.on("error", (error) => {
  console.log("error: ", error);
});

app.get("/", (req, res) => {
  res.send("testing");
});

app.listen(3000, () => {
  console.log("listening on 3000");
});
