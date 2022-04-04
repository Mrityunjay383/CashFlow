require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect(process.env.DATABASE_URL, {useUnifiedTopology: true});

const transSchema = new mongoose.Schema({
  amount: Number,
  des: String,
  type: String,
  date: String
});
const Trans = mongoose.model("transition", transSchema);

app.get("/", async (req, res) => {
  await Trans.find((err, foundTrans) => {
    res.render("index.ejs", {trans: foundTrans});
  }).clone();
});

app.get("/addTrans", (req, res) => {
  res.render("addTrans");
});

app.post("/addTrans", async (req, res) => {
  const newTrans = await Trans.create({
    amount: req.body.amo,
    des: req.body.des,
    type: req.body.action,
    date: req.body.date
  });

  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
})
