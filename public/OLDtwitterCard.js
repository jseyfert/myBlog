// -TwitterApp
// 	-SearchBar
// 	-TwitterBox
// 	  -TwitterCard





var TwitterCard = React.createClass({
	getInitialState: function () {
		return {
			tweets: []
		}
	},	
	loadTweetsFromServer: function () {
	    var self = this;
	    $.ajax({
	      url: this.props.url,
	      method: 'GET'
	    }).done(function(data){
	      console.log(data);
	      self.setState({tweets: data});
	    }) 
	},	
	componentDidMount: function () {
		this.loadTweetsFromServer()
	},
	render: function () {
		// console.log(this.state.tweets);
		var twitterCards = this.state.tweets.map(function(item){
		return(
				<div className="media col-sm-3">
					{ item.text }
				</div>
				)
		})
		return(
				<div className="panel panel-default col-sm-4">
		            <div className="panel-body">
		                <div>
		                    <img src="" className="thumbnailTweet"/>
		                </div>
		                <div className="tweet-text">
		                    <p> { twitterCards} </p>
		                </div>
		            </div>    
		        </div>
			);
	}
});

React.render(<TwitterCard url="/api/tweets/scooters" />,
	document.getElementById('twitter-card'));