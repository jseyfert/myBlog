

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Blog = require('./models/blog');
var blogRouter = require('./routes/blogs');
var mongoose = require('mongoose');

var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');

var router = express.Router();
var port = process.env.PORT || 8080;


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
app.use('/api', blogRouter);

app.use(function(req, res, next){
    var user = req.user || "no user";
    console.log(user);
    next();
});

require('./config/passport')(passport);
// routes ======================================================================
require('./routes/user.js')(app, passport);


app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/blogs');


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

// app.get('/blog', function(req, res){
//     res.render('blog', {user: 'whats up!'});
// });

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

app.listen(port);
console.log('There server is on PORT ' + port);
