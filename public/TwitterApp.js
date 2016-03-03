var TwitterApp = React.createClass({

	propTypes: {
		url: React.PropTypes.string.isRequired
	},
	getInitialState: function() {
		return {
			tweets: [],
			keyword: 'trump'
		}
	},	
	loadTweetsFromServer: function() {
		self = this;
		$.ajax({
			url: this.props.url + this.state.keyword,
			method: 'GET'
		}).done(function(d){
			self.setState({
				tweets: d
			})
		})
	},	
	componentDidMount: function() {
		this.loadTweetsFromServer()
	},
	render: function() {
		return (
			<div className="TwitterApp">
			<TwitterSeachBar />
			<TwitterBox tweetsArray={this.state.tweets}/>
			</div>
		);
	}
});


React.render(<TwitterApp url="/api/tweets/" />, document.getElementById('twitter-app'));




