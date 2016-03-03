var TwitterBox = React.createClass({
		propTypes: {
		tweetsArray: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
	},
	render: function() {
		var tweets = this.props.tweetsArray.map(function(t){
				return <TwitterCard screenName={ t.screen_name } text={ t.text } />
		})
		return (
			<div className="TwitterBox">
				{ tweets }
			</div>
		);
	}
});