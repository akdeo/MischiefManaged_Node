var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var users = {};

//Endpoints 
app.post('/init', function (req, res) {
	var name = req.body.name;

})

app.put('/location', function (req, res) {

})

app.get('/map/z/x/y', function (req, res) {

})

app.get('/locations', function (req, res) {



})




var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})