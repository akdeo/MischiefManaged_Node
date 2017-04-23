var express = require('express');
var app = express();
var fs = require("fs");
var d = new Date();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var users = {};

//Endpoints 
app.post('/init', function (req, res) {
    var name = req.query.name;
    console.log(req.query.name);
    var id = Math.floor((Math.random() * 10000) + 1)
    // var lat = 
    // var lon =
    var last_update = d.getTime();
    var messages = [];
    var user = {
        name: name,
        id: id,
        last_update: last_update,
        messages: messages,
    };
    users[id] = user; 
    res.status(200).json(id);
    res.end();
})

app.put('/location', function (req, res) {
    var lat = req.query.lat;
    var lon = req.query.lon;
    var id = req.query.id;
    var user = users[id];
    user.lat = lat;
    user.lon = lon;
    res.status(200);
    res.end();
})

app.get('/map/z/x/y', function (req, res) {
    res.end();
})

app.get('/locations', function (req, res) {
    res.status(200).json(users);
    res.end();
})

app.post('/message', function (req, res) {
    var from_id = req.query.from_id;
    var to_id = req.query.to_id;
    var msg = req.query.message;
    var user = users[to_id];
    var from_user = users[from_id];
    var from_name = from_user.name;
    var messages = user.messages;
    var message = {
    	name: from_name,
    	message: msg,
    };
    messages.push(message);
    user[messages] = messages;
    res.status(200);
    res.end();
})

app.get('/messages', function (req, res) {
    var id = req.query.id;
    var user = users[id];
    var messages = user.messages;
    user.messages = [];
    res.status(200).json(messages);
    res.end();
})

app.get('/test', function(req, res) {
    console.log("TEST");
    res.end();
})

var server = app.listen(8080, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})