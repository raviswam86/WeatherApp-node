const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Ravikumar'
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    src: '/img/img_2214.jpg',
    name: 'Ravikumar',
    title: 'About Me'
  })
})
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Ravikumar',
    message: 'This is a help Message'
  })
})
app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please enter the address for geo location'
    })
  }
  geoCode(req.query.address, (error, { latitude, longitude, placeName } = {}) => {
    if (error) {
      return res.send({
        error: error
      })
    }
    forecast(latitude, longitude, (error, forecaseData) => {
      if (error) {
        return res.send({
          error: error
        })
      }
      res.send({
        forecast: forecaseData.Summary,
        location: req.query.address,
        placeName: placeName
      })
    })
  })
})
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Please enter the Search string'
    })
  }
  console.log('Query', req.query.search)
  res.send({
    products: []
  })
})
app.get('/help/*', (req, res) => {
  // res.send('Oops Help Article doesnt found')
  res.render('404page', {
    errorMessage: 'Help Article',
    name: 'Ravi',
    title: '404'
  })
})

app.get('*', (req, res) => {
  res.render('404page', {
    errorMessage: 'Page',
    name: 'Ravik',
    title: '404'
  })
})

app.listen(3000, () => {
  console.log('Server is up and running on Port 3000')
})
