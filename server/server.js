const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public')
const PORT = process.env.PORT || 3000

let app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected')

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'))

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message)

    message.createdAt = new Date().getTime()
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback('This is from the server')
    // socket.broadcast.emit('newMessage', message)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`)
})
