const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Todo = require("./models/Todo.js");

const app = express();
dotenv.config();

// middleware
app.use(cors());
app.use(express.json());

// routes
// create a todo
app.post("/todos", (req, res) => {
  const { task } = req.body;
  Todo.create({ task: task })
    .then(result => res.json(result))
    .catch(err => console.error(err.message));
});

// get all todos
app.get("/todos", (req, res) => {
  Todo.find()
    .then(result => res.json(result))
    .catch(err => console.error(err.message));
});

// get a todo
app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  Todo.findById(id)
    .then(result => res.json(result))
    .catch(err => {
        console.error(err.message);
        res.status(404).json("Todo not found");
    });
});

// update a todo
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  Todo.findByIdAndUpdate(id, {task: task})
    .then(result => res.json("Todo updated"))
    .catch(err => {
        console.error(err.message);
        res.status(404).json("Todo not found");
    });
});

//delete a todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  Todo.findByIdAndDelete(id)
    .then(result => res.json("Todo deleted successfully"))
    .catch(err => {
      console.error(err.message);
      res.status(404).json("Todo not found");
    });
});

// set up database and server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
