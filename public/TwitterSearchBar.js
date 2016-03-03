var TwitterSeachBar = React.createClass({
	var input = ''
	render: function() {
		return (
			<div className="TwitterSeachBar">
				<section>
				  <div className="container addBottomMargin">
				    <div className="row">
				      <form className="form-inline">
				        <div className="form-group">
				          <label for="exampleInputName2"></label>
				          <input type="text" className="form-control" id="exampleInputName2" placeholder=""/>
				        </div>
				        <button type="submit" className="btn btn-primary">Search By Keyword</button>
				      </form>
				    </div>
				  </div>
				</section>
			</div>
		);
	}
});