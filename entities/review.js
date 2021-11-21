var mongoose =require('mongoose')
var schema=mongoose.Schema

var review = new mongoose.Schema({

    reviewerName :String,
    rating:String,
    date:String,
    reviewDescription :String 
})

const Review =mongoose.model("Review",review)
module.exports=Review