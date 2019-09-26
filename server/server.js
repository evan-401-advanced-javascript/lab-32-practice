const PORT = process.env.PORT || 3003;

const io = require('socket.io')(PORT);

/**
 * Listening for when a connection is made
 */
io.on('connection', socket => {

  console.log('socket.io connection', socket.id);

  // Listening for words
  socket.on('words', (payload) => {
    //emitting incoming with a payload
    io.emit('incoming', payload);
  });

});


/// ALSO, do a q server on 3333...
const Q = require('@nmq/q/server');
Q.start();

const chat = new Q('deeds');
chat.monitorEvent('work');



