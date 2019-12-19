const request = require('request')

const forecast = (lati, long, callback) => {
  // const url = 'https://api.darksky.net/forecast/c46a1b98223b8b5a19f2233a5b0ad87d/37.8267,-118.2439'
  const url = 'https://api.darksky.net/forecast/c46a1b98223b8b5a19f2233a5b0ad87d/' + lati + ',' + long
  console.log(url)
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to Weather service', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, {
        Summary: body.daily.data[0].summary + ' With a temperature of ' + body.currently.temperature + '. Chances of Rain is - ' + body.currently.precipProbability + '. With a humidity of ' + body.currently.humidity + '. With a MinTemperature : ' + body.daily.data[0].temperatureMin + ' & HighTemperature : ' + body.daily.data[0].temperatureMax
      })
    }
  })
}

module.exports = forecast
