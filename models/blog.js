var dateFormat = require('dateformat');
var now = new Date();

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BlogSchema   = new Schema({
    posterName: String,
    postTitle: String,
    postBody: String,
    postDate: {type: String, default: dateFormat(now, "mmmm dS, yyyy")}
});


module.exports = mongoose.model('Blog', BlogSchema);
