//jshintversion:6 module

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req, res){

  res.sendFile(__dirname + "/index.html");

})
app.post('/', function(req,res){
  const query = req.body.cityName;
  const appid = "4b758359faafafb2cbf7580a6ea3f74d";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+units+"#";
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    console.log(description);
    res.send("<h1>temperature in " + query + " " + temp + " (in Celsius)</h1>");
  })
  })
})




app.listen(3000, function(){
  console.log("server running")
})
