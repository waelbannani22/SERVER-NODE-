var mongoose=require('mongoose')
var schema =mongoose.Schema

var category = new mongoose.Schema({
        name : String,
        photo :String



})

const Category =mongoose.model("category",category)
module.exports = Category