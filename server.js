const express = require("express");
const path = require("path");
const { pathToFileURL } = require("url");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const reservations = [
  {
    name: "Joe Momma",
    phone: "602-710-0994",
    email: "joemomma@gmail.com",
    auth: "banana",
  },
];
const waitList = [];

//paths
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});
app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});
app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/reservations", function(req, res) {
  return res.json([reservations, waitList]);
});

app.get("/api/waitList", function(req, res) {
  return res.json(waitList);
});

//posting reservations

app.post("/api/reservations", function(req, res){
    const newRes = req.body
    if (reservations.length >= 5) {
        return waitList.push(newRes)
    } 
    reservations.push(newRes)
    console.log(reservations)
    res.end()
})

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});