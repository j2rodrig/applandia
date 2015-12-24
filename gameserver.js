var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 1080));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

/*app.get('/', function(req, res) {
  //if(req.url == "/game") {
    var actualFileName = "game.html";
    //console.log(req.url+", "+actualFileName+", "+"200"+", "+counter)
    fs.readFile(actualFileName, function(err, text){
      res.setHeader("Content-Type", "text/html");
      res.end(text);
    });
    //}
  //response.render('game.html');
});*/

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


