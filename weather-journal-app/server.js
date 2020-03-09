// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});

// GET - all Project Data
app.get("/getAllData", (request, response) => {
  response.send(projectData);
  console.log("Server side /getAllData");
  console.log(projectData);
});

// POST - Weather & user provided information
app.post("/addWeather", (request, response) => {
  newEntry = {
    date: request.body.date,
    city: request.body.city,
    temperature: request.body.temperature,
    content: request.body.content
  };

  projectData.push(newEntry);
  response.send(projectData);
  console.log("Server side /addWeather");
  console.log(projectData);
});
