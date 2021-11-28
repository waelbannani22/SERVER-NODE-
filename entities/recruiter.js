var mongoose=require('mongoose')
var schema =mongoose.Schema

var recruiter = new mongoose.Schema({
        name : String,
        email :String,
        password : String,
        photo :String,
        description :String,
        organisation:String,
        phone :String,
        token :String



})

const Recruiter =mongoose.model("Recruiter",recruiter)
module.exports = Recruiter