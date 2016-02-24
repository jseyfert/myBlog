// var dateFormat = require('./dateformat');
// var now = new Date();

var addBlog = function(event) {
	event.preventDefault();
	 console.log('addBlog text');
	
	var posterName = $('#posterName').val();
	var postTitle = $('#postTitle').val();
	var postBody = $('#postBody').val();
	// var postDate = dateFormat(now, "mmmm dS, yyyy");
	var $table = $('#blogList');
	
	var blog = {
		posterName: posterName,
		postTitle: postTitle,
		postBody: postBody,
	    // postDate: postDate,
	};
			
	if (posterName && postTitle && postBody){
		$.ajax({
			url: '/api/blogs/', 
			method: 'POST',
			data: blog
		}).done(function(data){
			console.log(data);
			$table.prepend(
				'<div class="post-outer">\
					<div class="panel panel-default">\
					  <div class="panel-body">\
						<h2 class="post-title entry-title">' + postTitle + '</h2>\
						<div class="post-body">\
							<blockquote>\
							  <p>' + postBody + '</p>\
							  <footer>Posted by <span>' + posterName + '</span> on <span></span></footer>\
							</blockquote>\
						</div>\
					  </div>\
					</div>\
				</div>');

		clearInput($('#posterName'));
		clearInput($('#postTitle'));
		clearInput($('#postBody'));

		});
	} else {
		alert("you must fill out form");
	}
};

function clearInput ($input) {
	$input.val("");
}

$('#addBlog').on('click', addBlog);


