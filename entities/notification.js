var mongoose = require('mongoose')
var schema = mongoose.schema

var notification = new mongoose.Schema({

    date:String,
    nameExperience : String,
    volunteerId :String,
    type : String
})
const Notification =mongoose.model("Notification",notification)
module.exports = Notification