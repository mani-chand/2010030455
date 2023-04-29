const express = require("express");
const mongoose = require("mongoose");
const User = require("./Models/user");
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json())
app.use(cors({origin: ['http://localhost:3000', 'http://127.0.0.1:5000']}));
const trains = [
  {
    trainName: "Chennai Exp",
    trainNumber: "2344",
    departureTime: {
      Hours: 21,
      Minutes: 35,
      Seconds: 0,
    },
    seatsAvailable: {
      sleeper: 3,
      AC: 1,
    },
    price: {
      sleeper: 2,
      AC: 5,
    },
    delayedBy: 15,
  },
  {
    trainName: "Hyderabad Exp",
    trainNumber: "2341",
    departureTime: {
      Hours: 23,
      Minutes: 55,
      Seconds: 0,
    },
    seatsAvailable: {
      sleeper: 6,
      AC: 7,
    },
    price: {
      sleeper: 554,
      AC: 1854,
    },
    delayedBy: 5,
  },
];
mongoose.connect(
  "mongodb+srv://manichand:root@cluster0.oll6q.mongodb.net/assingment?retryWrites=true&w=majority"
);
app.get("/trains", (req, res) => {
  return res.json(trains);
});

app.get("/train/:id", (req, res) => {
  for (var i = 0; i < trains.length; i++) {
    if (trains[i].trainNumber == req.params.id) {
      res.json(trains[i]);
    }
  }
});

app.post("/register", async (req, res) => {
  const { companyName, ownerName, ownerEmail, rollNo, accessCode } = req.body;
  const newUser = await new User({
    companyName,
    ownerName,
    rollNo,
    ownerEmail,
    accessCode,
  }).save();
  const response = {
    companyName: "Train Central",
    clientID: "b46128a0-fbde-4c16-a4b1-6ae6ad718e27",
    clientSecret: "XOyolORPayKBOdAN",
  };
  res.json(response);
});

app.post("/auth", async (req, res) => {
  const { companyName, clientID, ownerName, ownerEmail, rollNo, clientSecret } =
    req.body;
  const user = {
    companyName: "Train Central",
    clientID: "b46128a0-fbde-4c16-a4b1-6ae6ad718e27",
    ownerName: "Ram",
    ownerEmail: "ram@abc.edu",
    rollNo: "1",
    clientSecret: "XOyolORPayKBOdAN",
  };
  if (
    companyName == user.companyName &&
    clientID == user.clientID &&
    ownerName == user.ownerName &&
    ownerEmail == user.ownerEmail &&
    rollNo == user.rollNo &&
    clientSecret == user.clientSecret
  ) {
    const response = {
      token_type: "Bearer",
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODI2MjkyNjQsImNvbXBhbnlOYW1lIjoiVHJhaW4gQ2VudHJhbCIsImNsaWVudElEIjoiYjQ2MTE4ZjAtZmJkZS00YjE2LWE0YjEtNmFlNmFkNzE8YjI3In0.v93QcxrZHWDTnTwm0-6ttoTGI4C65Grhn3rIJDC8fy8",
      expires_in: 1682629264,
    };
    return res.json(response);
  }
});

app.listen(5000, () => {
  console.log("port running on server 5000");
});
