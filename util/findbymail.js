const Volunteer = require("../entities/volunteer")
const  findbymail= async (email)=>{
    const user = Volunteer.find({email : email})
    return user 
}
module.exports = findbymail;