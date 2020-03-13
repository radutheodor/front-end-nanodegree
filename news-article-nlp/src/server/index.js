const path = require("path");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const bodyParser = require("body-parser");
const cors = require("cors");

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
  console.log("Example app listening on port 8082!");
});

app.get("/test", function(req, res) {
  res.send(mockAPIResponse);
});
