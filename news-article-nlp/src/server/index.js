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

/* when running node index.js from within server folder
app.use(express.static(path.join("../..", "dist")));
*/
app.use(express.static("dist"));

const port = 8081;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get("/", (request, response) => {
  /* when running node index.js from within server folder
  res.sendFile("index.html", { root: "../../dist" });
  */
  response.sendFile(path.resolve("src/client/views/index.html"));
});

/**
 * Sentiment request
 * Docs: https://docs.aylien.com/textapi/endpoints/#sentiment-analysis
 */
app.post("/sentiment", (request, response) => {
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

/**
 * Language request
 * Docs: https://docs.aylien.com/textapi/endpoints/#language-detection
 */
app.post("/language", (request, response) => {
  textapi.language(
    {
      text: request.body.text
    },
    (error, language) => {
      console.log(language);
      response.send(language);
    }
  );
});

module.exports = app;
