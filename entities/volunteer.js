var mongoose= require('mongoose')
var schema =mongoose.Schema

var volunteer = new mongoose.Schema({
        username : String,
        lastname :String,
        email :String,
        password : String,
        photo :String,
        memberDate: String ,
        age : Number ,
        description :String



})

const Volunteer =mongoose.model("Volunteer",volunteer)
module.exports = Volunteer