const mongoose = require("mongoose");
const CarSchema = new mongoose.Schema({
  plate: String,
  school: String,
  offense: Number,
});

mongoose.model("car", CarSchema);
