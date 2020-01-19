const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define path for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: "About Me",
    name: "Mahmoud Bekheit"
  })
})

app.get('/about', (req, res)=> {
  res.render("about", {
    title: "About Me",
    name: "Mahmoud Bekheit"
  })
})

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: "Contact Me",
    name: "Mahmoud Bekheit"
  })
})

app.get('/weather', (req, res) => {

  const address = req.query.address

  if(!address){
    return res.send("You must provide a valid address");
  }

  geocode(address, (error, data) => {
    if(error){
      return res.send({error})
    }
    forecast(data, (forecastErr, description) => {
      if(forecastErr) {
        return res.send(forecastErr)
      }
      res.send({
        location: data.location,
        address,
        forecast: description
      })
    })
  })

})

app.get("/contact/*", (req, res) => {
  res.render("404", {
    errorMessage: "This page is not found",
    name: "Mahmoud Bekheit",
    title: "404 Error!"
  });
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: "The page your are looking for is not found",
    name: "Mahmoud Bekheit",
    title: "404 Error!"
  })
})

app.listen(port, ()=>{
  console.log("Listening to port " + port);
})