var mongoose =require('mongoose')
var schema=mongoose.Schema

var review = new mongoose.Schema({
    callId :String,
    reviewerName :String,
    idv : String,
    rating:String,
    date:String,
    reviewDescription :String 
})

const Review =mongoose.model("Review",review)
module.exports=Review