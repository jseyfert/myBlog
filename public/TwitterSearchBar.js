var TwitterSeachBar = React.createClass({
	getInitialState: function() {
		return { newKeyword: '' }
	},	
	handleKeywordChange: function(e) {
	    this.setState({
	    	newKeyword: e.target.value
	    })
	},
	handleFormSubmit: function(e) {
		e.preventDefault();
		var newKeyword = this.state.newKeyword.trim();
		this.props.onKeywordSubmit(newKeyword);
	},
	render: function() {
		return (
			<div className="TwitterSeachBar">
				<section>
				  <div className="container addBottomMargin">
				    <div className="row">
				      <form className="form-inline" onSubmit={this.handleFormSubmit}>
				        <div className="form-group">
				          <label for="exampleInputName2">Name </label>
				          <input onChange={this.handleKeywordChange} value={ this.state.keyword }type="text" className="form-control" id="exampleInputName2" placeholder="Jane Doe"/>
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