var mongoose=require('mongoose')
var schema =mongoose.Schema

var recruiter = new mongoose.Schema({
        name : String,
        
        email :String,
        password : String,
        photo :String,
        
      
        description :String



})

const Recruiter =mongoose.model("recruiter",recruiter)
module.exports = Recruiter