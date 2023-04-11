const express = require("express");
const path = require("path");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.post("/", (req, res) => {
  const selectedLocation = req.body.locationName;
  const unit = "metric";
  const key = "da002fadc2d58a62fca298dbc0727f40";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedLocation}&appid=${key}&units=${unit}`;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const currentTemp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const location = weatherData.name;
      const icon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

      console.log(icon);

      res.write(
        `<h1>The temperature in ${location} is currently ${currentTemp} degree celsius</h1>`
      );
      res.write(
        `<p>It is currently experiencing ${weatherDescription}</p> <img src=${icon} alt="weather-icon"/>`
      );
      res.send();
    });
  });
});

// app.get("/", (req, res) => {
//     const selectedLocation = "London";
//     const unit = "metric";
//     const key = "da002fadc2d58a62fca298dbc0727f40";
//     const url =
//     `https://api.openweathermap.org/data/2.5/weather?q=${selectedLocation}&appid=${key}&units=${unit}`;
//   https.get(url, function (response) {
//     console.log(response.statusCode);

//     response.on("data", (data) => {
//       const weatherData = JSON.parse(data);
//       const currentTemp = weatherData.main.temp;
//       const weatherDescription = weatherData.weather[0].description;
//       const location = weatherData.name;
//       const icon =  `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`

//       console.log(icon);

//       res.write(`<h1>The temperature in ${location} is currently ${currentTemp} degree celsius</h1>`)
//       res.write(`<p>It is currently experiencing ${weatherDescription}</p> <img src=${icon} alt="weather-icon"/>`)
//       res.send();
//     });
//   });
// });

app.listen(3000, function () {
  console.log("Server running on port 3000");
});
