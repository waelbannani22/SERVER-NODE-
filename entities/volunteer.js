var mongoose= require('mongoose')
var schema =mongoose.Schema

var volunteer = new mongoose.Schema({
        username : String,
        lastname :String,
        email :String,
        password : String,
        photo :String,
        memberDate: String ,
        age : String ,
        description :String,
        token :String,
        fbid:String,
        fbUser : Boolean



})
const  findbymail= async (email)=>{
        const user = Volunteer.find({email : email})
        return user 
}

const Volunteer =mongoose.model("Volunteer",volunteer)
module.exports = Volunteer, findbymail;