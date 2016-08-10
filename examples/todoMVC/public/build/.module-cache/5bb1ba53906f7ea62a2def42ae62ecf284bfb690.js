//Inputbox
var InputBox = React.createClass({displayName: "InputBox",
	handleAddItem:function(){
		this.props.onAddItem(this.refs.itemNew.value);
	},

	render:function(){

		return (
				React.createElement("div", null, 
					React.createElement("input", {type: "text", placeholder: "new task...", ref: "itemNew"}), 
					React.createElement("button", {onClick: this.handleAddItem}, "Add")
				)
			)
	}
})
//Items
var ItemTask = React.createClass({displayName: "ItemTask",

	//checked function

	render:function(){

		return (
				React.createElement("li", {class: this.props.done}, 
					React.createElement("input", {type: "checkbox"}), 
					React.createElement("span", null, this.props.name)

				)
			)
	}
})

var ItemCollection = React.createClass({displayName: "ItemCollection",

	render:function(){
		var items = this.props.data.map(function(item){
			return (
					React.createElement(ItemTask, {name: item.name, class: item.done})
					
				)
		})

		return (
				React.createElement("ul", null, 
					items
				)
			)
	}
})

var TodoMVC = React.createClass({displayName: "TodoMVC",
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
	addItem:function(newitem){
		
		$.ajax({
			url:this.props.url,
			method:"post",
			data:{"name":newitem, "task":newitem}
		})

	},


	render:function(){
		this.loadFromServer();
		return(
				React.createElement("div", null, 
					React.createElement(InputBox, {onAddItem: this.addItem}), 
					React.createElement(ItemCollection, {data: this.state.data})
					)
				
			)
	}
})

ReactDOM.render(
		React.createElement(TodoMVC, {url: "api/comments"}),
		document.getElementById('main')

	);