/**
 * Created by david on 2/19/17.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 250]
        }
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

var user = sequelize.define('user', {
    email:{
        type: Sequelize.STRING
    }
});

Todo.belongsTo(user);
user.hasMany(Todo);

sequelize.sync({
    // force: true
}).then(function () {
    console.log('Everything has been synced :)');

    user.findById(1).then(function (user) {
       user.getTodos({
           where: {
               completed: false
           }
       }).then(function (todos) {
           todos.forEach(function (todo) {
               console.log(todo.toJSON());
           })
       })
    });
    // user.create({
    //     email: 'davejwall@gmail.com'
    // }).then(function () {
    //     return Todo.create({
    //         description: "Clean table",
    //         completed: false
    //     });
    // }).then(function (todo) {
    //     user.findById(1).then(function (user) {
    //         user.addTodo(todo);
    //     })
    // })
});

