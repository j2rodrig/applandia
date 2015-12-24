var port = process.env.PORT || 1080;
var serverUrl = "127.0.0.1";
var counter = 0;

var http = require("http");
var server = http.createServer(serverHandler);
var io = require("socket.io")(server);
var fs = require("fs");
//var presenter = require("./sharedpresenter");

function serverHandler(req, res) {

  counter++;
  
  // SEND GAME CLIENT PAGE
  if(req.url == "/game") {
    var actualFileName = "game.html";
    console.log(req.url+", "+actualFileName+", "+"200"+", "+counter)
    fs.readFile(actualFileName, function(err, text){
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
  }
  
  // SEND WHITELISTED JAVASCRIPT CODE
  else if(req.url.endsWith(".js") || req.url.endsWith(".map")) {  // also allow minification maps for debugging
    var actualFileName = "whitelisted" + req.url;  // add "whitelisted" prefix
    console.log(req.url+", "+actualFileName+", "+"200"+", "+counter)
    fs.readFile(actualFileName, function(err, text){
      if(req.url.endsWith(".js"))
        res.setHeader("Content-Type", "text/javascript");
      else if(req.url.endsWith(".map"))
        res.setHeader("Content-Type", "application/json");
      res.end(text);
    });
  }
  
  // SEND PNG IMAGE
  else if(req.url.endsWith(".png")) {
    var actualFileName = req.url.slice(1);  // remove "/" prefix
    console.log(req.url+", "+actualFileName+", "+"200"+", "+counter)
    fs.readFile(actualFileName, function(err, binary){
      res.setHeader("Content-Type", "image/png");
      res.end(binary);
    });
  }
  
  // SEND ICON IMAGE
  else if(req.url.endsWith(".ico")) {
    var actualFileName = req.url.slice(1);  // remove "/" prefix
    console.log(req.url+", "+actualFileName+", "+"200"+", "+counter)
    fs.readFile(actualFileName, function(err, binary){
      res.setHeader("Content-Type", "image/x-icon");
      res.end(binary);
    });
  }
  
  // SEND ERROR PAGE
  else {
    console.log(req.url+", "+req.url+", "+"404"+", "+counter)
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end("<h2>We don't have this page.</h2><p>Requests since server started: " + counter + ".</p>");
  }

}

io.on("connection", function(socket) {
  socket.emit("handshake", {blah: "blah"});
  socket.on("handshake2", function(data) {
    console.log("handshake2: " + data);
  });
});


console.log("Starting game server at " + serverUrl + ":" + port);
console.log("URL, Mapped, Code, RequestNumber")

server.listen(port, serverUrl);
