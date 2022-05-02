const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("./Car");

const Car = mongoose.model("car");
app.use(bodyParser.json());
app.use(cors());

//fix db name
const mongoURI =
  "mongodb+srv://carlotaccess:<pass>e@cluster0.es6bc.mongodb.net/Cluster0?retryWrites=true&w=majority";
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

let lastAlter = { misplaced: false };

app.post("/handlecar", async (req, res) => {
  // console.log(req.body);
  let reData = { warningLevel: 0, misplacedCount: 0 };
  lastAlter.misplaced != req.body.misplaced
    ? (lastAlter.misplaced = lastAlter.misplaced)
    : (lastAlter.misplaced = req.body.misplaced);

  let query = await Car.find({ plate: req.body.plate });

  if (query.length === 0) {
    if (req.body.misplaced) {
      await new Car({
        plate: req.body.plate,
        school: req.body.school,
        offense: 1,
        misplaced: 1,
      }).save();
      reData.warningLevel = 1;
      reData.misplacedCount = 1;
    } else {
      await new Car({
        plate: req.body.plate,
        school: req.body.school,
        offense: 1,
        misplaced: 0,
      }).save();
      reData.warningLevel = 1;
      reData.misplacedCount = 0;
    }
  } else if (query.length > 0 && req.body.isEdit) {
    // console.log("tset");
    let misplacedValue;
    console.log(lastAlter.misplaced);
    if (lastAlter.misplaced) {
      misplacedValue = req.body.misplaced
        ? query[0].misplaced
        : query[0].misplaced - 1;
    } else {
      misplacedValue = req.body.misplaced
        ? query[0].misplaced + 1
        : query[0].misplaced;
    }

    await Car.updateOne(
      { plate: req.body.plate },
      {
        plate: req.body.editPlate,
        school: req.body.school,
        misplaced: misplacedValue,
      }
    );

    reData.warningLevel = query[0].offense;
    reData.misplacedCount = misplacedValue;
  } else {
    // console.log("qwe");
    let misplacedValue = req.body.misplaced
      ? query[0].misplaced + 1
      : query[0].misplaced;

    await Car.updateOne(
      { plate: req.body.plate },
      {
        offense: query[0].offense + 1,
        misplaced: misplacedValue,
        school: req.body.school,
      }
    );
    reData.warningLevel = query[0].offense + 1;
    reData.misplacedCount = misplacedValue;
  }
  let finalValue = JSON.stringify(reData).replace("Object", "");
  // console.log(finalValue);
  lastAlter.misplaced = req.body.misplaced;
  res.end(finalValue);
});

app.listen(process.env.PORT || 3125);
