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
const upload = require('../util/storage');
const Donation = require('../entities/donation');

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
/**
* @swagger
* /loginRecruiter:
*   post:
*     tags:
*       - login
*     description: login
*     produces:
*       - application/json
*     parameters:
*       - name: User
*         description: User object
*         in: body
*         required: true
*     responses:
*       200:
*         description: Successfully created
*/
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
  //,upload.single('image')
  /**
* @swagger
* /create_call:
*   post:
*     tags:
*       - create a call
*     description: login
*     produces:
*       - application/json
*     parameters:
*       - name: call
*         description: call object
*         in: body
*         required: true
*     responses:
*       200:
*         description: Successfully created
*/
app.post("/create_call",upload.single('image'),auth,(req,res)=>{
  var call = new Call({
      token : req.body.token,
      name:req.body.name,
      city:req.body.city,
      // lat:req.body.lat,
      // lng:req.body.lng,
      photo:req.file.filename,
      dateBegin:req.body.dateBegin,
      description:req.body.description,
      recruiter:req.body.recruiter,
      rating:req.body.rating,
      ageGroup:req.body.ageGroup,
      category:req.body.category,
      pending : 0,
      accepted : 0,
      declined : 0
     
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
//fetch posts
app.post('/FetchPostsByRecruiter',auth, (req, res) => {
  const token = req.body.token
  const id = req.body.id 
  //console.log(username)
  
   Call.find( { recruiter: { $in: [ id] } }  ).then((DBitems)=>{
    if (DBitems){
      console.log("userr"+DBitems)
     res.status(200).json({call: DBitems})
             console.log("success")
        
    }else{
      res.status(400).send({message:"no data"})
    }
  })
   })
   //fetch accepted
   app.post('/fetchAceepted', (req, res) => {
    const id = req.body.callId
    const idV = req.body.idV
    //console.log(username)
    
     Call.find( { _id: { $in: [ id] } }  ).then((DBitems)=>{
      if (DBitems){
        console.log("userr"+DBitems)
       res.status(200).json({call: DBitems})
               console.log("success")
          
      }else{
        res.status(400).send({message:"no data"})
      }
    })
     })
     //create donation
     app.post('/addDonation',upload.single('image'),(req,res)=>{
       var donation = new Donation({
         recruiterId : req.body.recruiterId,
         name : req.body.name,
         location : req.body.location,
         organisation : req.body.organisation,
         deadline : req.body.deadline,
         phone : req.body.phone,
         photo : req.file.filename,
         description : req.body.description,
         montantTotal : req.body.montantTotal,
         montantInstant : 0
       })
       donation.save().then(()=>{
        if (donation.isNew == false){
          console.log("saved data")
          res.status(200).send("saved data")
        }
        
      })

     })
     //fetch donation by recruiter
     app.post('/fetchDonationByRecruiter',async(req,res)=>{
       const id = req.body.id
       Donation.find({recruiterId: { $in: [ id] }}).then((Dbitem)=>{
         if (Dbitem){
           console.log("find",Dbitem)
           res.status(200).json({donation:Dbitem})
         }else{
          console.log("no data")
          res.status(400).json({message:"nodata"})
         }
       })
     })
     //fetch donations
     app.get('/getDonations', (req,res)=>{
       Donation.find({}).then((dbitem)=>{
         res.status(200).json({donation:dbitem})
       })
     })
     //fetch by id 
     app.post('/fetchRecruiterById',async(req,res)=>{
      const fbid = req.body.id
     const noti = await Recruiter.find({
      _id : fbid
        
      })
      if (noti){
        console.log(noti)
        res.status(200).json({user : noti})
      }else{
         res.status(400).json({message : "no user found"})
      }
     

    })
    //update recruiter
    app.post("/update_recruiter1",upload.single('image'),async(req,res)=>{
     
          const id = req.body.id
          const name = req.body.name
          const phone = req.body.phone
         const rec = await Recruiter.findById({_id:id})
         if (rec != [] ){
          Recruiter.findOneAndUpdate({_id :id}, {name : name,phone :phone,photo:req.file.filename}).exec();
          console.log("updated")
          res.status(200).send("updated")
         }else{
          console.log(" not updated")
          res.status(200).send("unot pdated")
         }
        
       
     
    })
    //reset password
    app.post("/:userId", async (req, res) => {
      try {
          const schema = Joi.object({ password: Joi.string().required() });
          const { error } = schema.validate(req.body);
          if (error) return res.status(400).send(error.details[0].message);
    
          const user = await Recruiter.findById(req.params.userId);
          if (!user) return res.status(400).send("invalid link or expired");
    
          
     
    
          user.password = req.body.password;
          bcrypt.genSalt(salt,function(err,salt){
            bcrypt.hash(user.password,salt,async function(err,hash){
              user.password = hash
                 await user.save();
            })});
         
    
          res.send("password reset sucessfully.");
      } catch (error) {
          res.send("An error occured");
          console.log(error);
      }
    });
    //forget
    app.post("/verifmailRecruiter", async (req, res) => {
      try {
         /*const schema = Joi.object({ email: Joi.string().email().required() });
          const { error } = schema.validate(req.body);
          if (error) return res.status(400).send(error.details[0].message);
    */
          const user = await Recruiter.findOne({ email: req.body.email });
          if (!user)
              return res.status(400).send("user with given email doesn't exist");
    
          let token = await Token.findOne({ userId: user._id });
          if (!token) {
              token = await new Token({
                  userId: user._id,
                  token: crypto.randomBytes(32).toString("hex"),
              }).save();
          }
    
          //const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
          
          var code = makeid(5)
          await sendEmail(user.email, "Password reset", code);
          res.json({code:code,id : user._id})
          
      } catch (error) {
          res.send("An error occured");
          console.log(error);
      }
    });
    //
    
    app.post("/a/:codesent/",  (req, res) => {
      try {
        
          console.log(req.params.codesent)
          console.log(req.body.password)
          if (req.body.password === req.params.codesent){
            return res.status(200).send("match")
          }else{
            return res.status(400).send("invalid code")
          }
          
      } catch (error) {
          res.send("An error occured");
          console.log(error);
      }
    });
    //
    app.post("/b/:userId/",async(req,res)=>{
      
      try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        const user = await Recruiter.findById(req.params.userId);
        if (!user) return res.status(400).send("invalid link or expired");
    
        
       
        user.password = req.body.password;
        bcrypt.genSalt(salt,function(err,salt){
          bcrypt.hash(user.password,salt,async function(err,hash){
            user.password = hash
               await user.save();
          })});
      
    
        res.send("password reset sucessfully.");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
        
      
        
        
    })
  module.exports = app;