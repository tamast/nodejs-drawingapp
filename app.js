var express = require('express')
  , http = require('http')
  , io = require('socket.io')
  , path = require('path');

var app = express()
  , server = http.createServer(app)
  , io = io.listen(server);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

io.sockets.on('connection', function (socket) {

  socket.on('draw:start', function (data) {
    io.sockets.emit('draw:start', { id: data.id, path: data.path });
  });

   socket.on('draw:inprogress', function (data) {
     io.sockets.emit('draw:inprogress', { id: data.id, path: data.path });
  });

  socket.on('draw:end', function (data) {
    io.sockets.emit('draw:end', { id: data.id, path: data.path });
  });

  socket.on('draw:clean', function (data) {
    io.sockets.emit('draw:clean');
  });
});
