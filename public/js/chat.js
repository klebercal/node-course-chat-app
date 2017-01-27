var socket = io()

function scrollToBottom () {
  // selectors
  var messages = jQuery('#messages-list')
  var newMessage = messages.children('li:last-child')
  // heights
  var clientHeight = messages.prop('clientHeight')
  var scrollTop = messages.prop('scrollTop')
  var scrollHeight = messages.prop('scrollHeight')
  var newMessageHeight = newMessage.innerHeight()
  var lastMessageHeight = newMessage.prev().innerHeight()

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }
}

socket.on('connect', function () {
  let params = jQuery.deparam(window.location.search)

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err)
      window.location.href = '/'
    } else {
      console.log('No error')
    }
  })
})

socket.on('disconnect', function () {
  console.log('Disconnected from server')
})

socket.on('updateUserList', function (list) {
  var ol = jQuery('<ol></ol>')

  list.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user))
  })

  jQuery('#users').html(ol)
})

socket.on('newMessage', function (message) {
  var template = jQuery('#message-template').html()
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: moment(message.createdAt).format('h:mm a')
  })

  jQuery('#messages-list').append(html)
  scrollToBottom()
})

socket.on('newLocationMessage', function (message) {
  var template = jQuery('#location-message-template').html()
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: moment(message.createdAt).format('h:mm a')
  })

  jQuery('#messages-list').append(html)
  scrollToBottom()
})

jQuery('form#message-form').on('submit', function (e) {
  e.preventDefault()

  let messageTextBox = jQuery('input[name=message]')

  socket.emit('createMessage', {
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
