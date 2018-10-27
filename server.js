const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

 app.use(express.json())

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index', {location: null, error: null});
  })


  app.post('/', function (req, res) {
      let country=req.body.country;
    let city = req.body.city;
    let street=req.body.street;
    let housenumber=req.body.housenumber;
    let url = `https://geocoder.api.here.com/6.2/geocode.json?app_id=KvwMOeRD3eXUGsIPUxpI&app_code=T6Vlys4j9G01IHITUPG-7w&housenumber=${housenumber}&street=${street}&city=${city}&country=${country}`
    request(url, function (err, response, body) {
      if(err){
        res.render('index', {location: null, error: 'Error, please try again'});
      } else {
        let location = JSON.parse(body)
        console.log(location)
        if(location.Response.View[0] == undefined){
          res.render('index', {location: null, error: 'Error Not A Valid Address, please try again'});
        } else {
            let lat=location.Response.View[0].Result[0].Location.NavigationPosition[0].Latitude;
            let long=location.Response.View[0].Result[0].Location.NavigationPosition[0].Longitude;
          let locationText = `It's ${lat} latitude and ${long} longitude!`;
          res.render('index', {location: locationText, error: null});
        }
      }
    });
  })
  
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })