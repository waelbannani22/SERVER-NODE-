
var mongoose =require('mongoose')

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
        test:String,
        pending : { type: Number, min: 0 },
        accepted : { type: Number, min: 0 },
        declined : { type: Number, min: 0}, 
     
})

const Call =mongoose.model("Call",call)
module.exports = Call