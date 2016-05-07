//modules 
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var app = express();

//configuration
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json())    // parse application/json 
mongoose.connect('mongodb://localhost/todoDB'); //database act as server

//database
var Todo = mongoose.model('Todo',{   //column of table in db
	text:{
		type:String,
		default:'new Todo'
	}
}) 


//Routes
app.get('/',function(req,res) {
	res.sendFile(__dirname+'/public/index.html');
});

app.get('/todos',function(req,res){
	 // var data = {"text":"os"}
	 // res.send(JSON.parse(data));
	Todo.find(function(err,todos){
		if (err) {

		}else{
			res.json(todos);
		}

	})

})

app.post('/todos',function(req,res){
	//create raw in table "insert"
	console.log(JSON.stringify(req.body))
	Todo.create(req.body,function(err,todo){})
	Todo.find(function(err,todos){
		if (err) {

		}else{
			res.json(todos);
		}

		})
		// res.json(todo);
})

app.delete('/todos/:id',function(req,res){
	//create raw in table "insert"
	 console.log("done");
	Todo.remove({ _id: req.params.id  },function(err,todo){
		console.log({ _id: req.params.id })
	})
	Todo.find(function(err,todos){
		if (err) {

		}else{
			res.json(todos);
		}

		})
		// res.send("you are in delete action");
})

app.listen(7000);