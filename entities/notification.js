var mongoose = require('mongoose')
var schema = mongoose.schema

var notification = new mongoose.Schema({

    date:String,
    nameExperience : String,
    volunteerId :String,
    contenu : String,
    callId : String
})
const Notification =mongoose.model("Notification",notification)
module.exports = Notification