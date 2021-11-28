const express = require('express');
const Volunteer = require("../entities/volunteer");
const userModel = require("../entities/volunteer");
const Recruiter=require("../entities/recruiter")
const Call =require("../entities/call");
const Review = require("../entities/review");
const Ranking =require("../entities/ranking");
const Notificationn = require("../entities/notification");
const app = express();
const jwt = require('jsonwebtoken')
const Token = require("../entities/token");
const sendEmail = require("../util/sendmail");
const Joi = require("joi");
const crypto = require("crypto");
const auth = require("../util/middleware")

app.use(express.json()) 
var bcrypt = require('bcrypt')
var Crypto = require('crypto-js');
const { cryptPassword } = require('./cryptage');
const { User } = require('../entities/user');
const findbymail = require('../util/findbymail');
var salt =10

/***********************Signup */
app.post('/SignupRecrruiter',(req,res)=>{
    const username = req.body.username
    const lastname = req.body.lastname
    const email = req.body.email
    var passwordE = req.body.password
    const photo = req.body.photo
    const memberDate = req.body.memberDate
    const age = req.body.age
    const description = req.body.description
  
    //console.log(email)
  
    Recruiter.find({}).then((DBitem)=>{
     //console.log(DBitem)
        // const validator = DBitem.find(user => user.email != email)
        const db = DBitem.find(user => user.email == email)
        console.log(db)
        //var crypted = Crypto.MD5(password)
        //console.log(crypted)
        var pass = ""
        bcrypt.genSalt(salt,function(err,salt){
          bcrypt.hash(passwordE,salt,function(err,hash){
            
            console.log("hash"+hash)
            if  (!db){   
         
         
  
              console.log("mail defini "+ email)
              //console.log("base "+DBitem.find(user => user.email != null).email)
      
              var volunteer = new Recruiter({
                name:req.body.name,
               
                email:req.body.email,
                password:hash,
                photo:req.body.photo,
                organisation : req.body.organisation,
                phone:req.body.phone,
                description:req.body.description
      
        
            })
            console.log(volunteer)
            volunteer.save().then(()=>{
              if (volunteer.isNew == false){
                console.log("saved data")
                //res.send("SignUp completed")
                res.json({user:volunteer})
              }else{
                console.log("failed to save data")
                res.send("failed to save")
              }
            })
      
              
            }else {
              console.log("mail defini "+ email)
              console.log("mail already exists")
              res.status(400).send("mail already in use")
        
            }
          })
        })
        //console.log(passwordE)
  
  
    })
  
  })
  //$$$$$$$$$$$$$$$$$LOGIN$$$$

  app.post('/loginRecruiter', (req, res) => {
    console.log("heloo")
    const email = req.body.email 
    //console.log(username)
    const password = req.body.password
     Recruiter.find({}).then((DBitemss)=>{
        
       
    const authUser = DBitemss.find(user => user.email == email  )
    if (authUser){
      console.log("userr"+authUser)
      bcrypt.compare(password,authUser.password,function(err,result){
        if (result == true){
          if(authUser) {
            // generate a token 
            const token = jwt.sign({email: email}, "SECRET")
            if(token) {
              authUser.token = token 
              res.json({token: token,user:authUser})
              console.log(token)
            } else {
              res.json({message: "Authentication Failed", success: false})
            }
          } else {
             res.json({message: "Authentication Failed", success: false})
          }
        }else{
          res.send("password isn't correct")
        }
      
         })
    }else{
      res.send("no email found")
    }
    
   
    })
   
    //console.log(users)
    //const authUser = (users.find(user => user.username.toLowerCase()  == username.toLowerCase()  && user.password == password))
   
    
  })
  ////create Call
app.post("/create_call",auth,(req,res)=>{
  var call = new Call({
      token : req.body.token,
      name:req.body.name,
      city:req.body.city,
      // lat:req.body.lat,
      // lng:req.body.lng,
      photo:req.body.photo,
      dateBegin:req.body.dateBegin,
      description:req.body.description,
      recruiter:req.body.recruiter,
      rating:req.body.rating,
      ageGroup:req.body.ageGroup,
      category:req.body.category

  })

  call.save().then(()=>{
    if (call.isNew == false){
      console.log("saved data")
      res.status(200).send("saved data")
    }else{
      console.log("failed to save call")
      res.status(400).send("error with creating")
    }
  })
})


  module.exports = app;