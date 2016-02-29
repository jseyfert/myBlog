var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');
// var dateFormat = require('dateformat');
// var now = new Date();

router.route('/blogs')//.post()  we could also add it like this if we werent chaining

    // create a blog 
    .post(function(req, res) {

        var blog = new Blog();      // create a new instance of the Bear model
        blog.posterName = req.body.posterName;  // set the blogs name (comes from the request)
        blog.postTitle = req.body.postTitle; 
        blog.postBody = req.body.postBody;
        // blog.postDate = dateFormat(now, "mmmm dS, yyyy"); 
        console.log(blog);	
        blog.save(function(err, blog) { // save(mongoos method) the blog and check for errors
        	if (err) {
        		res.json(err);
        	} else {
        		res.json(blog); // if save works give me blog in json format
        	}
        });
    })

    .get(function(req, res) { // get bears from DB
    	// console.log(req);
    	Blog.find(function(err, blogs) {
    		if (err) {
    			res.json(err);
    		} else {
    			res.json(blogs);
    		}
    	});
    })

	.delete(function(req, res) { //delete bear by specific id
			 // console.log(res);
		Blog.remove(function(err, blog) {
			if (err) {
				res.json(err);
			} else {
				res.json({title: 'the shits gone!'});
			}
		});
	});

router.route('/blogs/:blog_id') //router.route is express terminology

	.get(function(req, res) { //get bear by specific id
		Blog.findById(req.params.blog_id, function(err, blog) {//mongood methos
			if (err) {
				res.json(err);
			} else {
				res.json(blog);
			}
		});
	})

	.put(function(req, res) { //update(put) blog by specific id

	Blog.findById(req.params.blog_id, function(err, blog) {
			if (err) {
				res.json(err);
			} else {

				blog.posterName = req.body.posterName ? req.body.posterName : blog.posterName;
				blog.postTitle = req.body.postTitle ? req.body.postTitle : blog.postTitle;
				blog.postBody = req.body.postBody ? req.body.postBody : blog.postBody;

				blog.save(function(err) {
					if (err) {
						res.json(err);
					} else {
						res.json({title: 'updated'});
					}
				});	
			}
		});
	});

	// .delete(function(req, res) { //delete bear by specific id
	// 		 // console.log(res);
	// 	Blog.remove({_id: req.params.blog_id}, function(err, blog) {
	// 		if (err) {
	// 			res.json(err);
	// 		} else {
	// 			res.json({title: 'deleted'});
	// 		}
	// 	});
	// });

	module.exports = router;