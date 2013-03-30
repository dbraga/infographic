var express = require('express');
var watch = require('node-watch');
var exec_path = require('path').dirname(require.main.filename);
var events = require('events');
var exec = require('child_process').exec;



var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

// app.all('/posts', function (req, res){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   });


app.configure(function(){
  app.use('/media', express.static(__dirname + '/media'));
  app.use(express.static(__dirname + '/public'));
});

server.listen(3000);
// server.listen(80, '0.0.0.0');




app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');


});

var client;

if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  client = require("redis").createClient(rtg.port, rtg.hostname);

  client.auth(rtg.auth.split(":")[1]); 
} else {
 client = require("redis").createClient();
}

client.on("error", function (err) {
    console.log("error event - " + client.host + ":" + client.port + " - " + err);
});



io.sockets.on('connection', function (socket) {

  socket.on('lookup', function (data) {

    console.log("Received request for lookup date: " + data.date);

    // // lookup
    // client.get(data.date, function (err, replies) {
    //     if (err) {
    //         return console.error("error response - " + err);
    //     }

    //     console.log("here");
    //     console.log(replies);
    //     socket.emit("lookup-response",replies)
    // });



    // lookup
    client.hkeys(data.date, function (err, replies) {
        if (err) {
            return console.error("error response - " + err);
        }

        var array=[];

        // console.log(replies.length + " replies:");
        replies.forEach(function (reply, i) {
            var nid = reply;
            // console.log("    " + i + ": " + reply);
            // reply.forEach(function (rep, i){
            //   console.log(rep);
            // });
            client.hmget(data.date,reply,  function (err, replies) {
              value = replies[0];
              // console.log("nid: "+nid+" value: "+value);
              // string = string + "nid: "+nid+" value: "+value;
      
                   array.push([nid,value]);

            });
        // client.quit();

        });
        setTimeout(function() {
    // rest of code here
    // console.log(array[0]);
    socket.emit("lookup-response",array)
    // JSON.parse(string);
}, 500);
        
        // 
    });







  // socket.emit("")
  });
});



