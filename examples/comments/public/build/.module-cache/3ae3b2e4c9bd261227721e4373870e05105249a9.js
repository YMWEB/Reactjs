//commentbox - get data, set data
var CommentBox = React.createClass({displayName: "CommentBox",
	//get data
	loadCommentsFromServer:function(){
		$.ajax({
			url:this.props.url,
			dataType:'json',
			cache:false,
			success:function(data){
				this.setState({data:data});
			}.bind(this),
			error:function(xhr,status,err){
				console.error(this.props.url,status,err.toString());
			}.bind(this)
		});
	},

	//set data
	//
	getInitialState:function(){
		return {data:[]};
	},
	componentDidMount:function(){
		this.loadCommentsFromServer();
	},

	render:function(){
		return (
				React.createElement("div", {className: "commentBox"}, 
					React.createElement("h1", null, "Comments"), 
					React.createElement(CommentList, {data: this.state.data}), 
					React.createElement(Commentform, null)
				)
			)
	}
})
//commentlist
var CommentList = React.createClass({displayName: "CommentList",

	render:function(){
		var commentNodes = this.props.data.map(function(comment){
			return (
				React.createElement("li", {key: comment.id}, 
					comment.author, 
					React.createElement("span", {key: comment.id}, 
						comment.text
					)
					)
					
				)
		})

		return (
				React.createElement("div", {className: "commentList"}, 

				commentNodes
				)
			)
	}
})

//commentform
var Commentform = React.createClass({displayName: "Commentform",

	render:function(){
		return(
			React.createElement("form", null, 
				React.createElement("input", {type: "text", placeholder: "your name"}), 
				React.createElement("input", {type: "text", placeholder: "your words"}), React.createElement("input", {type: "button", value: "post"})
				)
			)
	}
})
//render to dom
ReactDOM.render(
		React.createElement(CommentBox, {url: "/api/comments"}),
		document.getElementById('comments')
	);