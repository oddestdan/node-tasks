const sockets = (io) => {
  console.log('Sockets connection established');
  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
      console.log('message: ' + msg);
    });

    socket.on('pingServer', (msg) => {
      io.emit('pingServer', msg);
      console.log('pingServer: ' + msg);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};

module.exports = sockets;
