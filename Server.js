const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const PORT = 4328;
const router = express.Router();
const request = require("request");

let moment = require("moment");

app.use(express.static(path.join(__dirname, "components")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  // ** Only for testing purposes. Will be modified when live **
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  next();
});

mongoose.connect("mongodb://localhost/farms", { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;
const farminSchema = new Schema({
  name: String,
  size: Number,
  um: String,
  ponds: [{ name: String, size: Number, parentFarm: String }],
});

const farmincollection = mongoose.model(
  "farmincollections",
  farminSchema,
  "farmincollections"
);
const farms = mongoose.model("farm", farminSchema);

let newFarm; // below first boilerplate for routes in general

app.get("/api/:tSize", function (req, res) {
  let parentFarm = req.params.parentFarm;
  let pondname = req.params.pondname;

  // Could be replaced with <sum> in mongodb
  request(`http://localhost:4328/${parentFarm}`, async function (
    error,
    result,
    data
  ) {
    let tSize = 0;
    let farm = await JSON.parse(data);
    farm.ponds.map((p) => (tSize = +p.size));
    res.send(tSize);
  });
});

app.get("/farms", async function (req, res) {
  await farmincollection.find({}, async function (err, result) {
      res.send(result);
    })
});

app.get("/sum", async function (req, res) {
  let sum = 0
    await farmincollection.aggregate([{$unwind: '$ponds'}, { $group: {_id: "$name", "total": {$sum: "$ponds.size"}}}],function(error, s){
      res.send(s);
    })
});

app.post("/postFarm", async function (req, res) {
  let data = req.body.data;
  let farm = new farmincollection({
    name: data.name,
    um: "hectares",
    ponds: req.body.data.ponds,
  });
  farm.save(res.send());
});

// For Modifying farm
app.put("/updtFarm", async (req, res) => {
  let farm = await req.body.data;
  let nfarm = req.body.data.newFarm;
  let ponds = []
  farm.ponds ? (ponds = farm.ponds) : farm.newFarm.ponds
  let _id = nfarm._id
  let indicator = farm.indicator
  indicator === "Pond" && farm.action === "newPond" ? nfarm.ponds.push({name: farm.name, size: farm.size, parentFarm: farm.parentFarm}) : null
  ponds = ponds.map((p, idx)=> p[idx] = {name:p.name, size: p.size, parentFarm: farm.name} )
  // ponds.map((p, idx)=> p[idx] = {name:p.name, size: p.size, parentFarm: farm.name} )
  indicator !== "Pond" && farm.action === "update" ? 
  await farmincollection.findByIdAndUpdate(
    _id,
    //  [{$unwind: '$ponds'},{name: farm.name}],
     {name: farm.name, ponds: ponds},
    { new: true },
    (err, result) => {
      if (err) throw err;
      else 
      res.send(result);
    }
  ) :
  await farmincollection.findByIdAndUpdate(
    _id,
     nfarm,
    { new: true },
    (err, result) => {
      if (err) throw err;
      else res.send(result);
    }
  );
});

app.delete("/delfarm/:farmid", function (req, res) {
  let name = req.params.name;
  farmincollection.findOne({ name }, function (err, reply) {
    reply.remove();
    farmincollection.find({}, function (err, response) {
      res.send(response);
    });
  });
});

app.delete("/empty/", async function (req, res) {
  await farmincollection.deleteMany({}, function (err, response) {
    res.send(response);
  });
  return;
});

app.listen(PORT, function () {
  console.log("run");
});