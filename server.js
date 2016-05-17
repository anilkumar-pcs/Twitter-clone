var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var mongoose = require("mongoose");

var port = 3000;

//connect to database
mongoose.connect("mongodb://localhost/auth-sample");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret for session',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

//include the routes
require("./app/app.js")(app);

//start the express server
app.listen(port, function(){
	console.log("Magic happens at port : "+port);
});