var express = require('express');
var app = express();
var fs = require("fs");
var d = new Date();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var users = {
    1: {
        name: 'Albus Dumbledore',
        id: 1,
        lat: 37.872217,
        lon: -122.257898,
    },
    2: {
        name: 'Madam Hooch',
        id: 2,
        lat: 37.870803,
        lon: -122.250731,
    }
};

//Endpoints 
app.post('/init', function (req, res) {
    var name = req.body.name;
    console.log(req.body);
    var id = Math.floor((Math.random() * 10000) + 1);
    if (req.body.id && users[req.body.id]) {
        console.log("User with id " + req.body.id + " already exists");
        return res.status(200).json({ id: req.body.id });
    } else if (req.body.id) {
        id = req.body.id;
    }
    var last_update = d.getTime();
    var user = {
        name: name,
        id: id,
        last_update: last_update,
        messages: [],
    };
    users[id] = user;
    console.log("User " + req.body.name + " given id: " + id);
    res.status(200).json({ id });
});

app.put('/location', function (req, res) {
    var lat = req.body.lat;
    var lon = req.body.lon;
    var id = req.body.id;
    var user = users[id];
    user.lat = lat;
    user.lon = lon;
    res.status(200);
    res.end();
});


var mapLocs = new Set();
mapLocs.add(JSON.stringify(["15", "5255", "12653"]));
mapLocs.add(JSON.stringify(["15", "5255", "12654"]));
mapLocs.add(JSON.stringify(["15", "5256", "12653"]));
mapLocs.add(JSON.stringify(["15", "5256", "12654"]));

app.get('/map/:z/:x/:y.png', function (req, res) {
    z = req.params.z;
    x = req.params.x;
    y = req.params.y;
    var img;
    if (mapLocs.has(JSON.stringify([z, x, y]))) {
        imageName = "new-" + z + "-" + x + "-" + y + ".png";
        img = fs.readFileSync('./Map/' + imageName);
    } else {
        img = fs.readFileSync('./Map/blank.png');
    }
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');
});

app.get('/locations', function (req, res) {
    res.status(200).json(users);
    res.end();
});

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
    user.messages = messages;
    res.status(200);
    res.end();
});

app.get('/messages', function (req, res) {
    var id = req.query.id;
    var user = users[id];
    var messages = user.messages;
    user.messages = [];
    res.status(200).json(messages);
});

app.get('/test', function(req, res) {
    console.log("TEST");
    res.end();
});

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Mischief Managed listening at http://%s:%s", host, port)
});