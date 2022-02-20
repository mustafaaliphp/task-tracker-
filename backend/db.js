const { connect } = require("mongoose")
const DBUrl = "mongodb://localhost:27017/mern";
connect(DBUrl).then(()=>{
    console.log("Connected to DB.");
})
 