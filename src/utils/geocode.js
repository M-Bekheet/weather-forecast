
const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2hpZG9zIiwiYSI6ImNrM2ZyeHllbjA3ZmwzZXJ6cmRsaHk3aHYifQ.MBAFBUSwe6MsGYVViLrUUQ&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Cannot connect to the location service', undefined);
    } else if (body.features.length === 0) {
      callback('Cannot find this location', undefined)
    } else {
      const data = {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      }
      callback(undefined, data)
    }
  })
}

module.exports = geocode;