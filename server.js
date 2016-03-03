
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogs');
var flash = require('connect-flash');
var session = require('express-session');

var blogRouter = require('./routes/blogs');

var tweetRouter = require('./routes/tweets');

var Blog = require('./models/blog');

var router = express.Router();

app.set('view engine', 'ejs');

app.use(session({
 secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(session({
 cookie: {
   maxAge: 60000
 }
}));
app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('img'));

app.use(function(req, res, next){
    var user = req.user || "no user";
    console.log(user);
    next();
});

require('./config/passport')(passport);
// routes ======================================================================
require('./routes/user.js')(app, passport);

var port = process.env.PORT || 8080;



router.use(function(req, res, next) { // middleware to 'use' for all requests
    console.log('Hell Yeah ' + port);
    next(); // make sure we go to the next routes and don't stop here
});

app.get('/', function(req, res){
    var user = req.user || "no user";
    res.render('index', {user: user});
});

app.get('/photo', function(req, res){
    res.render('photo', {user: 'whats up!'});
});

app.get('/social', function(req, res){
    res.render('social', {user: 'whats up!'});
});

app.get('/blog', function(req, res){
    Blog.find(function(err, blogs) {
            if (err) {
                res.json(err);
            } else {
                var reverseBlog = blogs.reverse();
                // console.log(reverseBlog);
                res.render('blog', {blogList: reverseBlog, user: 'user'});
                // console.log(blogs);
            } 
        });
    // res.render('blog', {user: 'whats up!'});
});

app.use('/api', blogRouter);
app.use('/api/tweets', tweetRouter);
app.listen(port);
console.log('There server is on PORT ' + port);
