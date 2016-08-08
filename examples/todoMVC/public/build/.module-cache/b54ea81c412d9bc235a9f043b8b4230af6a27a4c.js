//Inputbox
var InputBox = React.createClass({displayName: "InputBox",

	render:function(){
		return (
				React.createElement("div", null, 
					React.createElement("input", {type: "text", placeholder: "new task..."}), 
					React.createElement("button", null, "Add")

				)
			)
	}
})
//Items
var ItemTask = React.createClass({displayName: "ItemTask",

	render:function(){

		return (
				React.createElement("li", null, 
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
					React.createElement(ItemTask, {name: item.name})
					
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
				React.createElement("div", null, 
					React.createElement(InputBox, null), 
					React.createElement(ItemCollection, {data: this.state.data})
					)
				
			)
	}
})

ReactDOM.render(
		React.createElement(TodoMVC, {url: "api/comments"}),
		document.getElementById('main')

	);