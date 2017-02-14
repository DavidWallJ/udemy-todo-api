/**
 * Created by david on 2/14/17.
 */
var express = require('express');
var app = express();

var PORT = process.env.PORT || 3000;

var todos = [{
    id: 1,
    desc: "Eat a banana.",
    completed: false
},{
    id: 2,
    desc: "Buy twist ties.",
    completed: false

},{
    id: 3,
    desc: "Walk down stairs.",
    completed: true

},{
    id: 4,
    desc: "Take a break.",
    completed: false

}];
app.get('/', function (req, res) {
    res.send('Todo API Root');
});

app.get('/todos', function (req, res) {
    res.json(todos);
});

app.get('/todos/:id', function (req, res) {
    var todoId = req.params.id;

    // var todoId = parseInt(req.params.id, 10);
    // since it we want the id as a number instead of a string we need to parseInt to base of 10 OR you can just make it a double == isntead of a triple.  I'm doing this.  It's probably a bad practice for some reason.
    var matchedTodo;

    // iterate over todos array. find match.
    todos.forEach(function (todo) {
        if (todoId == todo.id) {
            matchedTodo = todo;
        }
    });

    if (matchedTodo) {
        res.json(matchedTodo);
    } else {
        res.status(404).send(`Id of '${todoId}' doesn't exist :/`);
    }

});

app.listen(PORT, function () {
   console.log(`Express is listening on ${PORT}!`);
});