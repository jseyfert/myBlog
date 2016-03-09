var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CommentSchema   = new Schema({
    body: String,
    postDate: {type: String, default: Date.now }, 
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog'},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});


module.exports = mongoose.model('Comment', CommentSchema);
