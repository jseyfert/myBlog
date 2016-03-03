require('dotenv').config();

var express = require('express');
var router = express.Router();
var Twit = require('twit');

var T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

var tweetArray = function (tweet) {
	// return argument.user.name + ' SAID... ' + argument.text;
	return {
		screen_name: tweet.user.name,
		text: tweet.text,
		
		// profile_image_url:
	};
};

router.route('/:keyword')
	.get(function (req, res) {
		var keyword = req.params.keyword;
		T.get('search/tweets', { q: keyword + ' since:2011-07-11', count: 10 }, function(err, data, response) {
		res.json(data.statuses.map(tweetArray));
		// res.json(data);
		});
	});

	module.exports = router;