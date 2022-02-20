const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const SECRET_KEY = "4393287489312798472394712749824"

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static("public"))

const TaskRouter = require("./routes/tasks");
require("./db")

 app.use("/api/v1/tasks", TaskRouter)

app.listen(8080, ()=>{ console.log("application started on port 8080.") });