const  User  = require("../entities/user");
const express = require("express");
const app = require("./routes");
const router = express.Router();

router.post("/userapi",(req,res)=>{
    var volunteer = new User({
        name:req.body.name,
       
        email:req.body.email,
        password:req.body.password,
       
    })

    volunteer.save().then(()=>{
      if (volunteer.isNew == false){
        console.log("saved data")
        res.send("saved data")
      }else{
        console.log("failed to save data")
      }
    })
  })

module.exports = router;