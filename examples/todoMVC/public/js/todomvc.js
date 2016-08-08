//Inputbox
var InputBox = React.createClass({

	render:function(){
		return (
				<div>
					<input type="text" placeholder="new task..." />
					<button>Add</button>

				</div>
			)
	}
})
//Items
var ItemTask = React.createClass({

	//checked function

	render:function(){

		return (
				<li class={this.props.done}>
					<input type="checkbox" />
					<span>{this.props.name}</span>

				</li>
			)
	}
})

var ItemCollection = React.createClass({

	render:function(){
		var items = this.props.data.map(function(item){
			return (
					<ItemTask name={item.name} class={item.done} />
					
				)
		})

		return (
				<ul>
					{items}
				</ul>
			)
	}
})

var TodoMVC = React.createClass({
	getInitialState:function(){
		return {data:[]};
	},
	//getAjax
	loadFromServer:function(){
		$.ajax({
			url:this.props.url,
			dataType:'json',
			cache:false,
			success:function(data){
				this.setState({data:data});
			}.bind(this)
		})

	},
	


	//sendAjax

	render:function(){
		this.loadFromServer();
		return(
				<div>
					<InputBox />
					<ItemCollection data={this.state.data}/>
					</div>
				
			)
	}
})

ReactDOM.render(
		<TodoMVC url="api/comments" />,
		document.getElementById('main')

	);