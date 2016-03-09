var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Blog = require('../models/blog');
// var dateFormat = require('dateformat');
// var now = new Date();

router.route('/blogs')//.post()  we could also add it like this if we werent chaining

    // create a blog 
    .post(function(req, res) {
    	var user= req.user || 'no user';
    	// console.log('CURRENT USER IS ', user);
        var blog = new Blog();      // create a new instance of the Bear model
        
        blog.posterUser = req.user || 'no user';
        blog.postAuthor = req.user_id || "56d5d32689d7e4617e000001";

        blog.posterName = req.body.posterName;  
        blog.postTitle = req.body.postTitle; 
        blog.postBody = req.body.postBody;
        blog.postImage = req.body.postImage;
        // blog.postDate = dateFormat(now, "mmmm dS, yyyy"); 
        // console.log(blog);	
        blog.save(function(err, blog) { // save(mongoos method) the blog and check for errors
        	if (err) {
        		res.json(err);
        	} else {
        		res.json(blog); // if save works give me blog in json format
        	}
        });
    })

    .get(function(req, res) { // get bears from DB
    	Blog.find()
      .populate('author')
    	.populate('comments')
    	.exec(function(err, blogs) {
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

router.route('/blogs/:blog_id/comment')
    .post(function(req, res) {
      var comment = new Comment();
      console.log(req.body.body);
      comment.body = req.body.body || 'none';
      comment.user = '56d5d32689d7e4617e000001';
      comment.blog = req.params.blog_id;
      comment.save(function(err, com){
        if(err){
          res.send(err);
        } else {
          // res.json(com);
          Blog.findById(req.params.blog_id, function(err, post){
            if(err){
              res.send(err);
            } else {
              post.comments.push(com._id);
              post.save();
              res.json(com);
            }
          })
        }
      })
  });



	module.exports = router;