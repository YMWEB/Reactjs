//Inputbox
var InputBox = React.createClass({
	handleAddItem:function(e){
		
		var itemvalue = this.refs.itemNew.value;
		this.props.onAddItem({"name":itemvalue,"text":itemvalue,"done":"falseClass"});
	},

	render:function(){

		return (
				<div>
					<input type="text" placeholder="new task..." ref="itemNew" />
					<button onClick={this.handleAddItem}>Add</button>
				</div>
			)
	}
})
//Items
var ItemTask = React.createClass({

	//checked function
	//
	//handleDelete
	handleDelete:function(){
		this.props.onDelItems({"name":this.ref.itemName});

	},

	render:function(){

		return (
				<li class={this.props.done}>
					<input type="checkbox" />
					<span ref="itemName">{this.props.name}</span>
					<span><button onClick={this.handleDelete}>Delete</button></span>

				</li>
			)
	}
})

var ItemCollection = React.createClass({
	deleteItem:function(){

		this.props.ondelitem({"name":this.ref.itemName})

	},


	render:function(){
		var items = this.props.data.map(function(item){
			return (
					<ItemTask name={item.name} class={item.done} onDelItems = {this.deleteItem} />
					
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
	


	//additem
	addItem:function(item){
		
		$.ajax({
			url:this.props.url,
			method:"POST",
			dataType:'JSON',
			data:item,
			success:function(data){
				this.setState({data:data});
			}.bind(this)
		})

	},

	//delete item
	delItem:function(item){
		$.ajax({
			url:this.props.url,
			method:"Delete",
			dataType:'JSON',
			data:item,
			success:function(data){
				this.setState({data:data});
			}.bind(this)
		})
	},

	componentDidMount:function(){
		this.loadFromServer();
		// setInterval(this.loadFromServer, this.props.pollInterval);
	},


	render:function(){
		
		return(
				<div>
					<InputBox onAddItem = {this.addItem} />
					<ItemCollection data={this.state.data} ondelItem={this.delItem}/>
					</div>
				
			)
	}
})

ReactDOM.render(
		<TodoMVC url="api/comments" pollInterval={5000}/>,
		document.getElementById('main')

	);