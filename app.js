require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require('express-session');

const {
  checkAuth
} = require('./Midlewares/auth.js');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie : {
       maxAge: 1000* 60 * 60 *24 * 30
  }
}));

mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true
});

const transSchema = new mongoose.Schema({
  amount: Number,
  des: String,
  type: String,
  date: String
});
const Trans = mongoose.model("transition", transSchema);


app.get("/", checkAuth, async (req, res) => {

  await Trans.find((err, foundTrans) => {
    const currDate = new Date();
    res.render("index", {
      trans: foundTrans,
      currIn: 0,
      currEx: 0,
      currYear: currDate.getFullYear(),
      currMonth: currDate.getMonth() + 1,
    });
  }).clone();
});

app.get("/preMonth", checkAuth, async (req, res) => {
  await Trans.find((err, foundTrans) => {
    const currDate = new Date();
    res.render("preM", {
      trans: foundTrans,
      currIn: 0,
      currEx: 0,
      currYear: currDate.getFullYear(),
      currMonth: currDate.getMonth() + 1,
    });
  }).clone();
});

app.get("/addTrans", checkAuth,  (req, res) => {
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

app.post("/delTrans", async (req, res) => {
  const transId = req.body.delBtn.split("+")[0];
  const page = req.body.delBtn.split("+")[1];


  await Trans.findOneAndDelete({
    _id: transId
  }, (err) => {
    if (!err) {
      if (page == "main") {
        res.redirect("/");
      } else {
        res.redirect("/preMonth")
      }
    }
  }).clone();
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {


  if (process.env.USER == req.body.userName && process.env.PASSWORD == req.body.password) {
    req.session.isLogedin = true;
    res.redirect("/");
  } else {
    res.redirect("/login");
  }

})


app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
})
