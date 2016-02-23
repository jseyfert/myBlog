var express = require('express');
var router = express.Router();
var Bear = require('../models/bears');

router.route('/bears')//.post()  we could also add it like this if we werent chaining

    // create a bear 
    .post(function(req, res) {

        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)
        bear.age = req.body.age; 
        bear.gender = req.body.gender; 	
        bear.save(function(err, bear) { // save(mongoos method) the bear and check for errors
        	if (err) {
        		res.json(err);
        	} else {
        		res.json(bear); // if save works give me bear in json format
        	}
        });
    })

    .get(function(req, res) { // get bears from DB
    	// console.log(req);
    	Bear.find(function(err, bears) {
    		if (err) {
    			res.json(err);
    		} else {
    			res.json(bears);
    		}
    	});
    });

router.route('/bears/:bear_id') //router.route is express terminology

	.get(function(req, res) { //get bear by specific id
		Bear.findById(req.params.bear_id, function(err, bear) {//mongood methos
			if (err) {
				res.json(err);
			} else {
				res.json(bear);
			}
		});
	})

	.put(function(req, res) { //update(put) bear by specific id

	Bear.findById(req.params.bear_id, function(err, bear) {
			if (err) {
				res.json(err);
			} else {

				bear.name = req.body.name ? req.body.name : bear.name;
				bear.age = req.body.age ? req.body.age : bear.age;
				bear.gender = req.body.gender ? req.body.gender : bear.gender;

				bear.save(function(err) {
					if (err) {
						res.json(err);
					} else {
						res.json({title: 'updated'});
					}
				});	
			}
		});
	})

	.delete(function(req, res) { //delete bear by specific id
			 // console.log(res);
		Bear.remove({_id: req.params.bear_id}, function(err, bear) {
			if (err) {
				res.json(err);
			} else {
				res.json({title: 'deleted'});
			}
		});
	});

	module.exports = router;