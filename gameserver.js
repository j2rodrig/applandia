var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var compression = require('compression');
var modelspawn = require('./public/modelspawn');

app.set('port', (process.env.PORT || 1080));

server.listen(app.get('port'));

app.use(compression());

app.use(express.static(__dirname + '/public'));

io.on("connection", function(socket) {
  //var model = modelspawn();
  
  //function sendModel() {
  //  socket.emit("model", model);
  //}
  
  //sendModel();
  
  //socket.on()...
  
  //socket.emit("handshake", {blah: "blah"});
  //socket.on("handshake2", function(data) {
  //  console.log("handshake2: " + data);
  //});
});

console.log("Applandia! server started on port " + app.get('port'));
