console.log('Client side JS file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JS'


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  if (!location) {
    return messageTwo.textContent = 'Please enter a proper location'
  }
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  const url = '/weather?address=' + location
  fetch(url).then((response) => {
    response.json().then(data => {
      if (data.error) {
        messageTwo.textContent = data.error
      } else {
        messageOne.textContent = data.placeName
        messageTwo.textContent = data.forecast
      }
    })
  })
})
