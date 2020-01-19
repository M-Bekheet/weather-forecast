const request = require('request');

const forecast = ({ longitude, latitude }, callback) => {
  const url = `https://api.darksky.net/forecast/93367eb5da5530d86dcff0000834505d/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, {body} = {}) => {
    if(error){
      callback("Cannot connect to weather service!", undefined);
    } else if (body.error){
      callback("Cannot forecast your location", undefined)
    } else{
      const data = {
        summary: (body.daily.data[0].summary),
        temperature: body.currently.temperature,
        precipProbability: body.currently.precipProbability * 100
      }
      
      const description = `${data.summary} It's currently ${data.temperature} degrees out. There's ${data.precipProbability}% chance of rain.`

      callback(undefined, description)
    }
  })
}

module.exports = forecast;