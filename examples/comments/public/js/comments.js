//commentbox - get data, set data
var CommentBox = React.createClass({
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
				<div className="commentBox">
					<h1>Comments</h1>
					<CommentList data={this.state.data} />
					<Commentform onCommentSubmit ={this.submitComments}/>
				</div>
			)
	}
})
//commentlist
var CommentList = React.createClass({

	render:function(){
		var commentNodes = this.props.data.map(function(comment){
			return (
					
					<Comment author ={comment.author}>
						{comment.text}
					</Comment>
					
				)
		})

		return (
				<div className="commentList">

				{commentNodes}
				</div>
			)
	}
})

//commentform
var Commentform = React.createClass({
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
			<form onSubmit={this.handleSubmit}>
				<input type="text" placeholder = "your name" value = {this.state.author} onChange={this.handleAuthorChange}/>
				<input type="text" placeholder = "your words" value={this.state.text} onChange={this.handleTextChange}/>
				<input type="submit" value="post" />
				</form>
			);
	}
})

var Comment = React.createClass({
	render:function(){
		return (
				<div className = "comment">
					<h2 className="commentAuthor">
						{this.props.author}
					</h2>
					{marked(this.props.children.toString())}
					</div>
			)
	}
})
//render to dom
ReactDOM.render(
		<CommentBox url="/api/comments" />,
		document.getElementById('comments')
	);