var mongoose=require('mongoose')
var schema =mongoose.Schema

var volunteer = new mongoose.Schema({
        name : String,
        lastname :String,
        email :String,
        password : String,
        photo :String,
        memberDate: String ,
        age : Number ,
        description :String



})

const Data =mongoose.model("Data",volunteer)
module.exports = Data