var http = require('http');
var express = require("express");
// var path = require("path");
var bodyParser = require('body-parser')
var port = 3000;

var app = module.exports.app = express();

var server = http.createServer(app);

var io = require('socket.io').listen(server);  //pass a http.Server instance
server.listen(port);

app.set("views","./views/pages/");
app.set("view engine","jade");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname));

console.log("demo start on 3000");

// home page
app.get("/",function(req,res){
	res.render("index",{"title":"WebSocket","submitBtn":"发送"});
});

io.on('connection', function(socket){
  console.log('a user connected');
    
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);

    io.emit('chat message', msg);
  });

});


