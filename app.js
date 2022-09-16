const express= require("express");
const app= express();
const bodyparser= require("body-parser");
const https=require("https");

app.use(bodyparser.urlencoded({extended: true}));

app.listen(3000, ()=>{
  console.log("Server is running on Port 3000");
});

app.get("/", (req, res)=>{

res.sendFile(__dirname + "/index.html");


});
app.post("/", (req, res)=>{

 const input= req.body.CityName;

 const cityinput= input;

 const url="https://api.openweathermap.org/data/2.5/weather?q="+cityinput+"&appid=&units=metric";

   https.get(url, (respons)=>{
     console.log(respons.statusCode);

     respons.on("data", (data)=>{
       const weatherData = JSON.parse(data);
       const temperture = weatherData.main.temp;
       const weatherDescription = weatherData.weather[0].description;
       const icon= weatherData.weather[0].icon;
       const imgUrl= "http://openweathermap.org/img/wn/"+ icon+ "@2x.png";
       res.write("<p> The Weather Description is " + weatherDescription + " in "+cityinput+ "</p>");
       res.write("<h1>Weather temperture is "+ temperture+" degree celcious </h1>");
       res.write("<img src="+ imgUrl+ ">");
       res.send()
     })
   });
})
