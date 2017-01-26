const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const PORT = process.env.PORT || 3000

let app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log('New user connected')

  // socket.emit from Admin text Welcome to the chat app
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app'
  })
  // socket.broadcast.emit from Admin text New user joined
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined!',
    createdAt: new Date().getTime()
  })

  socket.on('createMessage', (message) => {
    console.log('createMessage', message)

    message.createdAt = new Date().getTime()
    io.emit('newMessage', message)
    // socket.broadcast.emit('newMessage', message)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`)
})
