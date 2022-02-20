const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
    "title": { type : String },
    "isCompleted": { type : Boolean },
    "date" : { type : Date, default : new Date() }
});

// name, schema, collection-name
const TaskModel = model("task", TaskSchema, "task");

module.exports = { TaskSchema, TaskModel }