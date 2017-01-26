var socket = io()

socket.on('connect', function () {
  console.log('Connected to server')
})

socket.on('disconnect', function () {
  console.log('Disconnected from server')
})

socket.on('newMessage', function (message) {
  console.log('newMessage', message)

  var li = jQuery('<li></li>')
  li.text(message.from + ': ' + message.text)

  jQuery('#messages-list').append(li)
})

socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li></li>')
  var a = jQuery('<a target="_blank">My current location</a>')

  li.text(`${message.from}: `)
  a.attr('href', message.url)
  li.append(a)

  jQuery('#messages-list').append(li)
})

jQuery('form#message-form').on('submit', function (e) {
  e.preventDefault()

  let messageTextBox = jQuery('input[name=message]')

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('')
  })
})

var locationButton = jQuery('button#send-location')
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation is not available to your browser')
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled')
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationButton.removeAttr('disabled').text('Send location')
    alert('Unable to fetch location.')
  }, {
    timeout: 5000
  })
})
