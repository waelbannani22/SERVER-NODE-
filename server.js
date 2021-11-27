const { error } = require('console')
const express =require('express')
const mongoose =require('mongoose')
require("dotenv").config();


const passwordReset = require("./routes/passwordReset");
const users = require("./routes/users");
var app = express()
var Router =require('./routes/routes')
app.use(express.json()) 
//app.use("/api/users", users);
//app.use("/api/password-reset", passwordReset);




const url = 'mongodb+srv://Volunteer:1234@volunteer.jn4y4.mongodb.net/Volunteer?retryWrites=true&w=majority'
const connectionParms={
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url,connectionParms);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use(Router);
app.listen(3000,()=>{
    console.log("server is running on 3000")
});
    









