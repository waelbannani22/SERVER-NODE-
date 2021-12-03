
var mongoose =require('mongoose')


const Volunteer = require('./volunteer')


var call = new mongoose.Schema({
        name : String,
        
        city :String,
        lng : String,
        lat : String,
        dateBegin : String,
        photo :String,
        description :String,
        recruiter :String,
        rating :String,
        ageGroup :String,
        category :String,
        
       
        



})

const Call =mongoose.model("Call",call)
module.exports = Call