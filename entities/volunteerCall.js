var mongoose= require('mongoose')
var schema =mongoose.Schema

var volunteerCall = new mongoose.Schema({
        username : String,
        lastname :String,
        email :String,
        
        photo :String,
        memberDate: String ,
        age : String ,
        description :String,
        callId :String ,
        idV :String,
        status : String




})


const VolunteerCall =mongoose.model("VolunteerCall",volunteerCall)
module.exports = VolunteerCall;