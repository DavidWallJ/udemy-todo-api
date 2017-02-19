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

sequelize.sync({
    // force: true
}).then(function () {
    console.log('Everything has been synced :)');
    // *Aside: if you f up your table the first time around you can set {force: true} as the sequelize.sync() attribute and it will wipe the table and then go from there or if you just want to reset the table everytime.

    Todo.findById(3).then(function (todo) {
        if (todo) {
            console.log(todo.toJSON());
        } else {
            console.log("Entry by this Id does not exist");
        }
    });



    // Todo.create({
    //     description: "Walk the cat."
    // }).then(function (todo) {
    //     return Todo.create({
    //         description: "Water the cat.",
    //         completed: true
    //     });
    //     // Insert
    // }).then(function () {
    //     // return Todo.findById(1);
    //     // get by id
    //
    //     return Todo.findAll({
    //         where: {
    //             description: {
    //                 $like: '%cat%'
    //             }
    //         }

            // where: {
            //     completed: true
            // }

        // });
        // find all that have completed set to false
    // }).then(function (todos) {
    //     if (todos) {
    //         todos.forEach(function (todo) {
    //             console.log(todo.toJSON());
    //         });
    //         // found items information
    //     } else {
    //         console.log('No todo found :/');
    //     }
    // }).catch(function (e) {
    //     console.log(e.message);
    // });
});

