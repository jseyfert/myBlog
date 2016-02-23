var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Bear = require('./models/bears');
var bearRouter = require('./routes/bears');
var mongoose = require('mongoose');
var router = express.Router();
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api', bearRouter);
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/animals');

router.use(function(req, res, next) { // middleware to 'use' for all requests
    console.log('Hell Yeah ' + port);
    next(); // make sure we go to the next routes and don't stop here
});

app.get('/', function(req, res){
    res.render('index', {title: 'whats up!'});
});

app.get('/about', function(req, res){
    res.render('about', {time: new Date()});
});

app.get('/bears', function(req, res){
    Bear.find(function(err, bears) {
            if (err) {
                res.json(err);
            } else {
                res.render('bears', {bearList: bears});
            } 
        });
});

app.listen(port);
console.log('There server is on PORT ' + port);