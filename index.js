var express=require("express");
var mongoose = require('mongoose');
var bodyParser=require("body-parser");
var path = require('path');
var morgan = require('morgan');

//MONGODB CONNECTION
var config = require('./config');

var app = express();

mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("Connected correctly to server");
});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//set middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/dist'));

app.use(morgan("dev"));


//initialize routes
app.use('/blog',require('./routes/blog'));
app.use('/user',require('./routes/users'));

app.listen(config.port,function(){
    console.log("server listening at " + config.port)
});