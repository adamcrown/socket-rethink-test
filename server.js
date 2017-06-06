var r = require('rethinkdb');
var app = require('http').createServer();
var io = require('socket.io')(app);

app.listen(3001);

r.connect({db: 'rethink_socket_test_development'}).then(function(c) {
  r.table('messages').changes().run(c)
    .then(function(cursor) {
      cursor.each(function(err, item) {
        io.sockets.emit('new_message', item);
      });
    });
});

console.log('Ready...')
