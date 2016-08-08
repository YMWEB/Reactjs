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
	submitComments:function(comment){
		$.ajax({
			url:this.props.url,
			dataType:'json',
			method:'post',
			data:comment,
			success:function(data){
				this.setState({data:data});
			}.bind(this),
			error:function(xhr,status,err){

			}.bind(this)
		});
	},
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
					React.createElement(Commentform, {onCommentSubmit: this.submitComments})
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
	getInitialState:function(){
		return {author:'',text:''};

	},
	handleAuthorChange:function(e){
		this.setState({author:e.target.value});
	},
	handleTextChange:function(e){
		this.setState({text:e.target.value});

	},
	handleSubmit:function(e){
		e.preventDefault();
		var author = this.state.author.trim();
		var text = this.state.text.trim();
		if(!text ||!author){
			return;
		}
		this.props.onCommentSubmit({author:author,text:text});
		this.setState({author:'',text:''});
	},

	render:function(){
		return(
			React.createElement("form", {onSubmit: this.handleSubmit}, 
				React.createElement("input", {type: "text", placeholder: "your name", value: this.state.author, onChange: this.handleAuthorChange}), 
				React.createElement("input", {type: "text", placeholder: "your words", value: this.state.text, onChange: this.handleTextChange}), 
				React.createElement("input", {type: "submit", value: "post"})
				)
			);
	}
})

var Comment = React.createClass({displayName: "Comment",
	render:function(){
		return (
				React.createElement("div", {className: "comment"}, 
					React.createElement("h2", {className: "commentAuthor"}, 
						this.props.author
					), 
					marked(this.props.children.toString())
					)
			)
	}
})
//render to dom
ReactDOM.render(
		React.createElement(CommentBox, {url: "/api/comments"}),
		document.getElementById('comments')
	);