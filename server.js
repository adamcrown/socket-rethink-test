var r = require('rethinkdb');
var app = require('http').createServer();
var io = require('socket.io')(app);

var port = 3001;
var db_name = 'rethink_socket_test_development';

app.listen(port);

r.connect({db: db_name}).then(function(c) {
  r.table('messages').changes().run(c)
    .then(function(cursor) {
      cursor.each(function(err, item) {
        io.sockets.emit('new_message', item);
      });
    });
});

console.log('Listening on port ' + port + '...')
