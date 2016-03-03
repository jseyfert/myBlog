var TwitterCard = React.createClass({
	render: function() {
		return (
			<div className="TwitterCard">
				<section>
				  <div className="container">
				    <div className="row">
				      <div className="card card-inverse card-primary text-xs-center">
				        <div className="card-block">
				          <blockquote className="card-blockquote">
				            <p>{this.props.text}</p>
				            <footer>Author is <cite title="Source Title">{this.props.screenName}</cite></footer>
				          </blockquote>
				        </div>
				      </div>
				    </div>
				  </div>
				</section>
			</div>
		);
	}
});