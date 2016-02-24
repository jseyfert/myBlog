// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BlogSchema   = new Schema({
    posterName: String,
    postTitle: String,
    postBody: String,
    postDate: String,
});


module.exports = mongoose.model('Blog', BlogSchema);
