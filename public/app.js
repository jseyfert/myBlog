
// var killblog = function() {
// 	var id = $(event.target).closest('tr').attr('id');	
// 	var blog= $(event.target).closest('tr');	

// 	$.ajax({
// 		url: '/api/blogs/' + id, 
// 		method: 'DELETE' ,
// 	}).done(function(){
// 		blog.remove();
// 	});
// };

var addBlog = function(event) {
	event.preventDefault();
	
	var posterName = $('#posterName').val();
	var postTitle = $('#postTitle').val();
	var postBody = $('#postBody').val();
	var $table = $('#blogList');
	// console.log(postBody);
	var blog = {
		posterName: posterName,
		postTitle: postTitle,
		postBody: postBody
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
							  <footer>Posted by <span>' + posterName + '</span> on <span>2015-01-01</span></footer>\
							</blockquote>\
						</div>\
					  </div>\
					</div>\
				</div>');

		// clearInput($('#posterName'));
		// clearInput($('#postTitle'));
		// clearInput($('#postBody'));

		// $('#addblog').on('click', addBlog);
		});
	} else {
		alert("you must fill out form");
	}
};

//clear inputs
// function clearInput ($input) {
// 	$input.val("");
// }

$('#addblog').on('click', addBlog);
// $('.killblog').on('click', killblog);