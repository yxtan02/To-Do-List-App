const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    task: String
})

const Todo = mongoose.model("todos", TodoSchema)

module.exports = Todo