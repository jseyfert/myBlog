var dateFormat = require('dateformat');
var now = new Date();

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BlogSchema   = new Schema({
    posterName: String,
    postTitle: String,
    postBody: String,
    postImage: String,
    postDate: {type: String, default: dateFormat(now, 'mmmm dS, yyyy')},
    postAuthor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});


module.exports = mongoose.model('Blog', BlogSchema);
