const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
require("./Car");

const Car = mongoose.model("car");
app.use(express.json());
app.use(cors());

//fix db name
const mongoURI =
  "mongodb+srv://carlotaccess:cRy4J3R2eZnTBSve@cluster0.es6bc.mongodb.net/Cluster0?retryWrites=true&w=majority";
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

app.post("/handlecar", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.listen(process.env.PORT || 3125);
