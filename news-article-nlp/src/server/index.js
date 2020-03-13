// Setup empty JS object to act as endpoint for all routes
projectData = [];

const path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const aylien = require("aylien_textapi");
const dotenv = require("dotenv");
dotenv.config();

// set aylien API credentials
const textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static(path.join("../..", "dist")));

app.get("/", function(req, res) {
  res.sendFile("index.html", { root: "../../dist" });
});

// designates what port the app will listen to for incoming requests
app.listen(8082, function() {
  console.log(`API KEY ${process.env.API_KEY}`);
  console.log(`APP ID ${process.env.APP_ID}`);
  console.log("Example app listening on port 8082!");
});

app.get("/test", function(req, res) {
  res.send(mockAPIResponse);
});

app.get("/aylien", (request, response) => {
  textapi.sentiment({
    text: "John is a very good football player",
    function(err, result, rateLimits) {
      console.log(rateLimits);
      console.log(result);
    }
  });
});
