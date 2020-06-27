// jshint esversion:6

// importing express module
const express = require('express');
// get http request
const https = require('https');
// post request data
const bodyParser = require('body-parser');

// initialize express app
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res)=>{

  const query = req.body.cityName;
  const apiKey = "566fb561b3744f762193294aefe15586";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, (response)=>{
  console.log(response.statusCode);

    response.on('data', (data)=>{
      const weatherData = JSON.parse(data);
      // console.log(weatherData);

      // temperature
      const temp = weatherData.main.temp;
      // weather description
      const weatherDescription = weatherData.weather[0].description;
      // weather icon
      const icon = weatherData.weather[0].icon;
      // image url
      const imgURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";

      res.write('<p>The weather currently is: ' + weatherDescription + "</p>");
      res.write("<h1>The temperature in "+ query + " now is: "+ temp +"  degree celsius</h1>");
      res.write("<img src="+ imgURL +">");

      res.send();
    });
  });
});


// localhost:8000
app.listen(8000, ()=>{
  console.log('Server is running on port:8000');
});
