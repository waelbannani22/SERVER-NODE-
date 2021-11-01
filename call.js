var mongoose=require('mongoose')
var schema =mongoose.Schema

var call = new mongoose.Schema({
        name : String,
        
        city :String,
        lng : String,
        lat : String,
        dateBegin : String,
        photo :String,
        description :String



})

const Call =mongoose.model("call",call)
module.exports = Call