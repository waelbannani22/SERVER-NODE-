var mongoose=require('mongoose')
var schema =mongoose.Schema

var donation = new mongoose.Schema({
        name : String,
        photo :String,
        location:String,
        oragnisation:String,
        deadline :String,
        phone : String,
        description: String,
        montantTotal : String,
        montantInstant : Number,
        recruiterId : String


})

const Donation =mongoose.model("Donation",donation)
module.exports = Donation