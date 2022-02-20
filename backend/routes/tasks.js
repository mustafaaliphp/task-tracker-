const { Router } = require("express");
const app = Router();
const { TaskModel } = require("../schema/tasks")

// GET /task
app.get("/", (req, res) => {
    TaskModel.find().then((docs) => {
        res.json(docs);
    })
})

// /GET /task/id
app.get("/:id", function (req, res) {
    TaskModel.find({ _id: req.params.id }, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
})


// POST /task
app.post("/", (req, res) => {

    const { body } = req;
    const Task = new TaskModel(body);

    Task.save()
        .then((doc) => {
            res.json(doc)
        })
        .catch((error) => {
            res.json({ message: "Error adding record." })
        })


})



// PUT /task/:id
app.put("/:id", (req, res) => {
    const { body, params } = req;
    const { id } = params;

    TaskModel.findByIdAndUpdate(id, body)
        .then((doc) => {
            res.json(doc)
        })
        .catch(() => {
            res.json({ message: "Error updating record." })
        })
})

// patch /task/:id
app.patch("/:id", (req, res) => {
    const { body, params } = req;
    const { id } = params;

    TaskModel.findByIdAndUpdate(id, body)
        .then((doc) => {
            res.json(doc)
        })
        .catch(() => {
            res.json({ message: "Error updating record." })
        })
})

// DELETE /task/:id
app.delete("/:id", (req, res) => {

    const { params } = req;
    const { id } = params;
    TaskModel.findByIdAndDelete(id).then((docs) => {
        res.json({ message: "Task deleted" });
    })
})

module.exports = app;
