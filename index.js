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
	var name = req.body.name;
	var id = Math.floor((Math.random() * 10000) + 1)
	// var lat = 
	// var lon =
	var last_update = d.getTime();
	var user = {
		name: name,
		id: id,
		last_update: last_update,
	};
	users[id] = user; 
	res.status(200).json(id);
	// res.end(id)
})

app.put('/location', function (req, res) {
	var lat = req.body.lat;
	var lon = req.body.lon;
	var id = req.body.id;
	var user = users[id];
	user.lat = lat;
	user.lon = lon;
})

app.get('/map/z/x/y', function (req, res) {

})

app.get('/locations', function (req, res) {
	res.status(200).json(users);

})

app.get('/test', function(req, res) {
	console.log("TEST");
})




var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})