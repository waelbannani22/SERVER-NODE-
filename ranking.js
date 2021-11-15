var mongoose = require('mongoose')
var schema = mongoose.schema

var ranking = new mongoose.Schema({
    volunteerName : String,
    amount :Number,
    charityName : String,
    
})