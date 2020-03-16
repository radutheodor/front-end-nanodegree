// Setup empty JS object to act as endpoint for all routes
//projectData = [];

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const aylien = require("aylien_textapi");
const dotenv = require("dotenv");
dotenv.config();

// set aylien API credentials
const textapi = new aylien({
  application_id: process.env.APP_ID,
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

//app.use(express.static(path.join("../..", "dist")));
app.use(express.static("dist"));

const port = 8081;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get("/", (request, response) => {
  //res.sendFile("index.html", { root: "../../dist" });
  response.sendFile(path.resolve("src/client/views/index.html"));
});

app.post("/urlSentiment", (request, response) => {
  textapi.sentiment(
    {
      text: request.body.text
    },
    (error, sentiment, rateLimits) => {
      console.log(rateLimits);
      console.log(sentiment);
      response.send(sentiment);
    }
  );
});

app.post("/textSentiment", (request, response) => {
  textapi.sentiment(
    {
      text: request.body.text
    },
    (error, sentiment, rateLimits) => {
      console.log(rateLimits);
      console.log(sentiment);
      response.send(sentiment);
    }
  );
});

app.get("/aylien", (request, response) => {
  textapi.sentiment(
    {
      text: "Calin is a very nice guy"
    },
    (error, sentiment, rateLimits) => {
      console.log(rateLimits);
      console.log(sentiment);
      response.send(sentiment);
    }
  );
});

module.exports = app;
