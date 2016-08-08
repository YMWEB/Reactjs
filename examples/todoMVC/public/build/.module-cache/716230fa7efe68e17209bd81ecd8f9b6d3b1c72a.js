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
					React.createElement("span", null)

				)
			)
	}
})

var ItemCollection = React.createClass({displayName: "ItemCollection",

	render:function(){

		return (
				React.createElement("ul", null, 
					React.createElement(ItemTask, null)
				)
			)
	}
})

var TodoMVC = React.createClass({displayName: "TodoMVC",

	//getAjax
	loadFromServer:function(){

	},
	

	//sendAjax

	render:function(){
		return(
				React.createElement("div", null, 
					React.createElement(InputBox, null), 
					React.createElement(ItemCollection, null)
					)
				
			)
	}
})

ReactDOM.render(
		React.createElement(TodoMVC, null),
		document.getElementById('main')

	);