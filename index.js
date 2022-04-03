const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});

app.use(express.static("public"));
app.use(express.json());

app.get("/weather/:city", async (request, response) => {
  const city = request.params.city;

  const api_key = process.env.API_KEY;
  const weather_url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=no`;
  const weather_response = await fetch(weather_url);
  const weather_data = await weather_response.json();

  response.json(weather_data);
});
