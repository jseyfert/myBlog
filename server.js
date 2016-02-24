var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Blog = require('./models/blog');
var blogRouter = require('./routes/blogs');
var mongoose = require('mongoose');
var router = express.Router();
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api', blogRouter);
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/blogs');

router.use(function(req, res, next) { // middleware to 'use' for all requests
    console.log('Hell Yeah ' + port);
    next(); // make sure we go to the next routes and don't stop here
});

app.get('/', function(req, res){
    res.render('index', {title: 'whats up!'});
});

app.get('/blog', function(req, res){

    Blog.find(function(err, blogs) {
            if (err) {
                res.json(err);
            } else {
                var reverseBlog = blogs.reverse();
                console.log(reverseBlog);
                res.render('blog', {blogList: reverseBlog});
                // console.log(blogs);
            } 
        });
});

app.listen(port);
console.log('There server is on PORT ' + port);

// app.get('/about', function(req, res){
//     res.render('about', {time: new Date()});
// });