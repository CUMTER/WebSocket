var port = 3000;
var http = require('http');
var express = require("express");
var bodyParser = require('body-parser')
var router = express.Router();

var app = module.exports.app = express();

var server = http.createServer(app);

var io = require('socket.io').listen(server);  
server.listen(port);

app.set("views","./views/pages/");
app.set("view engine","jade");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname));

router.get("/",function(req,res,next){
	res.render("index",{"title":"WebSocket","submitBtn":"发送"});
	next();
});

var reg = {"title":"WebSocket","enterName":"输入用户名","enterPwd":"输入密码","submit":"马上注册"}

router.get("/admin",function(req,res,next){
	res.render("index",reg);
	next();
});

app.use(router);

console.log("WebSocket listen on " + port);

io.on('connection', function(socket){
  console.log('a user connected');
    
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);

    io.emit('chat message', msg);
  });

});


